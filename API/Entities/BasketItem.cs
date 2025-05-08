

using System.ComponentModel.DataAnnotations.Schema; 

namespace API.Entities
{
    [Table("BasketItems")]
    
   
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public int ProductId { get; set; }
        public Products Product { get; internal set; }

        public int BasketId { get; set; }
         public Basket Basket { get; set; } 
        
    }
}
