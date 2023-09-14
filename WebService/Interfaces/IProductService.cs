using System.Collections.Generic;
using WebService.DTO;

namespace WebService.Interfaces
{
    public interface IProductService
    {
        string NewProduct(ProductDTO newProduct);
        List<ProductDTO> GetUserProducts(int UserId);
        string DeleteProduct(int id);
        ProductDTO GetProduct(int id);
        string ChangeProduct(int id, ProductDTO product);
        List<ProductDTO> GetAllProducts();
    }
}
