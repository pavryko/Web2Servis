using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebService.DTO;
using WebService.Interfaces;
using WebService.Models;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService) {

            _userService = userService;

        }

        [HttpPost]
        [Route("/login")]
        public IActionResult Login([FromBody] UserDTO user)
        {
            UserDTO userDTO = new UserDTO();
            userDTO = _userService.LoginUser(user);
            if(userDTO != null) { 
                return Ok(new {userDTO.Token, userDTO.Id, userDTO.TypeOfUser, userDTO.Confirmed });
            }
            else
            {
                return null;
            }
            
            
        }

        [HttpPost]
        [Route("/googlelogin")]
        public IActionResult GoogleLogin([FromBody] UserDTO user)
        {
            UserDTO userDTO = new UserDTO();
            userDTO = _userService.LoginGoogle(user);
            if (userDTO != null)
            {
                return Ok(new { userDTO.Token, userDTO.Id, userDTO.TypeOfUser, userDTO.Confirmed });
            }
            else
            {
                return null;
            }


        }


        [HttpPost]
        [Route("/register")]
        public IActionResult Register([FromForm] string userName, [FromForm] string password, [FromForm] string email, [FromForm] string name, [FromForm] string surname, [FromForm] DateTime date, [FromForm] string address, [FromForm] string typeOfUser, [FromForm] IFormFile image)
        {
            UserDTO userDTO = new UserDTO();
          
            userDTO.UserName = userName;    
            userDTO.Password = password;
            userDTO.Email = email;
            userDTO.Name = name;    
            userDTO.Surname = surname;  
            userDTO.Date = date;    
            userDTO.Address = address;
            userDTO.TypeOfUser = typeOfUser;
            if(typeOfUser == "Seller")
            {
                userDTO.Confirmed = "Pending";
            }
            else
            {
                userDTO.Confirmed = "Accepted";
            }
            if (image != null)
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    image.CopyTo(memoryStream);
                    byte[] imageData = memoryStream.ToArray();
                    userDTO.Image = imageData;  
                    
                }
            }

            return Ok(_userService.RegisterUser(userDTO));
        }

        

    }
}
