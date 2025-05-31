using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser
    {
        // No need to add 'Username' property — it's already in IdentityUser as 'UserName'
        // You can add custom properties here if needed, like:
        // public string FullName { get; set; }
    }
}
