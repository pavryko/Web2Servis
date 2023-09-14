using System.Collections.Generic;
using WebService.DTO;

namespace WebService.Interfaces
{
    public interface IProductRepo
    {
        string AddProduct(ProductDTO newProduct);
        List<ProductDTO> UserProducts(int UserId);
        string DeleteProduct(int id);
        ProductDTO GetProduct(int id);
        string ChangeProduct(int id, ProductDTO product);
        List<ProductDTO> AllProducts();
    }
}
