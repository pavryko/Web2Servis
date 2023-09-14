using AutoMapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WebService.DTO;
using WebService.Infrastructure;
using WebService.Interfaces;
using WebService.Repository;

namespace WebService.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepo _productRepo;

        public ProductService(IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }
        public string ChangeProduct(int id, ProductDTO product)
        {
            return _productRepo.ChangeProduct(id,product);
        }

        public string DeleteProduct(int id)
        {
            return _productRepo.DeleteProduct(id);
        }

        public List<ProductDTO> GetAllProducts()
        {
            return _productRepo.AllProducts();
        }

        public ProductDTO GetProduct(int id)
        {
            return _productRepo.GetProduct(id);
        }

        public List<ProductDTO> GetUserProducts(int UserId)
        {
            return _productRepo.UserProducts(UserId);
        }

        public string NewProduct(ProductDTO newProduct)
        {
            return _productRepo.AddProduct(newProduct);
        }
    }
}
