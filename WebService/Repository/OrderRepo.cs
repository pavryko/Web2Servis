using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using WebService.DTO;
using WebService.Interfaces;
using WebService.Models;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using WebService.Infrastructure;
using System.Linq;

namespace WebService.Repository
{
    public class OrderRepo : IOrderRepo
    {

        private readonly IMapper _mapper;
        private readonly UserDBContext _dbContext;

        public OrderRepo(IMapper mapper, UserDBContext dBContext)
        {
            _mapper = mapper;
            _dbContext = dBContext;
            _dbContext.Database.EnsureCreated();

        }

        public string Ordering(OrderDTO orderDTO)
        {
            Order order = _mapper.Map<Order>(orderDTO);
            foreach (var orderProduct in order.OrderProducts)
            {
                var product = _dbContext.Products.FirstOrDefault(p => p.Id == orderProduct.ProductId);

                if (product != null)
                {

                    orderProduct.ProductName = product.Name;
                    orderProduct.ProductPrice = product.Price;

                }
            }
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            foreach (var orderProduct in orderDTO.OrderProducts)
            {
                var product = _dbContext.Products.FirstOrDefault(p => p.Id == orderProduct.ProductId);
                if (product != null)
                {
                    product.Amount -= orderProduct.Quantity;
                }
            }

            _dbContext.SaveChanges();

            return "Uradjeno";
        }
        public List<OrderDTO> AllUsersOrders(int userId)
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;

            var o = _dbContext.Orders.Include(o => o.OrderProducts)
                                    .Where(o => o.orderExpiration <= currentTime && !o.isCanceled && o.UserId == userId && o.isPaid && o.isSent);

            foreach (var order in o)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }

            return orders;
        }
        public List<OrderDTO> UsersActiveOrders(int userId)
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;
            var o = _dbContext.Orders.Include(o => o.OrderProducts)
                                     .Where(o => o.orderExpiration >= currentTime && !o.isCanceled && o.UserId == userId && o.isPaid && o.isSent);

            foreach (var order in o)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }
            return orders;
        }


        public List<OrderDTO> UsersPendingOrders(int userId)
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;
            var o = _dbContext.Orders.Include(o => o.OrderProducts)
                                     .Where(o => !o.isCanceled && o.UserId == userId && o.isPaid && !o.isSent);

            foreach (var order in o)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }
            return orders;
        }
        public string CancelOrder(int orderId)
        {
            var order = _dbContext.Orders.Find(orderId);
            order.isCanceled = true;
            foreach (var orderProduct in order.OrderProducts)
            {
                var product = _dbContext.Products.FirstOrDefault(p => p.Id == orderProduct.ProductId);
                if (product != null)
                {
                    product.Amount += orderProduct.Quantity;
                }
            }

            _dbContext.SaveChanges();
            try
            {
                _dbContext.SaveChanges();
                return "Successfully canceled order!";
            }
            catch (Exception ex)
            {

            }
            return "Error while canceling order!";
        }
        public List<OrderDTO> SellerOrders(int userId)
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;

            var ordersWithSellerProduct = _dbContext.Orders
                .Where(order => order.OrderProducts.Any(op => _dbContext.Products.Any(p => p.Id == op.ProductId && p.UserId == userId)))
                .Where(o => o.orderExpiration <= currentTime && !o.isCanceled && o.isSent && o.isPaid)
                .Include(o => o.OrderProducts)
                .ToList();

            foreach (var order in ordersWithSellerProduct)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }

            return orders;
        }
        public List<OrderDTO> SellerActiveOrders(int userId)
        {

            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;

            var ordersWithSellerProduct = _dbContext.Orders
                .Where(order => order.OrderProducts.Any(op => _dbContext.Products.Any(p => p.Id == op.ProductId && p.UserId == userId)))
                 .Where(o => o.orderExpiration >= currentTime && !o.isCanceled && o.isSent && o.isPaid)
                .Include(o => o.OrderProducts)
                .ToList();

            foreach (var order in ordersWithSellerProduct)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }

            return orders;
        }
        public List<OrderDTO> AllActiveOrders()
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;
            var o = _dbContext.Orders.Include(o => o.OrderProducts)
                                     .Where(o => o.orderExpiration >= currentTime && !o.isCanceled && o.isSent && o.isPaid);

            foreach (var order in o)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }
            return orders;
        }
        public List<OrderDTO> AllCanceledOrders()
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;
            var o = _dbContext.Orders.Include(o => o.OrderProducts)
                                     .Where(o => o.isCanceled);

            foreach (var order in o)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }
            return orders;
        }
        public List<OrderDTO> AllPreviousOrders()
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;
            var o = _dbContext.Orders.Include(o => o.OrderProducts)
                                     .Where(o => o.orderExpiration <= currentTime && !o.isCanceled && o.isSent && o.isPaid);

            foreach (var order in o)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }
            return orders;
        }
        public List<OrderDTO> AllNotTakenOrders()
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;
            var o = _dbContext.Orders.Include(o => o.OrderProducts)
                                     .Where(o => !o.isCanceled && !o.isSent && o.isPaid);

            foreach (var order in o)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }
            return orders;
        }
        public string PayOrder(int orderId)
        {
            var order = _dbContext.Orders.Find(orderId);
            order.isPaid = true;
            try
            {
                _dbContext.SaveChanges();
                return "Successfully paid order!";
            }
            catch (Exception ex)
            {

            }
            return "Error while paid order!";
        }
        public List<OrderDTO> PendingOrdersSeller(int userId)
        {

            List<OrderDTO> orders = new List<OrderDTO>();
            var currentTime = DateTime.Now;

            var ordersWithSellerProduct = _dbContext.Orders
                .Where(order => order.OrderProducts.Any(op => _dbContext.Products.Any(p => p.Id == op.ProductId && p.UserId == userId)))
                .Where(o => o.orderExpiration <= currentTime && !o.isCanceled && o.isPaid && !o.isSent)
                .Include(o => o.OrderProducts)
                .ToList();

            foreach (var order in ordersWithSellerProduct)
            {
                var orderDTO = _mapper.Map<OrderDTO>(order);
                orders.Add(orderDTO);
            }

            return orders;
        }
        public string SendOrder(int orderId)
        {
            var order = _dbContext.Orders.Find(orderId);
            order.isSent = true;
            Random random = new Random();
            int randomHours = random.Next(2, 24);
            order.orderExpiration = DateTime.Now.AddHours(randomHours);
            try
            {
                _dbContext.SaveChanges();
                return "Successfully send order!";
            }
            catch (Exception ex)
            {
                return "Error while send order!";
            }

        }
    }
}
