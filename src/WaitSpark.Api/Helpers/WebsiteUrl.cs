namespace WaitSpark.Api.Helpers;

public static class WebsiteUrl
{
    /// <summary>
    /// Returns an absolute http(s) URL, assuming https when no scheme is given; null if the input isn't a valid website address.
    /// </summary>
    public static string? Normalize(string? input)
    {
        var value = input?.Trim();
        if (string.IsNullOrEmpty(value) || value.Any(char.IsWhiteSpace)) return null;

        if (!value.Contains("://")) value = "https://" + value;

        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri)) return null;
        if (uri.Scheme is not ("http" or "https")) return null;
        if (!uri.Host.Contains('.') || uri.HostNameType != UriHostNameType.Dns && uri.HostNameType != UriHostNameType.IPv4) return null;

        return uri.AbsoluteUri.Length <= 500 ? uri.AbsoluteUri : null;
    }
}
