using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Contracts
{
    public interface IOwnerRepository
    {
        Task<IEnumerable<Owner>> GetAll(bool withAccounts = false);

        Task<Owner> GetById(Guid id);

        Task<Owner> CreateOwner(Owner owner);

        Task<Owner> UpdateOwner(Owner dbOwner, Owner owner);

        Task DeleteOwner(Owner owner);
    }
}