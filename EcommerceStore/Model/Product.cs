﻿namespace Ecomerce_Store.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? Category { get; set; }
        public byte[]? img { get; set; }
        public string? imgbase64 { get; set; }
        public decimal? PriceDiscount { get; set; }
        public int? rating { get; set; }
        public string? available { get; set; }


        public ICollection<Order>? Orders { get; set; }
    }
}

