using backend.GraphQl.GraphQLQueries;
using GraphQL;
using GraphQL.Types;

namespace backend.GraphQl
{
    public class AppSchema : Schema
    {
        public AppSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<AppQuery>();
            Mutation = resolver.Resolve<AppMutation>();
        }
    }
}