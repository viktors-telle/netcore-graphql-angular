import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APP_BASE_HREF } from '@angular/common';

export function createApollo(httpLink: HttpLink, baseHref: string) {
  return {
    link: httpLink.create({ uri: `${baseHref}graphql` }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, APP_BASE_HREF],
    },
  ],
})
export class GraphQLModule { }
