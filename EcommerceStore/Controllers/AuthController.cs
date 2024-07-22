using Ecomerce_Store.Data;
using Ecomerce_Store.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecomerce_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static Users user = new Users();
        private readonly IConfiguration _Configuration;
        private readonly DataContext _dataContext;
        public AuthController(IConfiguration configuration , DataContext dataContext)
        {
            _Configuration = configuration;
            _dataContext = dataContext;
        }



        [HttpPost("Login")]

            public ActionResult<Users> Login(UserDto request)
            {
            var user = _dataContext.Users.FirstOrDefault(u => u.Username == request.Username);
            if (user.Username != request.Username ||!BCrypt.Net.BCrypt.Verify(request.Password , user.Password)) 
            {
                return BadRequest("Username or password is incorrect");
            }
            string token = createToken(user);

            return Ok(token);
            }

        private string createToken(Users user)
        {
            if (user != null)
            {
                List<Claim> claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Username)
    };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                    _Configuration.GetSection("appSettings:Token").Value!));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

                var jwt = new JwtSecurityTokenHandler().WriteToken(token);

                return jwt;
            }
            else
            {
                return "User has to be filled out";
            }
        }


        }
}
