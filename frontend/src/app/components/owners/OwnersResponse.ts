import { OwnerType } from 'src/types';
import { GraphQLError } from 'graphql';

export interface OwnersResponse {
    owners: OwnerType[];
    loading: boolean;
    errors?: ReadonlyArray<GraphQLError>;
}
