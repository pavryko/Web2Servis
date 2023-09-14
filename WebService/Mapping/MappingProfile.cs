using AutoMapper;
using WebService.DTO;
using WebService.Models;

namespace WebService.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderProduct, OrderProductDTO>().ReverseMap();

        } 
        
    }
}
