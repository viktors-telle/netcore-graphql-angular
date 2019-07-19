using AutoMapper;
using backend.Contracts;
using backend.Entities;

namespace backend.Mappings
{
    public class OwnerProfile : Profile
    {
        public OwnerProfile()
        {
            CreateMap<Owner, OwnerViewModel>();
        }
    }
}