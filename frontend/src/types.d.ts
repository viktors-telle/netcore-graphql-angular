export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar type represents a year, month and day in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  Date: any;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects
   * timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  DateTime: any;
  /** The `DateTimeOffset` scalar type represents a date, time and offset from UTC.
   * `DateTimeOffset` expects timestamps to be formatted in accordance with the
   * [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
   */
  DateTimeOffset: any;
  Decimal: any;
  /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
  Milliseconds: any;
  /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
  Seconds: any;
};

export type AccountType = {
  __typename?: "AccountType";
  /** Account description. */
  description: Scalars["String"];
  /** Id property from the account object. */
  id?: Maybe<Scalars["ID"]>;
  /** Account type. */
  type?: Maybe<Type>;
};

export type AppMutation = {
  __typename?: "AppMutation";
  createOwner?: Maybe<OwnerType>;
  deleteOwner?: Maybe<Scalars["String"]>;
  updateOwner?: Maybe<OwnerType>;
};

export type AppMutationCreateOwnerArgs = {
  owner: OwnerInput;
};

export type AppMutationDeleteOwnerArgs = {
  ownerId: Scalars["ID"];
};

export type AppMutationUpdateOwnerArgs = {
  owner: OwnerInput;
  ownerId: Scalars["ID"];
};

export type AppQuery = {
  __typename?: "AppQuery";
  accounts?: Maybe<Array<Maybe<AccountType>>>;
  owner?: Maybe<OwnerType>;
  owners?: Maybe<Array<Maybe<OwnerType>>>;
};

export type AppQueryOwnerArgs = {
  ownerId: Scalars["ID"];
};

export type OwnerInput = {
  name: Scalars["String"];
  address: Scalars["String"];
};

export type OwnerType = {
  __typename?: "OwnerType";
  /** List of owner accounts. */
  accounts?: Maybe<Array<Maybe<AccountType>>>;
  /** Address property from the owner object. */
  address: Scalars["String"];
  /** Id property from the owner object. */
  id?: Maybe<Scalars["ID"]>;
  /** Name property from the owner object. */
  name: Scalars["String"];
};

/** Enumeration for the account type object. */
export enum Type {
  Cash = "CASH",
  Savings = "SAVINGS",
  Expense = "EXPENSE",
  Income = "INCOME"
}
