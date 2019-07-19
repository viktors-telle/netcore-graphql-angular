using backend.Entities;
using GraphQL.Types;

namespace backend.GraphQl.GraphQLTypes
{
    public class AccountType : ObjectGraphType<Account>
    {
        public AccountType()
        {
            Field(a => a.Id, type : typeof(IdGraphType)).Description("Id property from the account object.");
            Field(a => a.Type, type : typeof(AccountEnumType)).Description("Account type.");
            Field(a => a.Description).Description("Account description.");
        }
    }
}