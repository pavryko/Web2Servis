using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using WebService.DTO;
using WebService.Interfaces;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost]
        [Route("/ordering")]
        public IActionResult Ordering([FromBody]  OrderDTO orderDTO)
        {
            orderDTO.OrderDate = DateTime.Now;
            Random random = new Random();
            orderDTO.isCanceled = false;
            orderDTO.isSent = false;
            if(orderDTO.PaidMethod == "cod")
            {
                orderDTO.isPaid = true;
            }
            else
            {
                orderDTO.isPaid = false;
            }
           

            //int randomHours = random.Next(2, 24); // Generišite broj između 2 i 23
            //orderDTO.orderExpiration = DateTime.Now.AddHours(randomHours);
            return Ok(_orderService.CreateOrder(orderDTO));
        }
        [HttpGet("/previousorders/{userId}")]
        public IActionResult PreviousOrders(int userId)
        {
            return Ok(_orderService.GetAllUsersOrders(userId));
        }
        [HttpGet("/activeorders/{userId}")]
        public IActionResult ActiveOrders(int userId)
        {
            
            return Ok(_orderService.GetUsersActiveOrders(userId));
        }
        [HttpGet("/ordersonwait/{userId}")]
        public IActionResult PendingOrders(int userId)
        {
            
            return Ok(_orderService.GetPendingOrders(userId));
        }
        [HttpGet("/ordersonwaitseller/{userId}")]
        public IActionResult WaitingOrdersSeller(int userId)
        {
           
            return Ok(_orderService.GetPendingOrdersSeller(userId));
        }
        [HttpPut("/cancelorder/{orderId}")]
        public string CancelOrder(int orderId)
        {
            return (_orderService.CancelOrder(orderId));
        }
        [HttpPut("/sendorder/{orderId}")]
        public string SendOrder(int orderId)
        {
            return (_orderService.SendOrder(orderId));
        }
        [HttpPut("/paybypaypal/{orderId}")]
        public string PayOrder(int orderId)
        {
            return (_orderService.PayOrder(orderId));
        }
        [HttpGet("/sellerorders/{userId}")]
        public IActionResult GetSellerOrders(int userId)
        {
            return Ok(_orderService.GetSellersOrders(userId));
        }
        [HttpGet("/selleractiveorders/{userId}")]
        public IActionResult GetSellerActiveOrders(int userId)
        {
            return Ok(_orderService.GetSellersActiveOrders(userId));
        }
        [HttpGet("/allactiveorders")]
        public IActionResult GetAllActiveOrders()
        {
            return Ok(_orderService.GetAllActiveOrders());
        }
        [HttpGet("/allcanceledorders")]
        public IActionResult GetAllCanceledOrders()
        {
            return Ok(_orderService.GetAllCanceledOrders());
        }
        [HttpGet("/allpreviousorders")]
        public IActionResult GetAllPreviousOrders()
        {
            return Ok(_orderService.GetAllPreviousOrders());
        }
        [HttpGet("/allnottakenorders")]
        public IActionResult GetAllNotTakenOrders()
        {
            return Ok(_orderService.GetAllNotTakenOrders());
        }

    }
}
