
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace WaitSpark.Data.Entities;

[Index(nameof(PublicId), IsUnique = true)]
public class Tenant
{
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// 6-char lower-case alphanumeric id used to reference the tenant in API routes
    /// </summary>
    [StringLength(6, MinimumLength = 6)]
    public required string PublicId { get; set; }

    public Guid OwnerUserId { get; set; }

    public User OwnerUser { get; set; } = null!;

    [MaxLength(100)]
    public required string Name { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime StatusChangedAt { get; set; }


    [MaxLength(200)]
    public string? PrimaryWebsiteUrl { get; set; }

    [MaxLength(500)]
    public string? IconUrl { get; set; }

    [MaxLength(500)]
    public string? OgImageUrl { get; set; }

    public string? Summary { get; set; }
    public string? Tagline { get; set; }
}