using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<PagedList<Products>>> GetProducts([FromQuery] ProductParams productParams)
        {
            if (_context.Products == null)
                return NotFound("Product list not found.");

            var query = _context.Products.AsQueryable()
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .Sort(productParams.OrderBy);

            var products = await PagedList<Products>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound($"Product with ID {id} not found.");

            return product;
        }

        // GET: api/products/filters
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            if (_context.Products == null)
                return NotFound("Product database not found.");

            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
