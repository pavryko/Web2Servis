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
    public class ProductRepo : IProductRepo
    {
        private readonly IMapper _mapper;
        private readonly UserDBContext _dbContext;
        private readonly IConfiguration _configuration;
        public ProductRepo(IMapper mapper, UserDBContext dBContext, IConfiguration configuration)
        {
            _mapper = mapper;
            _dbContext = dBContext;
            _dbContext.Database.EnsureCreated();
            _configuration = configuration;

        }
        public string AddProduct(ProductDTO newProduct)
        {
            if (!_dbContext.Products.Any(p => p.Name == newProduct.Name))
            {


                Product product = _mapper.Map<Product>(newProduct);



                _dbContext.Products.Add(product);
                _dbContext.SaveChanges();
                return "Uspesno dodat product!!!";
            }
            else
            {

                return "Nije uspesno dodat product!!!";

            }
        }
        public List<ProductDTO> UserProducts(int UserId)
        {
            List<ProductDTO> products = new List<ProductDTO>();
            var p = _dbContext.Products.Where(p => p.UserId == UserId);
            foreach (var pro in p)
            {

                products.Add(_mapper.Map<ProductDTO>(pro));
            }
            return products;
        }
        public string DeleteProduct(int id)
        {
            var product = _dbContext.Products.Find(id);
            if (product != null)
            {
                _dbContext.Products.Remove(product);
            }

            try
            {
                _dbContext.SaveChanges();
                return "Uspesno obrisan product!";
            }
            catch (Exception ex)
            {

            }
            return "Greska prilikom brisanja!";
        }
        public ProductDTO GetProduct(int id)
        {
            if (_dbContext.Products.FirstOrDefault(p => p.Id == id) != null)
            {
                Product product = _dbContext.Products.FirstOrDefault(p => p.Id == id);
                return _mapper.Map<ProductDTO>(product);
            }
            else
            {
                return null;
            }
        }
        public string ChangeProduct(int id, ProductDTO product)
        {
            var pro = _dbContext.Products.Find(id);
            pro.Name = product.Name;
            pro.Amount = product.Amount;
            pro.Description = product.Description;
            pro.Price = product.Price;

            try
            {
                _dbContext.SaveChanges();
                return "Uspesno promenjen product";
            }
            catch (Exception ex)
            {

            }
            return "Greska prilikom promene";
        }

        public List<ProductDTO> AllProducts()
        {
            List<ProductDTO> products = new List<ProductDTO>();
            var p = _dbContext.Products;
            foreach (var pro in p)
            {
                products.Add(_mapper.Map<ProductDTO>(pro));
            }
            return products;
        }
    }
}
