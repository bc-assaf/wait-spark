using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WaitSpark.Api.Dtos;
using WaitSpark.Api.Exceptions;
using WaitSpark.Api.Helpers;
using WaitSpark.Api.Options;
using WaitSpark.Common.Enums;
using WaitSpark.Common.Models;
using WaitSpark.Data;
using WaitSpark.Data.Entities;

namespace WaitSpark.Api.Services;

public class JobService(
    WaitSparkDbContext db,
    IMessageQueue queue,
    IOptions<QueueSettings> queueSettings,
    ILogger<JobService> logger)
{
    private static readonly JobStatus[] ActiveStatuses = [JobStatus.Queued, JobStatus.Started];

    /// <summary>
    /// Starts a website-processing job for a tenant owned by the user, unless one is already active.
    /// </summary>
    public async Task<(JobDto Job, bool IsNew)> StartWebsiteJobAsync(
        Guid uid, string publicId, string? websiteUrl, CancellationToken ct)
    {
        var url = WebsiteUrl.Normalize(websiteUrl)
            ?? throw new ArgumentException("Enter a valid website address.");

        var tenant = await db.Tenants
            .Include(t => t.OwnerUser)
            .FirstOrDefaultAsync(t => t.PublicId == publicId && t.OwnerUser.Uid == uid, ct)
            ?? throw new EntityNotFoundException("Tenant not found.");

        var active = await db.Jobs
            .Where(j => j.TenantId == tenant.Id && ActiveStatuses.Contains(j.Status))
            .OrderByDescending(j => j.StartedAt)
            .FirstOrDefaultAsync(ct);
        if (active is not null) return (ToDto(active), false);

        var now = DateTime.UtcNow;
        var job = new Job
        {
            Id = Guid.NewGuid(),
            TenantId = tenant.Id,
            Task = JobTask.ProcessWebsite,
            WebsiteUrl = url,
            StartedAt = now,
            Status = JobStatus.Queued,
            StatusDate = now,
            StatusMessage = "Job Queued",
        };
        db.Jobs.Add(job);
        if (tenant.OwnerUser.Status == UserStatus.New) tenant.OwnerUser.Status = UserStatus.Onboarding;
        await db.SaveChangesAsync(ct);

        try
        {
            await queue.SendAsync(queueSettings.Value.ScrapingJobs, new ScrapingJobMessage(tenant.Id, job.Id), ct);
        }
        catch (Exception ex)
        {
            // Don't leave a phantom active job that would block the user from retrying.
            logger.LogError(ex, "Failed to enqueue job {JobId}", job.Id);
            job.Status = JobStatus.Failed;
            job.StatusDate = DateTime.UtcNow;
            job.StatusMessage = "Failed to queue the job";
            await db.SaveChangesAsync(CancellationToken.None);
            throw;
        }

        return (ToDto(job), true);
    }

    private static JobDto ToDto(Job job) => new(job.Id, job.Status, job.StatusMessage);
}
