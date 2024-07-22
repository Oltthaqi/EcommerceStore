using Ecomerce_Store.Data;
using Ecomerce_Store.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecomerce_Store.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public OrderController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _dataContext.Orders
                .Include(o => o.User)
                //.Include(o => o.Product)
                .ToListAsync();
        }


        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder( [FromForm]CreateOrderDto orderDto)
        {
            // Validate input
            if (orderDto == null || orderDto.ProductList == null || orderDto.ProductList.ProductIds == null || orderDto.ProductList.ProductIds.Count == 0)
            {
                return BadRequest("Invalid order data");
            }

            // Check if the userId is valid (you can expand this to check other validations as needed)
            if (!_dataContext.Users.Any(u => u.UserId == orderDto.UserId))
            {
                return BadRequest("Invalid UserId");
            }

            // Validate each productId exists in Products table
            foreach (var productId in orderDto.ProductList.ProductIds)
            {
                if (!_dataContext.Products.Any(p => p.Id == productId))
                {
                    return BadRequest($"Product with Id {productId} does not exist");
                }
            }

            // Calculate total amount based on products or other business logic

            // Create a new Order object
            var order = new Order
            {
               // ProductId = 1,
                UserId = orderDto.UserId,
                OrderDate = orderDto.OrderDate,
                Status = orderDto.Status,
                TotalAmount = orderDto.TotalAmount,
                ProductList = new ProductList
                {
                    ProductIds = orderDto.ProductList.ProductIds
                }
            };

            // Add the order to DbContext and save changes
            _dataContext.Orders.Add(order);
            await _dataContext.SaveChangesAsync();

            // Return created order
            return CreatedAtAction(nameof(GetOrders), new { id = order.Id }, order);
        }



        [HttpPut]
        public async Task<ActionResult<Order>> UpdateOrder(Order o)
        {
            if (o.Id == null)
            {
                return BadRequest("Order does not exist");
            }
            else
            {
                var order = await _dataContext.Orders.FindAsync(o.Id);
                order.Status = o.Status;
                order.TotalAmount = o.TotalAmount;
                await _dataContext.SaveChangesAsync();
                return Ok(order);
            }

        }

        [HttpDelete]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _dataContext.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }else
            {
                _dataContext.Orders.Remove(order);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }
  
        }

    }
}
