using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using WebService.DTO;
using WebService.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        [Route("/newproduct")]
        public IActionResult NewProduct([FromForm] string ProductName, [FromForm] double Price, [FromForm] string Description, [FromForm] double Amount, [FromForm] IFormFile Image, [FromForm] int UserId) 
        {
            ProductDTO productDTO = new ProductDTO();
            productDTO.Amount = Amount;
            productDTO.Price = Price;   
            productDTO.Description = Description;   
            productDTO.Name = ProductName;
            productDTO.UserId   = UserId;
            if (Image != null)
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    Image.CopyTo(memoryStream);
                    byte[] imageData = memoryStream.ToArray();
                    productDTO.Image = imageData;

                }
            }


            return Ok(_productService.NewProduct(productDTO));
        }

        [HttpGet("getproducts/{UserId}")]
        public IActionResult GetProducts(int UserId)
        {
           
            return Ok(_productService.GetUserProducts(UserId));
        }
        [HttpPut("deleteproduct/{id}")]
        public string DeleteProduct(int id)
        {
            return _productService.DeleteProduct(id);
        }
        [HttpGet("getproduct/{id}")]
        public IActionResult GetProduct(int id)
        {
            return Ok(_productService.GetProduct(id));
        }
        [HttpPut("editproduct/{id}")]
        public IActionResult EditProduct(int id, [FromBody] ProductDTO pro)
        {
            return Ok(_productService.ChangeProduct(id,pro));
        }
        [HttpGet("/getallproducts")]
        public IActionResult GetAllProducts()
        {
            return Ok(_productService.GetAllProducts());
        }

    }
}
