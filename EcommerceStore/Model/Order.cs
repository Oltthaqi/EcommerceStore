using System.Text.Json.Serialization;

namespace Ecomerce_Store.Model
{
    public class Order
    {

        public int Id { get; set; }
        public int UserId { get; set; }

        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }

        [JsonIgnore]
        public Users User { get; set; }
        [JsonIgnore]
        //public Product Product { get; set; }
        public ProductList ProductList { get; set; }
    }

    public class ProductList
    {
        public List<int> ProductIds { get; set; }
    }

}
