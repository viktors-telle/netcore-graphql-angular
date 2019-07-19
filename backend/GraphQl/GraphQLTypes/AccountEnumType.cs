using backend.Entities;
using GraphQL.Types;

namespace backend.GraphQl.GraphQLTypes
{
    public class AccountEnumType : EnumerationGraphType<TypeOfAccount>
    {
        public AccountEnumType()
        {
            Name = "Type";
            Description = "Enumeration for the account type object.";
        }
    }
}