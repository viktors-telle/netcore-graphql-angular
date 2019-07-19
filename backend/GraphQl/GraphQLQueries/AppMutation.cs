using System;
using backend.Contracts;
using backend.Entities;
using backend.GraphQl.GraphQLTypes;
using GraphQL;
using GraphQL.Types;

namespace backend.GraphQl.GraphQLQueries
{
    public class AppMutation : ObjectGraphType
    {
        public AppMutation(IOwnerRepository ownerRepository)
        {
            FieldAsync<OwnerType>(
                "createOwner",
                arguments : new QueryArguments(new QueryArgument<NonNullGraphType<OwnerInputType>> { Name = "owner" }),
                resolve : async context =>
                {
                    var owner = context.GetArgument<Owner>("owner");
                    return await ownerRepository.CreateOwner(owner);
                }
            );

            FieldAsync<OwnerType>(
                "updateOwner",
                arguments : new QueryArguments(
                    new QueryArgument<NonNullGraphType<OwnerInputType>> { Name = "owner" },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "ownerId" }),
                resolve : async context =>
                {
                    var owner = context.GetArgument<Owner>("owner");
                    var ownerId = context.GetArgument<Guid>("ownerId");

                    var dbOwner = await ownerRepository.GetById(ownerId);
                    if (dbOwner == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find owner in db."));
                        return null;
                    }

                    return await ownerRepository.UpdateOwner(dbOwner, owner);
                }
            );

            FieldAsync<StringGraphType>(
                "deleteOwner",
                arguments : new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "ownerId" }),
                resolve : async context =>
                {
                    var ownerId = context.GetArgument<Guid>("ownerId");
                    var owner = await ownerRepository.GetById(ownerId);
                    if (owner == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find owner in db."));
                        return null;
                    }

                    await ownerRepository.DeleteOwner(owner);
                    return $"The owner with the id: {ownerId} has been successfully deleted from db.";
                }
            );
        }
    }
}