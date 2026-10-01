using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using WaitSpark.Common.Enums;

namespace WaitSpark.Data.Entities;

[Index(nameof(Uid), IsUnique = true)]
[Index(nameof(Email), IsUnique = true)]
public class User
{
    [Key]
    public Guid Id { get; set; }

    /// <summary>
    /// Supabase auth user_id
    /// </summary>
    public Guid Uid { get; set; }

    [MaxLength(100)]
    [EmailAddress]
    public required string Email { get; set; }

    [MaxLength(40)]
    public string? DisplayName { get; set; }

    [MaxLength(20)]
    public UserStatus Status { get; set; } = UserStatus.New;

    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Tenants owned by this user
    /// </summary>
    public ICollection<Tenant> Tenants { get; set; } = [];
}