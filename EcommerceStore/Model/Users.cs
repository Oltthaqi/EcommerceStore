using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Ecomerce_Store.Model
{
    public class Users
    {
        [Key]
        public int? UserId { get; set; }
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public byte[]? Profileimg { get; set; }
        public string? profileImgBase64 { get; set; }


        public ICollection<Order>? Orders { get; set; }
    }
}

