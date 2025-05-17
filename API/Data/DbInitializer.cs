using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context)
        {
            // Check if there are any products in the DB, if yes, return
            if (await context.Products.AnyAsync()) 
            {
                
                return;   // Database is already seeded
            }

            var products = new List<Products>
            {
                
         
                
                new Products
                {
                    Name = "Classic Leather Boots",
        Description = "Durable and stylish leather boots, perfect for winter wear.",
        Price = 22000,
        PictureUrl = "/images/products/boot-leather1.png",
        Brand = "LeatherCraft",
        Type = "Boots",
        QuantityInStock = 50
                },
               new Products
    {
        Name = "Premium Leather Hiking Boots",  // Updated name
        Description = "Durable and stylish leather boots, perfect for winter wear.",
        Price = 22000,
        PictureUrl = "/images/products/boot-leather1.png",
        Brand = "LeatherCraft",
        Type = "Boots",
        QuantityInStock = 50
    },
    new Products
    {
        Name = "Ultimate Net Core Super Board",  // Updated name
        Description = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
        Price = 30000,
        PictureUrl = "/images/products/sb-core2.png",
        Brand = "NetCore",
        Type = "Boards",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Fast React Board - Super Edition",  // Updated name
        Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 25000,
        PictureUrl = "/images/products/sb-react1.png",
        Brand = "React",
        Type = "Boards",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "TypeScript Advanced Board",  // Updated name
        Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 12000,
        PictureUrl = "/images/products/sb-ts1.png",
        Brand = "TypeScript",
        Type = "Boards",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Stylish Blue Core Hat",  // Updated name
        Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 1000,
        PictureUrl = "/images/products/hat-core1.png",
        Brand = "NetCore",
        Type = "Hats",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Eco Green React Woolen Hat",  // Updated name
        Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 8000,
        PictureUrl = "/images/products/hat-react1.png",
        Brand = "React",
        Type = "Hats",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Purple Luxury React Woolen Hat",  // Updated name
        Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 1500,
        PictureUrl = "/images/products/hat-react2.png",
        Brand = "React",
        Type = "Hats",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Code Master Blue Gloves",  // Updated name
        Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 1800,
        PictureUrl = "/images/products/glove-code1.png",
        Brand = "VS Code",
        Type = "Gloves",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Code Master Green Gloves",  // Updated name
        Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 1500,
        PictureUrl = "/images/products/glove-code2.png",
        Brand = "VS Code",
        Type = "Gloves",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "React Premium Purple Gloves",  // Updated name
        Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 1600,
        PictureUrl = "/images/products/glove-react1.png",
        Brand = "React",
        Type = "Gloves",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "React Premium Green Gloves",  // Updated name
        Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 1400,
        PictureUrl = "/images/products/glove-react2.png",
        Brand = "React",
        Type = "Gloves",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Redis Red Ultimate Boots",  // Updated name
        Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
        Price = 25000,
        PictureUrl = "/images/products/boot-redis1.png",
        Brand = "Redis",
        Type = "Boots",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Core Red Premium Boots",  // Updated name
        Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
        Price = 18999,
        PictureUrl = "/images/products/boot-core2.png",
        Brand = "NetCore",
        Type = "Boots",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Core Purple Deluxe Boots",  // Updated name
        Description = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
        Price = 19999,
        PictureUrl = "/images/products/boot-core1.png",
        Brand = "NetCore",
        Type = "Boots",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Angular Purple Premium Boots",  // Updated name
        Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
        Price = 15000,
        PictureUrl = "/images/products/boot-ang2.png",
        Brand = "Angular",
        Type = "Boots",
        QuantityInStock = 100
    },
    new Products
    {
        Name = "Angular Black Elite Boots",  // Updated name
        Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
        Price = 18000,
        PictureUrl = "/images/products/boot-ang1.png",
        Brand = "Angular",
        Type = "Boots",
        QuantityInStock = 100
    }
};
            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}
