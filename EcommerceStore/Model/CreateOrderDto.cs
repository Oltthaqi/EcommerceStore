namespace Ecomerce_Store.Model
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public ProductListDto ProductList { get; set; }
    }

    public class ProductListDto
    {
        public List<int> ProductIds { get; set; }
    }
}
