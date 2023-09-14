using Microsoft.EntityFrameworkCore;
using System.Text;
using System;
using WebService.DTO;
using WebService.Models;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using WebService.Infrastructure;
using WebService.Interfaces;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Collections.Generic;
using MimeKit;

namespace WebService.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly IMapper _mapper;
        private readonly UserDBContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserRepo(IMapper mapper, UserDBContext dBContext, IConfiguration configuration)
        {
            _mapper = mapper;
            _dbContext = dBContext;
            _dbContext.Database.EnsureCreated();
            _configuration = configuration;

        }

        public UserDTO AddUser(UserDTO newUser)
        {
            if (!_dbContext.Users.Any(u => u.UserName == newUser.UserName && u.Email == newUser.Email))
            {


                User user = _mapper.Map<User>(newUser);
                user.Password = HashPassword(user.Password);
                user.Token = "";



                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
                return _mapper.Map<UserDTO>(newUser);
            }
            else
            {

                return null;

            }

        }

        public UserDTO GetUser(UserDTO newUser)
        {
            string pass = HashPassword(newUser.Password);
            if (_dbContext.Users.FirstOrDefault(u => u.UserName == newUser.UserName && u.Password == pass) != null)
            {
                User u = _dbContext.Users.FirstOrDefault(u => u.UserName == newUser.UserName);
                //currUser = _mapper.Map<UserDTO>(u);    
                //string token = Guid.NewGuid().ToString(); 
                string token = GenerateJwtToken(newUser.UserName);
                u.Token = token;

                _dbContext.Entry(u).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _dbContext.SaveChanges();
                return _mapper.Map<UserDTO>(u);

            }
            else
            {
                return null;
            }

        }

        public UserDTO GetUserGoogle(UserDTO newUser)
        {

            if (_dbContext.Users.FirstOrDefault(u => u.Email == newUser.Email) != null && newUser.Token != null)
            {
                User u = _dbContext.Users.FirstOrDefault(u => u.Email == newUser.Email);
                string token = GenerateJwtToken(u.UserName);
                u.Token = token;

                _dbContext.Entry(u).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _dbContext.SaveChanges();
                return _mapper.Map<UserDTO>(u);

            }
            else
            {
                return null;
            }
        }

        public UserDTO CurrentUser(int id)
        {
            var user = _dbContext.Users.Find(id);
            if (user == null)
            {
                return null;
            }

            return _mapper.Map<UserDTO>(user);
        }

        public string UpdateUser(int id, UserDTO us)
        {
            var user = _dbContext.Users.Find(id);
            user.UserName = us.UserName;
            user.Name = us.Name;
            user.Surname = us.Surname;
            user.Date = us.Date;
            user.Email = us.Email;
            user.Address = us.Address;
            user.Image = us.Image;

            try
            {
                _dbContext.SaveChanges();
                return "Uspesno promenjen profil";
            }
            catch (Exception ex)
            {
                return "Greska prilikom promene";
            }



        }
        public string UpdatePassword(int id, string newPassword)
        {
            var user = _dbContext.Users.Find(id);


            string newPas = HashPassword(newPassword);
            user.Password = newPas;
            try
            {
                _dbContext.SaveChanges();
                return "Uspesno promenjen password!";
            }
            catch (Exception ex)
            {
                return "Greska prilikom promene!";
            }



        }
        public List<UserDTO> PendingUsers()
        {
            List<UserDTO> users = new List<UserDTO>();
            var korisnici = _dbContext.Users.Where(u => u.Confirmed == "Pending" && u.TypeOfUser == "Seller");
            foreach (var user in korisnici)
            {

                users.Add(_mapper.Map<UserDTO>(user));
            }

            return users;
        }

        public List<UserDTO> AcceptedUsers()
        {
            List<UserDTO> users = new List<UserDTO>();
            var korisnici = _dbContext.Users.Where(u => u.Confirmed == "Accepted" && u.TypeOfUser == "Seller");
            foreach (var user in korisnici)
            {

                users.Add(_mapper.Map<UserDTO>(user));
            }

            return users;
        }
        public List<UserDTO> DeclinedUsers()
        {
            List<UserDTO> users = new List<UserDTO>();
            var korisnici = _dbContext.Users.Where(u => u.Confirmed == "Declined" && u.TypeOfUser == "Seller");
            foreach (var user in korisnici)
            {

                users.Add(_mapper.Map<UserDTO>(user));
            }

            return users;
        }

        public string AcceptUser(int id)
        {
            var user = _dbContext.Users.Find(id);
            user.Confirmed = "Accepted";
            try
            {
                _dbContext.SaveChanges();
                string subject = "Vaš zahtev je prihvaćen";
                string message = "Vaš zahtev je uspešno prihvaćen. Dobrodošli!";
                SendEmail(user.Email, subject, message);
                return "Uspesno prihvacen user!";
            }
            catch (Exception ex)
            {
                return "Greska prilikom prihvatanja!";
            }

        }
        public string DeclineUser(int id)
        {
            var user = _dbContext.Users.Find(id);
            user.Confirmed = "Declined";
            try
            {
                _dbContext.SaveChanges();
                string subject = "Vaš zahtev je odbijen";
                string message = "Nažalost, vaš zahtev je odbijen. Hvala na interesovanju.";
                SendEmail(user.Email, subject, message);
                return "Uspesno odbijen user!";
            }
            catch (Exception ex)
            {
                return "Greska prilikom odbijanja!";
            }

        }


        private string GenerateJwtToken(string username)
        {
            var key = Encoding.ASCII.GetBytes("your_secret_key_here");
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("username", username) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private static string HashPassword(string password)
        {

            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }

        }
        public void SendEmail(string recipientEmail, string subject, string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Your Name", _configuration["EmailSettings:Username"]));
            emailMessage.To.Add(new MailboxAddress("", recipientEmail));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain") { Text = message };

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect(_configuration["EmailSettings:SmtpServer"], int.Parse(_configuration["EmailSettings:Port"]), false);
                client.Authenticate(_configuration["EmailSettings:Username"], _configuration["EmailSettings:Password"]);
                client.Send(emailMessage);
                client.Disconnect(true);
            }
        }
    }
}
