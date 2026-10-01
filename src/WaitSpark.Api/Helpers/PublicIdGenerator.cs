using System.Security.Cryptography;

namespace WaitSpark.Api.Helpers;

public static class PublicIdGenerator
{
    public const int Length = 6;
    private const string Alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";

    public static string Generate() =>
        string.Create(Length, 0, static (span, _) => RandomNumberGenerator.GetItems<char>(Alphabet, span));
}
