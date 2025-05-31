using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;

        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            TokenService tokenService,
            StoreContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _context = context;
        }

        // POST: api/Account/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest("Request body is missing or invalid.");
            }

            if (string.IsNullOrWhiteSpace(loginDto.Username) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid username or password.");
            }

            var userBasket = await RetrieveBasket(loginDto.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null 
                    ? anonBasket.MapBasketToDo() 
                    : userBasket?.MapBasketToDo()
            };
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        // POST: api/Account/register
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (string.IsNullOrWhiteSpace(registerDto.Username) ||
                string.IsNullOrWhiteSpace(registerDto.Password) ||
                string.IsNullOrWhiteSpace(registerDto.Email))
            {
                return BadRequest("Username, email, and password are required.");
            }

            if (await _userManager.FindByEmailAsync(registerDto.Email) != null)
            {
                return BadRequest(new
                {
                    type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    title = "Validation error",
                    status = 400,
                    trnccId = HttpContext.TraceIdentifier,
                    errors = new Dictionary<string, string[]>
                    {
                        { "DuplicateEmail", new[] { $"Email '{registerDto.Email}' is already taken." } }
                    }
                });
            }

            if (await _userManager.FindByNameAsync(registerDto.Username) != null)
            {
                return BadRequest(new
                {
                    type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    title = "Validation error",
                    status = 400,
                    trnccId = HttpContext.TraceIdentifier,
                    errors = new Dictionary<string, string[]>
                    {
                        { "DuplicateUsername", new[] { $"Username '{registerDto.Username}' is already taken." } }
                    }
                });
            }

            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                var errorDict = result.Errors
                    .GroupBy(e => e.Code)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(e => e.Description).ToArray()
                    );

                return BadRequest(new
                {
                    type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    title = "Validation error",
                    status = 400,
                    trnccId = HttpContext.TraceIdentifier,
                    errors = errorDict
                });
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        // GET: api/Account/currentUser
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            
            var userBasket = await RetrieveBasket(User.Identity.Name);

            if (user == null)
                return Unauthorized();

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDo()
            };
        }
    }
}
