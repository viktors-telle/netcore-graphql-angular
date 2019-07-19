using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Contracts;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly ApplicationContext context;

        public OwnerRepository(ApplicationContext context) => this.context = context;

        public async Task<IEnumerable<Owner>> GetAll(bool withAccounts = false)
        {
            var owners = context.Owners.AsNoTracking();

            if (withAccounts)
            {
                owners = owners.Include(o => o.Accounts);
            }

            return await owners.ToListAsync();
        }

        public async Task<Owner> GetById(Guid id) => await context.Owners
            .FirstOrDefaultAsync(o => o.Id == id);

        public async Task<Owner> CreateOwner(Owner owner)
        {
            owner.Id = Guid.NewGuid();
            context.Add(owner);
            await context.SaveChangesAsync();
            return owner;
        }

        public async Task<Owner> UpdateOwner(Owner dbOwner, Owner owner)
        {
            dbOwner.Name = owner.Name;
            dbOwner.Address = owner.Address;

            await context.SaveChangesAsync();

            return dbOwner;
        }

        public async Task DeleteOwner(Owner owner)
        {
            context.Remove(owner);
            await context.SaveChangesAsync();
        }
    }
}