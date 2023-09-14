using System.Collections.Generic;
using System;
using WebService.Models;

namespace WebService.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double Price { get; set; }
        public DateTime OrderDate { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
        public DateTime orderExpiration { get; set; }
        public bool isCanceled { get; set; }
        public bool isSent { get; set; }
        public bool isPaid { get; set; }
        public string PaidMethod { get; set; }
    }
}
