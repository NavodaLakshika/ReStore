using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{

   

    public class StoreContext : DbContext 
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Products> Products { get; set; }

        public DbSet<Basket> Baskets { get; set; }
        public DbSet<BasketItem> BasketItems { get; set; }
         
    }
}