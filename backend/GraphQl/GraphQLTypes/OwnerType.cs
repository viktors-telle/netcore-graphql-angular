using System;
using backend.Contracts;
using backend.Entities;
using GraphQL.DataLoader;
using GraphQL.Types;

namespace backend.GraphQl.GraphQLTypes
{
    public class OwnerType : ObjectGraphType<Owner>
    {
        public OwnerType(IAccountRepository accountRepository, IDataLoaderContextAccessor dataLoader)
        {
            Field(x => x.Id, type : typeof(IdGraphType)).Description("Id property from the owner object.");
            Field(x => x.Name).Description("Name property from the owner object.");
            Field(x => x.Address).Description("Address property from the owner object.");
            FieldAsync<ListGraphType<AccountType>>(
                "accounts",
                "List of owner accounts.",
                resolve : async context =>
                {
                    var loader = dataLoader.Context.GetOrAddCollectionBatchLoader<Guid, Account>("GetAccountsByOwnerIds", accountRepository.GetAccountsByOwnerIds);
                    return await loader.LoadAsync(context.Source.Id);
                });
        }
    }
}