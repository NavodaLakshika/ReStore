using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new  ();

        public void AddItem(Products product, int quantity)
        {
            

            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity  += quantity;
        }

        public void RemoveItem(int productId,int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
           item.Quantity -= quantity;
            if (item.Quantity == 0)
            { 
                Items.Remove(item);
            }
        
    }

        internal void AddItem(Microsoft.CodeAnalysis.Project product, int quantity)
        {
            throw new NotImplementedException();
        }
    }
}
           
           