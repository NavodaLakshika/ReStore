using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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

        // GET: api/products?orderBy=price&searchTerm=shoes&brands=nike,adidas&types=sneakers
        [HttpGet]
        public async Task<ActionResult<PagedList<Products>>> GetProducts(
            [FromQuery] ProductParams productParams)
        {
            if (_context.Products == null)
            {
                return NotFound("Product list not found.");
            }

            var query = _context.Products
                .AsQueryable()
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .Sort(productParams.OrderBy);

            var products = await PagedList<Products>.ToPagedList(
                query,
                productParams.PageNumber,
                productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound("Product database not found.");
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return product;
        }
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(P => P.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(P => P.Type ).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
         
    }
}