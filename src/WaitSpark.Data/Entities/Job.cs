using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using WaitSpark.Common.Enums;

namespace WaitSpark.Data.Entities;

[Index(nameof(TenantId), nameof(Status))]
public class Job
{
    [Key]
    public Guid Id { get; set; }

    public Guid TenantId { get; set; }

    public Tenant Tenant { get; set; } = null!;

    [MaxLength(30)]
    public JobTask Task { get; set; }

    [MaxLength(500)]
    public string? WebsiteUrl { get; set; }

    public DateTime StartedAt { get; set; }

    [MaxLength(20)]
    public JobStatus Status { get; set; }

    public DateTime StatusDate { get; set; }

    [MaxLength(500)]
    public string? StatusMessage { get; set; }
}
