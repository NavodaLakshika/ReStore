using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        // Constructor with dependency injection
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Entities.Products>>> GetProducts()
        {
            // Add null check for extra safety
            if (_context.Products == null)
            {
                return NotFound();
            }

            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Entities.Products>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }
    }
}