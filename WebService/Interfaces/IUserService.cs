using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebService.DTO;

namespace WebService.Interfaces
{
    public interface IUserService
    {
        UserDTO RegisterUser(UserDTO newUser);
        UserDTO LoginUser(UserDTO newUser);
        UserDTO LoginGoogle(UserDTO newUser);
        UserDTO GetCurrentUser(int id);
        string UpdateProfile(int id, UserDTO us);
        string UpdatePassword(int id, string newPassword);
        List<UserDTO> GetPendingUsers();
        List<UserDTO> GetAcceptedUsers();
        List<UserDTO> GetDeclinedUsers();
        string AcceptUser(int id);
        string DeclineUser(int id);

    }
}
