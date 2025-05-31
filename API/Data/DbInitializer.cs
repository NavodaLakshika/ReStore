using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    { 
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            // Create default users
            if (!userManager.Users.Any())
            {
                var user = new User { UserName = "bob", Email = "bob@test.com" };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User { UserName = "admin", Email = "admin@test.com" };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }

            // Seed products
            if (await context.Products.AnyAsync()) return;

            var products = new List<Products>
            {
                
         
                
               new Products { Brand = "AlphaTech", Description = "Premium cotton hoodie with AlphaTech branding.", Name = "AlphaTech Hoodie", PictureUrl = "/images/products/hoodie-alpha.png", Price = 45.99m, QuantityInStock = 120, Type = "Clothing" },
new Products { Brand = "NeoFit", Description = "Smartwatch with fitness tracking and heart rate monitor.", Name = "NeoFit Smartwatch", PictureUrl = "/images/products/smartwatch-neofit.png", Price = 149.99m, QuantityInStock = 75, Type = "Electronics" },
new Products { Brand = "SportX", Description = "Official size football with advanced grip technology.", Name = "ProGrip Football", PictureUrl = "/images/products/football-progrip.png", Price = 29.99m, QuantityInStock = 180, Type = "Sports" },
new Products { Brand = "VoltX", Description = "Noise-canceling earbuds with long battery life.", Name = "VoltX Wireless Earbuds", PictureUrl = "/images/products/earbuds-voltx.png", Price = 89.99m, QuantityInStock = 140, Type = "Electronics" },
new Products { Brand = "FlexWear", Description = "Stretchable joggers for sports and leisure.", Name = "UrbanFlex Joggers", PictureUrl = "/images/products/joggers-urbanflex.png", Price = 34.5m, QuantityInStock = 200, Type = "Clothing" },
new Products { Brand = "SkyTech", Description = "20,000mAh power bank with fast charging.", Name = "SkyCharge Power Bank", PictureUrl = "/images/products/powerbank-skycharge.png", Price = 39.99m, QuantityInStock = 160, Type = "Electronics" },
new Products { Brand = "AceGear", Description = "Lightweight tennis racket with graphite frame.", Name = "Elite Tennis Racket", PictureUrl = "/images/products/racket-elite.png", Price = 79.99m, QuantityInStock = 90, Type = "Sports" },
new Products { Brand = "CorePulse", Description = "Over-ear headphones with deep bass and mic.", Name = "CorePulse Headphones", PictureUrl = "/images/products/headphones-corepulse.png", Price = 69.95m, QuantityInStock = 110, Type = "Electronics" },
new Products { Brand = "NorthShield", Description = "Insulated waterproof jacket for winter.", Name = "WinterShield Jacket", PictureUrl = "/images/products/jacket-wintershield.png", Price = 99.0m, QuantityInStock = 130, Type = "Clothing" },
new Products { Brand = "RunFlex", Description = "Breathable, lightweight shoes for running.", Name = "SprintX Running Shoes", PictureUrl = "/images/products/shoes-sprintx.png", Price = 59.99m, QuantityInStock = 150, Type = "Sports" },
new Products { Brand = "ZenTech", Description = "Compact speaker with surround sound.", Name = "ZenAir Bluetooth Speaker", PictureUrl = "/images/products/speaker-zenair.png", Price = 49.99m, QuantityInStock = 190, Type = "Electronics" },
new Products { Brand = "TrailZone", Description = "Durable boots for trail and mountain hiking.", Name = "TrailPro Hiking Boots", PictureUrl = "/images/products/boots-trailpro.png", Price = 82.49m, QuantityInStock = 85, Type = "Sports" },
new Products { Brand = "CodeCraft", Description = "Hoodie with unique binary code pattern.", Name = "CodeCraft Hoodie", PictureUrl = "/images/products/hoodie-codecraft.png", Price = 41.99m, QuantityInStock = 160, Type = "Clothing" },
new Products { Brand = "GlideTech", Description = "Ergonomic mouse with programmable buttons.", Name = "GlideX Gaming Mouse", PictureUrl = "/images/products/mouse-glidex.png", Price = 44.99m, QuantityInStock = 100, Type = "Electronics" },
new Products { Brand = "ZenFlex", Description = "Non-slip yoga mat with eco-material.", Name = "ActiveFlow Yoga Mat", PictureUrl = "/images/products/yogamat-activeflow.png", Price = 24.99m, QuantityInStock = 220, Type = "Sports" },
new Products { Brand = "PixelWave", Description = "Ultra HD 4K Smart TV with WiFi and apps.", Name = "PixelWave Smart TV 55\"", PictureUrl = "/images/products/tv-pixelwave.png", Price = 499.0m, QuantityInStock = 60, Type = "Electronics" },
new Products { Brand = "DryWear", Description = "Waterproof raincoat with hood and vents.", Name = "StormGuard Raincoat", PictureUrl = "/images/products/raincoat-stormguard.png", Price = 59.99m, QuantityInStock = 145, Type = "Clothing" },
new Products { Brand = "ClimbMax", Description = "Professional climbing rope with safety harness.", Name = "ClimbMax Rope Set", PictureUrl = "/images/products/climbing-gear.png", Price = 129.99m, QuantityInStock = 55, Type = "Sports" },
new Products { Brand = "NovaTech", Description = "10-inch Android tablet with stylus.", Name = "NovaTab Tablet 10\"", PictureUrl = "/images/products/tablet-novatab.png", Price = 189.99m, QuantityInStock = 95, Type = "Electronics" },
new Products { Brand = "ArcticFleece", Description = "Warm fleece sweatshirt for casual wear.", Name = "ArcticFleece Sweatshirt", PictureUrl = "/images/products/sweatshirt-arctic.png", Price = 37.5m, QuantityInStock = 170, Type = "Clothing" },
new Products { Brand = "PowerFit", Description = "Foldable treadmill with LCD screen.", Name = "PowerSprint Treadmill", PictureUrl = "/images/products/treadmill-powersprint.png", Price = 799.0m, QuantityInStock = 25, Type = "Sports" },
new Products { Brand = "TechLine", Description = "Multi-port USB 3.0 hub with power adapter.", Name = "ChargePro USB Hub", PictureUrl = "/images/products/usbhub-chargepro.png", Price = 22.49m, QuantityInStock = 210, Type = "Electronics" },
new Products { Brand = "EcoActive", Description = "Antibacterial microfiber towel for workouts.", Name = "EcoDry Gym Towel", PictureUrl = "/images/products/towel-ecodry.png", Price = 12.99m, QuantityInStock = 300, Type = "Sports" },
new Products { Brand = "EchoBeats", Description = "Bluetooth speaker with subwoofer sound.", Name = "EchoBeats Speaker", PictureUrl = "/images/products/speaker-echobeats.png", Price = 59.95m, QuantityInStock = 100, Type = "Electronics" },
new Products { Brand = "NorthShield", Description = "Insulated gloves for extreme temperatures.", Name = "ThermaShield Gloves", PictureUrl = "/images/products/gloves-thermashield.png", Price = 19.99m, QuantityInStock = 190, Type = "Clothing" },
new Products { Brand = "HydraForce", Description = "Insulated stainless steel bottle.", Name = "HydraForce Water Bottle", PictureUrl = "/images/products/bottle-hydraforce.png", Price = 18.99m, QuantityInStock = 275, Type = "Sports" },
new Products { Brand = "VisionTech", Description = "1080p webcam with ring light and mic.", Name = "LightLens Webcam HD", PictureUrl = "/images/products/webcam-lightlens.png", Price = 69.0m, QuantityInStock = 95, Type = "Electronics" },
new Products { Brand = "TrackMate", Description = "Wearable fitness tracker with sleep monitor.", Name = "TrackMate Fitness Tracker", PictureUrl = "/images/products/fitnesstracker-trackmate.png", Price = 59.99m, QuantityInStock = 130, Type = "Electronics" },
new Products { Brand = "CoolBreeze", Description = "Ventilated cap for hot-weather training.", Name = "CoolBreeze Cap", PictureUrl = "/images/products/cap-coolbreeze.png", Price = 14.49m, QuantityInStock = 185, Type = "Clothing" },
new Products { Brand = "PowerFit", Description = "Adjustable dumbbells with stand.", Name = "BalancePro Dumbbell Set", PictureUrl = "/images/products/dumbbells-balancepro.png", Price = 119.99m, QuantityInStock = 65, Type = "Sports" }

};
            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}
