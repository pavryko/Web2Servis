using System.Collections.Generic;
using WebService.DTO;

namespace WebService.Interfaces
{
    public interface IOrderService
    {
        string CreateOrder(OrderDTO orderDTO);
        List<OrderDTO> GetAllUsersOrders(int userId);
        List<OrderDTO> GetUsersActiveOrders(int userId);
        List<OrderDTO> GetPendingOrders(int userId);
        string CancelOrder(int orderId);
        List<OrderDTO> GetSellersOrders(int userId);
        List<OrderDTO> GetSellersActiveOrders(int userId);
        List<OrderDTO> GetAllActiveOrders();
        List<OrderDTO> GetAllCanceledOrders();
        List<OrderDTO> GetAllPreviousOrders();
        List<OrderDTO> GetAllNotTakenOrders();
        string PayOrder(int orderId);
        List<OrderDTO> GetPendingOrdersSeller(int userId);
        string SendOrder(int orderId);
    }
}
