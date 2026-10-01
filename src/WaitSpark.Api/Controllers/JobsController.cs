using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaitSpark.Api.Dtos;
using WaitSpark.Api.Extensions;
using WaitSpark.Api.Services;

namespace WaitSpark.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/tenants/{publicId}/jobs")]
public class JobsController(JobService jobs) : ControllerBase
{
    /// <summary>
    /// Starts a job for the tenant, or returns the tenant's active job if there is one.
    /// </summary>
    [HttpPost]
    [ProducesResponseType<JobDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<JobDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Create(string publicId, CreateJobRequest request, CancellationToken ct)
    {
        if (User.GetUid() is not { } uid) return Unauthorized();

        var (job, isNew) = await jobs.StartWebsiteJobAsync(uid, publicId, request.WebsiteUrl, ct);

        return isNew
            ? Created($"api/v1/tenants/{publicId}/jobs/{job.Id}", job)
            : Ok(job);
    }
}
