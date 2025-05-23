using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Products")]
    public class Products
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string PictureUrl { get; set; }

        public string Brand { get; set; }

        public string Type { get; set; }

        public int QuantityInStock { get; set; }
    }
}
