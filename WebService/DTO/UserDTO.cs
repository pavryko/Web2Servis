﻿using Microsoft.AspNetCore.Http;
using System;
using WebService.Models;

namespace WebService.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Date { get; set; }
        public string Address { get; set; }
        public string TypeOfUser { get; set; }
        public byte[] Image { get; set; }
        public string Token { get; set; }
        public string Confirmed { get; set; }

    }
}
