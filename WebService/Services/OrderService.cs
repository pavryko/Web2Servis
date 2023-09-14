using System.Collections.Generic;
using WebService.DTO;
using WebService.Interfaces;

namespace WebService.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepo _orderRepo;
        public OrderService(IOrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
        }
        public string CancelOrder(int orderId)
        {
            return _orderRepo.CancelOrder(orderId);
        }

        public string CreateOrder(OrderDTO orderDTO)
        {
            return _orderRepo.Ordering(orderDTO);
        }

        public List<OrderDTO> GetAllActiveOrders()
        {
            return _orderRepo.AllActiveOrders();
        }

        public List<OrderDTO> GetAllCanceledOrders()
        {
            return _orderRepo.AllCanceledOrders();
        }

        public List<OrderDTO> GetAllNotTakenOrders()
        {
            return _orderRepo.AllNotTakenOrders();
        }

        public List<OrderDTO> GetAllPreviousOrders()
        {
            return _orderRepo.AllPreviousOrders();
        }

        public List<OrderDTO> GetAllUsersOrders(int userId)
        {
            return _orderRepo.AllUsersOrders(userId);
        }

        public List<OrderDTO> GetPendingOrders(int userId)
        {
            return _orderRepo.UsersPendingOrders(userId);
        }

        public List<OrderDTO> GetPendingOrdersSeller(int userId)
        {
            return _orderRepo.PendingOrdersSeller(userId);
        }

        public List<OrderDTO> GetSellersActiveOrders(int userId)
        {
            return _orderRepo.SellerActiveOrders(userId);
        }

        public List<OrderDTO> GetSellersOrders(int userId)
        {
            return _orderRepo.SellerOrders(userId);
        }

        public List<OrderDTO> GetUsersActiveOrders(int userId)
        {
            return _orderRepo.UsersActiveOrders(userId);
        }

        public string PayOrder(int orderId)
        {
            return _orderRepo.PayOrder(orderId);
        }

        public string SendOrder(int orderId)
        {
            return _orderRepo.SendOrder(orderId);
        }
    }
}
