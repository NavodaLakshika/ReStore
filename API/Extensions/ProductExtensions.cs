using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Products> Sort(this IQueryable<Products> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.Name);

            return orderBy.ToLower() switch
            {
                "price" => query.OrderBy(p => (double)p.Price),
                "pricedesc" => query.OrderByDescending(p => (double)p.Price),
                _ => query.OrderBy(p => p.Name)
            };
        }

        public static IQueryable<Products> Search(this IQueryable<Products> query, string? searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Products> Filter(this IQueryable<Products> query, string brands, string types)
        {
            var brandList = string.IsNullOrWhiteSpace(brands)
                ? new List<string>()
                : brands.ToLower().Split(',').Select(b => b.Trim()).ToList();

            var typeList = string.IsNullOrWhiteSpace(types)
                ? new List<string>()
                : types.ToLower().Split(',').Select(t => t.Trim()).ToList();

            if (brandList.Any())
                query = query.Where(p => brandList.Contains(p.Brand.ToLower()));

            if (typeList.Any())
                query = query.Where(p => typeList.Contains(p.Type.ToLower()));

            return query;
        }
    }
}
