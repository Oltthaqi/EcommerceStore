using Ecomerce_Store.Data;
using Ecomerce_Store.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecomerce_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly DataContext _dataContext;

        public UserController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Users>>> Get()
        {
            var users = await _dataContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("Username")]
        public async Task<ActionResult<Users>>  GetByUsername(string username)
        {
            if (!string.IsNullOrEmpty(username))
            {
                var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Username == username);
                return Ok(user);
            }
            else
            {
                return BadRequest("Username is not valid!");
            }
        }


        [HttpPost("Register")]
        public async Task<ActionResult<Users>> Register(Users u)
        {
            
            
                string Password = BCrypt.Net.BCrypt.HashPassword(u.Password);
                if (u.UserId == 0 || u.UserId == null)
                {


                    byte[] byteArray = Convert.FromBase64String(u.profileImgBase64);
                        u.Profileimg = byteArray;
                        u.Orders = null;
                        u.Password = Password;
                        u.Role = "Client";
                        _dataContext.Users.Add(u);
                        await _dataContext.SaveChangesAsync();
                        return Ok(u);
                    
                }
                else
                {
                    return BadRequest("Id is used already");
                }
            
        }


        [HttpPost]
        public async Task<ActionResult<Users>> AddUsers([FromForm] Users u)
        {
            if (u.UserId == 0)
            {
                u.Orders = null;
                _dataContext.Users.Add(u);
                await _dataContext.SaveChangesAsync();
                return CreatedAtAction(nameof(Get), new { id = u.UserId }, u);
            }
            else
            {
                return BadRequest("You can not use this Id because it is used");
            }
        }



        [HttpPut]
        public async Task<ActionResult<Users>> UpdateUsers(Users u , string _password)
        {
            var user = await _dataContext.Users.FindAsync(u.UserId);
            if (user == null)
            {
                return NotFound();
            }
            if (_password != user.Password)
            {
                return BadRequest("Password is not correct!");
            }
            else
            {
                user.Username = u.Username;
                user.Password = u.Password;
                user.Name = u.Name;
                user.Surname = u.Surname;
                user.Role = "Client";
                await _dataContext.SaveChangesAsync();
                return Ok(user);
            }

        }

        [HttpDelete]
        public async Task<ActionResult<Users>> DeleteUser(int id)
        {
            var user = await _dataContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            } 
            else
            {
                _dataContext.Users.Remove(user);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
