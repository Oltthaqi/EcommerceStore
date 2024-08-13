using Ecomerce_Store.Data;
using Ecomerce_Store.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecomerce_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ProductController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            var products = await _dataContext.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("Id")]
        public async Task<ActionResult<List<Product>>> GetById(int id)
        {
            var products = await _dataContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProducts([FromForm] Product p, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");

            }
            else
            {
                if (p.Id == 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(memoryStream);
                        byte[] byteArray = memoryStream.ToArray();
                        p.img = byteArray;
                        p.imgbase64 = Convert.ToBase64String(byteArray);
                        p.Orders = null;
                        if(p.rating == null || p.rating > 5)
                        {
                            p.rating = 5;
                        }
                        if(!p.available.Equals("yes"))
                        {
                            p.available = "no";
                        }


                        _dataContext.Products.Add(p);
                        await _dataContext.SaveChangesAsync();

                        return Ok(_dataContext.Products.ToList());
                    }
                }
                else
                {
                    return BadRequest("This id is already in use!");
                }
            }
        }


        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct(Product p)
        {
            var product = await _dataContext.Products.FindAsync(p.Id);
            if (product == null)
            {
                return NotFound("The product you're looking for is not found.");
            }
            else
            {
                product.Name = string.IsNullOrEmpty(p.Name) ? product.Name : p.Name;
                product.Price = decimal.Equals(p.PriceDiscount, null) ? product.PriceDiscount : p.PriceDiscount;
                product.PriceDiscount = decimal.Equals(p.Price, null) ? product.Price : p.Price;
                product.Description = string.IsNullOrEmpty(p.Description) ? product.Description : p.Description;
                product.available = string.IsNullOrEmpty(p.available) ? product.available : p.available;
                product.Category = string.IsNullOrEmpty(p.Category) ? product.Category : p.Category;
                product.img =product.img;
                product.imgbase64 = product.imgbase64;
                if (p.rating != null || p.rating == 0 || p.rating > 5)
                {
                    product.rating = p.rating;
                }

                await _dataContext.SaveChangesAsync();
                return Ok(product);
            }

        }

        [HttpDelete]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _dataContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                _dataContext.Products.Remove(product);
                await _dataContext.SaveChangesAsync();
                return Ok(product);
            }
        }
    }
}
