using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaitSpark.Api.Dtos;
using WaitSpark.Api.Extensions;
using WaitSpark.Api.Services;

namespace WaitSpark.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/me")]
public class MeController(UserService users) : ControllerBase
{
    /// <summary>
    /// Gets or create a user account 
    /// </summary>
    [Route("account")]
    [HttpPost]
    [ProducesResponseType<GetOrCreateUserResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> GetOrCreateAccount(CancellationToken ct)
    {
        if (User.Identity?.IsAuthenticated is false) return Unauthorized();
        if (User.GetUid() is not { } uid) return Unauthorized();

        var email = User.FindFirstValue("email");
        if (string.IsNullOrWhiteSpace(email))
            return BadRequest("The token has no email claim.");

        var response = await users.GetOrCreateAccountAsync(uid, email, ct);

        if (response.IsNewAccount)
        {
            return Created($"api/v1/tenants/{response.NewTenant!.PublicId}/users/{response.User.Id}", response);
        }
        else
        {
            return Ok(response);
        }

    }
}
