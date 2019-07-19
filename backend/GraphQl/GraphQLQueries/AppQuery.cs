using System;
using backend.Contracts;
using backend.GraphQl.GraphQLTypes;
using GraphQL;
using GraphQL.Types;

namespace backend.GraphQl.GraphQLQueries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(IOwnerRepository ownerRepository, IAccountRepository accountRepository)
        {
            FieldAsync<ListGraphType<OwnerType>>(
                "owners",
                resolve : async context => await ownerRepository.GetAll()
            );

            FieldAsync<ListGraphType<AccountType>>(
                "accounts",
                resolve : async context => await accountRepository.GetAll()
            );

            FieldAsync<OwnerType>(
                "owner",
                arguments : new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "ownerId" }),
                resolve : async context =>
                {
                    Guid id;
                    if (!Guid.TryParse(context.GetArgument<string>("ownerId"), out id))
                    {
                        context.Errors.Add(new ExecutionError("Wrong value for guid"));
                        return null;
                    }

                    return await ownerRepository.GetById(id);
                }
            );
        }
    }
}