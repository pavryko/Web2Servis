using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using WebService.DTO;
using WebService.Infrastructure;
using WebService.Interfaces;
using WebService.Models;
using WebService.Repository;

namespace WebService.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly UserDBContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IUserRepo _userRepo;

        public UserService(IMapper mapper, UserDBContext dBContext, IConfiguration configuration, IUserRepo userRepo)
        {
            _mapper = mapper;
            _dbContext = dBContext;
            _dbContext.Database.EnsureCreated();
            _configuration = configuration;
            _userRepo = userRepo;

        }
        public UserDTO RegisterUser(UserDTO newUser)
        {
            return _userRepo.AddUser(newUser);
           
        }
        public UserDTO LoginUser(UserDTO newUser)
        {
            return _userRepo.GetUser(newUser);
        
        }
        public UserDTO LoginGoogle(UserDTO newUser)
        {
            return _userRepo.GetUserGoogle(newUser);
        }
        public UserDTO GetCurrentUser(int id)
        {
            return _userRepo.CurrentUser(id);
        }

        public string UpdateProfile(int id, UserDTO us)
        {
            return _userRepo.UpdateUser(id, us);   
        }

        public string UpdatePassword(int id,  string newPassword)
        {
            return _userRepo.UpdatePassword(id, newPassword);
        }

        public List<UserDTO> GetPendingUsers()
        {
            return _userRepo.PendingUsers();
        }

        public List<UserDTO> GetAcceptedUsers()
        {
            return _userRepo.AcceptedUsers();
        }

        public List<UserDTO> GetDeclinedUsers()
        {
            return _userRepo.DeclinedUsers();
        }

        public string AcceptUser(int id)
        {
            return _userRepo.AcceptUser(id);
        }

        public string DeclineUser(int id)
        {
            return _userRepo.DeclineUser(id);   
        }
    }
}
