using AutoMapper;
using backend.Contracts;
using backend.Entities;

namespace backend.Mappings
{
    public class AccountProfile : Profile
    {
        public AccountProfile()
        {
            CreateMap<Account, AccountViewModel>();
        }
    }
}