using System.Collections.Generic;
using WebService.DTO;

namespace WebService.Interfaces
{
    public interface IUserRepo
    {
        UserDTO AddUser(UserDTO newUser);
        UserDTO GetUser(UserDTO newUser);
        UserDTO GetUserGoogle(UserDTO newUser);
        UserDTO CurrentUser(int id);
        string UpdateUser(int id, UserDTO us);
        string UpdatePassword(int id, string newPassword);
        List<UserDTO> PendingUsers();
        List<UserDTO> AcceptedUsers();
        List<UserDTO> DeclinedUsers();
        string AcceptUser(int id);
        string DeclineUser(int id);
    }
}
