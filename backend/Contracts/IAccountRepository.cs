using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Contracts
{
    public interface IAccountRepository
    {
        Task<IEnumerable<Account>> GetAll();

        Task<IEnumerable<Account>> GetAllAccountsPerOwner(Guid ownerId);

        Task<ILookup<Guid, Account>> GetAccountsByOwnerIds(IEnumerable<Guid> ownerIds);
    }
}