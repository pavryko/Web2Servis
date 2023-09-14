using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using WebService.DTO;
using WebService.Interfaces;
using WebService.Services;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            UserDTO u = _userService.GetCurrentUser(id);
            var imageBase64 = Convert.ToBase64String(u.Image);
            return Ok(new { u, imageBase64 });
        }
        [HttpPut("{id}")]
        public string UpdateProfile(int id, [FromForm] string UserName2, [FromForm] string Name2, [FromForm] string Surname2, [FromForm] DateTime Date2, [FromForm] string Email2, [FromForm] string Address2, [FromForm] IFormFile image2)
        {
            UserDTO us = new UserDTO();
            us.Address = Address2;
            us.Email = Email2;
            us.Name = Name2;
            us.Surname = Surname2;   
            us.Date = Date2;
            us.UserName = UserName2;
            if (image2 != null)
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    image2.CopyTo(memoryStream);
                    byte[] imageData = memoryStream.ToArray();
                    us.Image = imageData;

                }
            }
            return _userService.UpdateProfile(id, us);
           
        }
        [HttpPut("updatepassword/{id}")]
        public string ChangePassword(int id,[FromBody] UserDTO us)
        {
            return _userService.UpdatePassword(id,  us.Password);
            
        }
        [HttpGet]
        [Route("/getunacceptedusers")]
        public IActionResult GetUnacceptedusers()
        {
            return Ok(_userService.GetPendingUsers());
        }
        [HttpGet]
        [Route("/getacceptedusers")]
        public IActionResult GetAcceptedusers()
        {
            return Ok(_userService.GetAcceptedUsers());
        }
        [HttpGet]
        [Route("/getdeclinedusers")]
        public IActionResult GetDeclinedusers()
        {
            return Ok(_userService.GetDeclinedUsers());
        }
        [HttpPut("acceptuser/{id}")]
        public string AcceptUser(int id)
        {
            return _userService.AcceptUser(id);

        }
        [HttpPut("declineuser/{id}")]
        public string DeclineUser(int id)
        {
            return _userService.DeclineUser(id);

        }

        

    }
}
