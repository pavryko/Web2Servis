using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace WebService.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
