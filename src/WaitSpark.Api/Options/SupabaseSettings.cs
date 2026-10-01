using System.ComponentModel.DataAnnotations;

namespace WaitSpark.Api.Options;

public class SupabaseSettings
{
    public const string SectionName = "Supabase";

    [Required]
    public string Url { get; init; } = "";

    [Required]
    public string SecretKey { get; init; } = "";
}
