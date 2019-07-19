using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Contracts;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationContext context;

        public AccountRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<ILookup<Guid, Account>> GetAccountsByOwnerIds(IEnumerable<Guid> ownerIds)
        {
            var accounts = await context.Accounts
                .Where(a => ownerIds.Contains(a.OwnerId))
                .ToListAsync();
            return accounts.ToLookup(x => x.OwnerId);
        }

        public async Task<IEnumerable<Account>> GetAll() => await context.Accounts.ToListAsync();

        public async Task<IEnumerable<Account>> GetAllAccountsPerOwner(Guid ownerId) =>
            await context.Accounts
            .Where(a => a.OwnerId.Equals(ownerId))
            .ToListAsync();
    }
}