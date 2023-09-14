using System.Collections.Generic;
using WebService.DTO;

namespace WebService.Interfaces
{
    public interface IOrderRepo
    {
        string Ordering(OrderDTO orderDTO);
        List<OrderDTO> AllUsersOrders(int userId);
        List<OrderDTO> UsersActiveOrders(int userId);
        List<OrderDTO> UsersPendingOrders(int userId);
        string CancelOrder(int orderId);
        List<OrderDTO> SellerOrders(int userId);
        List<OrderDTO> SellerActiveOrders(int userId);
        List<OrderDTO> AllActiveOrders();
        List<OrderDTO> AllCanceledOrders();
        List<OrderDTO> AllPreviousOrders();
        List<OrderDTO> AllNotTakenOrders();
        string PayOrder(int orderId);
        List<OrderDTO> PendingOrdersSeller(int userId);
        string SendOrder(int orderId);
    }
}
