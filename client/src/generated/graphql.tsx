import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  identifyAdmin?: Maybe<Admin>;
  identifyCustomer?: Maybe<CustomerResponse>;
  identifyLocker?: Maybe<LockerResponse>;
  identifyService?: Maybe<ServiceResponse>;
  customerOrder: CustomerOrderResponse;
  activeOrder?: Maybe<Array<Order>>;
  topUpList?: Maybe<PaginatedTopUp>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryIdentifyLockerArgs = {
  lockerId: Scalars['Int'];
};


export type QueryIdentifyServiceArgs = {
  serviceId: Scalars['Int'];
};


export type QueryTopUpListArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  pictUrl: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  roleId: Scalars['Float'];
};

export type CustomerResponse = {
  __typename?: 'CustomerResponse';
  errors?: Maybe<Array<CustomerError>>;
  customer?: Maybe<Customer>;
  profile?: Maybe<CustomerProfile>;
};

export type CustomerError = {
  __typename?: 'CustomerError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['Float'];
  custId: Scalars['String'];
  username: Scalars['String'];
};

export type CustomerProfile = {
  __typename?: 'CustomerProfile';
  id: Scalars['Float'];
  custId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  dob: Scalars['DateTime'];
  phone: Scalars['String'];
  gender: Scalars['String'];
  age: Scalars['Float'];
  occupation: Scalars['String'];
  address: Scalars['String'];
  balance: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type LockerResponse = {
  __typename?: 'LockerResponse';
  errors?: Maybe<Array<LockerError>>;
  locker?: Maybe<Locker>;
};

export type LockerError = {
  __typename?: 'LockerError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Locker = {
  __typename?: 'Locker';
  id: Scalars['Float'];
  lockerId: Scalars['Float'];
  lockerIp: Scalars['String'];
  address: Scalars['String'];
  lockStatus: Scalars['Float'];
  fillStatus: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ServiceResponse = {
  __typename?: 'ServiceResponse';
  errors?: Maybe<Array<ServiceError>>;
  service?: Maybe<ServiceTypes>;
};

export type ServiceError = {
  __typename?: 'ServiceError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ServiceTypes = {
  __typename?: 'ServiceTypes';
  id: Scalars['Float'];
  serviceId: Scalars['Float'];
  type: Scalars['String'];
  duration: Scalars['Float'];
  price: Scalars['Float'];
  createdAt: Scalars['String'];
};

export type CustomerOrderResponse = {
  __typename?: 'CustomerOrderResponse';
  errors?: Maybe<Array<OrderError>>;
  ogOrder?: Maybe<Array<Order>>;
  histOrder?: Maybe<Array<Order>>;
};

export type OrderError = {
  __typename?: 'OrderError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Float'];
  orderId: Scalars['String'];
  custId: Scalars['String'];
  serviceId: Scalars['Float'];
  adminId?: Maybe<Scalars['String']>;
  lockerId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  endOrder: Scalars['DateTime'];
  status: Scalars['String'];
  pictUrl: Scalars['String'];
  amount: Scalars['Float'];
  totalPrice: Scalars['Float'];
  customer?: Maybe<Customer>;
};

export type PaginatedTopUp = {
  __typename?: 'PaginatedTopUp';
  topUpList: Array<TopupBalance>;
  hasMore: Scalars['Boolean'];
};

export type TopupBalance = {
  __typename?: 'TopupBalance';
  id: Scalars['Float'];
  custId: Scalars['String'];
  customer?: Maybe<CustomerProfile>;
  pictUrl: Scalars['String'];
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addProfilePicture: S3Object;
  registerAdmin: AdminResponse;
  loginAdmin: AdminResponse;
  updateCustomerBalance?: Maybe<CustomerProfile>;
  registerCustomer: CustomerResponse;
  loginCustomer: CustomerResponse;
  deleteCustomer: Scalars['Boolean'];
  registerLocker: LockerResponse;
  registerService: ServiceResponse;
  registerOrder: OrderResponse;
  setOrderStatus?: Maybe<Order>;
  requestTopUp?: Maybe<TopupBalance>;
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  pictUrl: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationAddProfilePictureArgs = {
  user: Scalars['String'];
  picture: Scalars['Upload'];
};


export type MutationRegisterAdminArgs = {
  options: AdminRegisterInput;
};


export type MutationLoginAdminArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdateCustomerBalanceArgs = {
  nominal: Scalars['Float'];
  custId: Scalars['String'];
};


export type MutationRegisterCustomerArgs = {
  options: CustomerRegisterInput;
};


export type MutationLoginCustomerArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationDeleteCustomerArgs = {
  custId: Scalars['String'];
};


export type MutationRegisterLockerArgs = {
  options: LockerRegisterInput;
};


export type MutationRegisterServiceArgs = {
  options: ServiceRegisterInput;
};


export type MutationRegisterOrderArgs = {
  options: OrderRegisterInput;
};


export type MutationSetOrderStatusArgs = {
  options: SetOrderStatusInput;
};


export type MutationRequestTopUpArgs = {
  pictUrl: Scalars['String'];
  amount: Scalars['Int'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  pictUrl: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type S3Object = {
  __typename?: 'S3Object';
  ETag: Scalars['String'];
  Location: Scalars['String'];
  Key: Scalars['String'];
  Bucket: Scalars['String'];
};


export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<AdminError>>;
  admin?: Maybe<Admin>;
};

export type AdminError = {
  __typename?: 'AdminError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AdminRegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  roleId: RoleTypeId;
};

export enum RoleTypeId {
  SkYmen = 'SkYMEN',
  Ss = 'SS',
  Ap = 'AP',
  Fleet = 'FLEET'
}

export type CustomerRegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dob: Scalars['DateTime'];
  phone: Scalars['String'];
  gender: Scalars['String'];
  age: Scalars['Float'];
  occupation: Scalars['String'];
  address: Scalars['String'];
};

export type LockerRegisterInput = {
  lockerId: Scalars['Int'];
  lockerIp: Scalars['String'];
  address: Scalars['String'];
};

export type ServiceRegisterInput = {
  serviceId: ServiceType;
  type: Scalars['String'];
  duration: Scalars['Int'];
  price: Scalars['Int'];
};

export enum ServiceType {
  Normal = 'NORMAL',
  Express = 'EXPRESS',
  Kilat = 'KILAT'
}

export type OrderResponse = {
  __typename?: 'OrderResponse';
  errors?: Maybe<Array<OrderError>>;
  orderRes?: Maybe<Order>;
};

export type OrderRegisterInput = {
  custId: Scalars['String'];
  serviceId: ServiceType;
  lockerId: Scalars['Int'];
  pictUrl: Scalars['String'];
  amount: Scalars['Int'];
};

export type SetOrderStatusInput = {
  orderId: Scalars['String'];
  status: OrderStatus;
};

export enum OrderStatus {
  Submitted = 'SUBMITTED',
  Confirmed = 'CONFIRMED',
  Process = 'PROCESS',
  Delivered = 'DELIVERED'
}

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'pictUrl' | 'textSnippet' | 'points' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type AddProfilePictureMutationVariables = Exact<{
  picture: Scalars['Upload'];
  user: Scalars['String'];
}>;


export type AddProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & { addProfilePicture: (
    { __typename?: 'S3Object' }
    & Pick<S3Object, 'ETag' | 'Location' | 'Key' | 'Bucket'>
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text'>
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
  pictUrl: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LoginAdminMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginAdminMutation = (
  { __typename?: 'Mutation' }
  & { loginAdmin: (
    { __typename?: 'AdminResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'AdminError' }
      & Pick<AdminError, 'field' | 'message'>
    )>>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'id' | 'username' | 'email' | 'createdAt' | 'roleId'>
    )> }
  ) }
);

export type LoginCustomerMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginCustomerMutation = (
  { __typename?: 'Mutation' }
  & { loginCustomer: (
    { __typename?: 'CustomerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'CustomerError' }
      & Pick<CustomerError, 'field' | 'message'>
    )>>, customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'username' | 'custId'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RegisterCustomerMutationVariables = Exact<{
  options: CustomerRegisterInput;
}>;


export type RegisterCustomerMutation = (
  { __typename?: 'Mutation' }
  & { registerCustomer: (
    { __typename?: 'CustomerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'CustomerError' }
      & Pick<CustomerError, 'field' | 'message'>
    )>>, customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'custId' | 'username'>
    )>, profile?: Maybe<(
      { __typename?: 'CustomerProfile' }
      & Pick<CustomerProfile, 'custId' | 'firstName' | 'lastName' | 'email' | 'dob' | 'phone' | 'gender' | 'age' | 'occupation' | 'address'>
    )> }
  ) }
);

export type RegisterOrderMutationVariables = Exact<{
  options: OrderRegisterInput;
}>;


export type RegisterOrderMutation = (
  { __typename?: 'Mutation' }
  & { registerOrder: (
    { __typename?: 'OrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'OrderError' }
      & Pick<OrderError, 'field' | 'message'>
    )>>, orderRes?: Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'id' | 'orderId' | 'serviceId' | 'lockerId' | 'createdAt' | 'endOrder' | 'status' | 'pictUrl' | 'custId' | 'amount' | 'totalPrice' | 'adminId'>
    )> }
  ) }
);

export type RequestTopUpMutationVariables = Exact<{
  pictUrl: Scalars['String'];
  amount: Scalars['Int'];
}>;


export type RequestTopUpMutation = (
  { __typename?: 'Mutation' }
  & { requestTopUp?: Maybe<(
    { __typename?: 'TopupBalance' }
    & Pick<TopupBalance, 'custId' | 'pictUrl' | 'amount'>
    & { customer?: Maybe<(
      { __typename?: 'CustomerProfile' }
      & Pick<CustomerProfile, 'firstName' | 'lastName'>
    )> }
  )> }
);

export type SetOrderStatusMutationVariables = Exact<{
  options: SetOrderStatusInput;
}>;


export type SetOrderStatusMutation = (
  { __typename?: 'Mutation' }
  & { setOrderStatus?: Maybe<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'orderId' | 'custId' | 'serviceId' | 'adminId' | 'lockerId' | 'createdAt' | 'updatedAt' | 'endOrder' | 'status' | 'pictUrl' | 'amount' | 'totalPrice'>
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'custId' | 'username'>
    )> }
  )> }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'textSnippet'>
  )> }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type ActiveOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveOrderQuery = (
  { __typename?: 'Query' }
  & { activeOrder?: Maybe<Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'orderId' | 'custId' | 'serviceId' | 'adminId' | 'lockerId' | 'createdAt' | 'updatedAt' | 'endOrder' | 'status' | 'pictUrl' | 'amount' | 'totalPrice'>
    & { customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'custId' | 'username'>
    )> }
  )>> }
);

export type IdentifyAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type IdentifyAdminQuery = (
  { __typename?: 'Query' }
  & { identifyAdmin?: Maybe<(
    { __typename?: 'Admin' }
    & Pick<Admin, 'id' | 'username' | 'email' | 'createdAt' | 'roleId'>
  )> }
);

export type CustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerQuery = (
  { __typename?: 'Query' }
  & { identifyCustomer?: Maybe<(
    { __typename?: 'CustomerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'CustomerError' }
      & Pick<CustomerError, 'field' | 'message'>
    )>>, customer?: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'username' | 'custId'>
    )>, profile?: Maybe<(
      { __typename?: 'CustomerProfile' }
      & Pick<CustomerProfile, 'balance'>
    )> }
  )> }
);

export type CustomerOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerOrderQuery = (
  { __typename?: 'Query' }
  & { customerOrder: (
    { __typename?: 'CustomerOrderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'OrderError' }
      & Pick<OrderError, 'field' | 'message'>
    )>>, ogOrder?: Maybe<Array<(
      { __typename?: 'Order' }
      & Pick<Order, 'id' | 'orderId' | 'serviceId' | 'lockerId' | 'createdAt' | 'endOrder' | 'status' | 'pictUrl' | 'amount' | 'totalPrice'>
    )>>, histOrder?: Maybe<Array<(
      { __typename?: 'Order' }
      & Pick<Order, 'id' | 'orderId' | 'serviceId' | 'lockerId' | 'createdAt' | 'endOrder' | 'status' | 'pictUrl' | 'amount' | 'totalPrice'>
    )>> }
  ) }
);

export type IdentifyLockerQueryVariables = Exact<{
  lockerId: Scalars['Int'];
}>;


export type IdentifyLockerQuery = (
  { __typename?: 'Query' }
  & { identifyLocker?: Maybe<(
    { __typename?: 'LockerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'LockerError' }
      & Pick<LockerError, 'field' | 'message'>
    )>>, locker?: Maybe<(
      { __typename?: 'Locker' }
      & Pick<Locker, 'id' | 'lockerId' | 'address' | 'lockStatus' | 'fillStatus'>
    )> }
  )> }
);

export type IdentifyServiceQueryVariables = Exact<{
  serviceId: Scalars['Int'];
}>;


export type IdentifyServiceQuery = (
  { __typename?: 'Query' }
  & { identifyService?: Maybe<(
    { __typename?: 'ServiceResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ServiceError' }
      & Pick<ServiceError, 'field' | 'message'>
    )>>, service?: Maybe<(
      { __typename?: 'ServiceTypes' }
      & Pick<ServiceTypes, 'type' | 'duration' | 'price'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'points' | 'text' | 'pictUrl' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type TopUpListQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type TopUpListQuery = (
  { __typename?: 'Query' }
  & { topUpList?: Maybe<(
    { __typename?: 'PaginatedTopUp' }
    & Pick<PaginatedTopUp, 'hasMore'>
    & { topUpList: Array<(
      { __typename?: 'TopupBalance' }
      & Pick<TopupBalance, 'custId' | 'pictUrl' | 'amount' | 'status' | 'createdAt'>
      & { customer?: Maybe<(
        { __typename?: 'CustomerProfile' }
        & Pick<CustomerProfile, 'lastName' | 'firstName'>
      )> }
    )> }
  )> }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  pictUrl
  textSnippet
  points
  voteStatus
  creator {
    id
    username
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($picture: Upload!, $user: String!) {
  addProfilePicture(picture: $picture, user: $user) {
    ETag
    Location
    Key
    Bucket
  }
}
    `;
export type AddProfilePictureMutationFn = Apollo.MutationFunction<AddProfilePictureMutation, AddProfilePictureMutationVariables>;

/**
 * __useAddProfilePictureMutation__
 *
 * To run a mutation, you first call `useAddProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfilePictureMutation, { data, loading, error }] = useAddProfilePictureMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useAddProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>) {
        return Apollo.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument, baseOptions);
      }
export type AddProfilePictureMutationHookResult = ReturnType<typeof useAddProfilePictureMutation>;
export type AddProfilePictureMutationResult = Apollo.MutationResult<AddProfilePictureMutation>;
export type AddProfilePictureMutationOptions = Apollo.BaseMutationOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    createdAt
    updatedAt
    title
    text
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!, $pictUrl: String!) {
  deletePost(id: $id, pictUrl: $pictUrl)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      pictUrl: // value for 'pictUrl'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LoginAdminDocument = gql`
    mutation LoginAdmin($usernameOrEmail: String!, $password: String!) {
  loginAdmin(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    admin {
      id
      username
      email
      createdAt
      roleId
    }
  }
}
    `;
export type LoginAdminMutationFn = Apollo.MutationFunction<LoginAdminMutation, LoginAdminMutationVariables>;

/**
 * __useLoginAdminMutation__
 *
 * To run a mutation, you first call `useLoginAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginAdminMutation, { data, loading, error }] = useLoginAdminMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginAdminMutation(baseOptions?: Apollo.MutationHookOptions<LoginAdminMutation, LoginAdminMutationVariables>) {
        return Apollo.useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LoginAdminDocument, baseOptions);
      }
export type LoginAdminMutationHookResult = ReturnType<typeof useLoginAdminMutation>;
export type LoginAdminMutationResult = Apollo.MutationResult<LoginAdminMutation>;
export type LoginAdminMutationOptions = Apollo.BaseMutationOptions<LoginAdminMutation, LoginAdminMutationVariables>;
export const LoginCustomerDocument = gql`
    mutation LoginCustomer($usernameOrEmail: String!, $password: String!) {
  loginCustomer(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    customer {
      id
      username
      custId
    }
  }
}
    `;
export type LoginCustomerMutationFn = Apollo.MutationFunction<LoginCustomerMutation, LoginCustomerMutationVariables>;

/**
 * __useLoginCustomerMutation__
 *
 * To run a mutation, you first call `useLoginCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginCustomerMutation, { data, loading, error }] = useLoginCustomerMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginCustomerMutation(baseOptions?: Apollo.MutationHookOptions<LoginCustomerMutation, LoginCustomerMutationVariables>) {
        return Apollo.useMutation<LoginCustomerMutation, LoginCustomerMutationVariables>(LoginCustomerDocument, baseOptions);
      }
export type LoginCustomerMutationHookResult = ReturnType<typeof useLoginCustomerMutation>;
export type LoginCustomerMutationResult = Apollo.MutationResult<LoginCustomerMutation>;
export type LoginCustomerMutationOptions = Apollo.BaseMutationOptions<LoginCustomerMutation, LoginCustomerMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RegisterCustomerDocument = gql`
    mutation RegisterCustomer($options: CustomerRegisterInput!) {
  registerCustomer(options: $options) {
    errors {
      field
      message
    }
    customer {
      id
      custId
      username
    }
    profile {
      custId
      firstName
      lastName
      email
      dob
      phone
      gender
      age
      occupation
      address
    }
  }
}
    `;
export type RegisterCustomerMutationFn = Apollo.MutationFunction<RegisterCustomerMutation, RegisterCustomerMutationVariables>;

/**
 * __useRegisterCustomerMutation__
 *
 * To run a mutation, you first call `useRegisterCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCustomerMutation, { data, loading, error }] = useRegisterCustomerMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterCustomerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>) {
        return Apollo.useMutation<RegisterCustomerMutation, RegisterCustomerMutationVariables>(RegisterCustomerDocument, baseOptions);
      }
export type RegisterCustomerMutationHookResult = ReturnType<typeof useRegisterCustomerMutation>;
export type RegisterCustomerMutationResult = Apollo.MutationResult<RegisterCustomerMutation>;
export type RegisterCustomerMutationOptions = Apollo.BaseMutationOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>;
export const RegisterOrderDocument = gql`
    mutation registerOrder($options: OrderRegisterInput!) {
  registerOrder(options: $options) {
    errors {
      field
      message
    }
    orderRes {
      id
      orderId
      serviceId
      lockerId
      createdAt
      endOrder
      status
      pictUrl
      custId
      amount
      totalPrice
      adminId
    }
  }
}
    `;
export type RegisterOrderMutationFn = Apollo.MutationFunction<RegisterOrderMutation, RegisterOrderMutationVariables>;

/**
 * __useRegisterOrderMutation__
 *
 * To run a mutation, you first call `useRegisterOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerOrderMutation, { data, loading, error }] = useRegisterOrderMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterOrderMutation(baseOptions?: Apollo.MutationHookOptions<RegisterOrderMutation, RegisterOrderMutationVariables>) {
        return Apollo.useMutation<RegisterOrderMutation, RegisterOrderMutationVariables>(RegisterOrderDocument, baseOptions);
      }
export type RegisterOrderMutationHookResult = ReturnType<typeof useRegisterOrderMutation>;
export type RegisterOrderMutationResult = Apollo.MutationResult<RegisterOrderMutation>;
export type RegisterOrderMutationOptions = Apollo.BaseMutationOptions<RegisterOrderMutation, RegisterOrderMutationVariables>;
export const RequestTopUpDocument = gql`
    mutation RequestTopUp($pictUrl: String!, $amount: Int!) {
  requestTopUp(pictUrl: $pictUrl, amount: $amount) {
    custId
    pictUrl
    amount
    customer {
      firstName
      lastName
    }
  }
}
    `;
export type RequestTopUpMutationFn = Apollo.MutationFunction<RequestTopUpMutation, RequestTopUpMutationVariables>;

/**
 * __useRequestTopUpMutation__
 *
 * To run a mutation, you first call `useRequestTopUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestTopUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestTopUpMutation, { data, loading, error }] = useRequestTopUpMutation({
 *   variables: {
 *      pictUrl: // value for 'pictUrl'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useRequestTopUpMutation(baseOptions?: Apollo.MutationHookOptions<RequestTopUpMutation, RequestTopUpMutationVariables>) {
        return Apollo.useMutation<RequestTopUpMutation, RequestTopUpMutationVariables>(RequestTopUpDocument, baseOptions);
      }
export type RequestTopUpMutationHookResult = ReturnType<typeof useRequestTopUpMutation>;
export type RequestTopUpMutationResult = Apollo.MutationResult<RequestTopUpMutation>;
export type RequestTopUpMutationOptions = Apollo.BaseMutationOptions<RequestTopUpMutation, RequestTopUpMutationVariables>;
export const SetOrderStatusDocument = gql`
    mutation SetOrderStatus($options: SetOrderStatusInput!) {
  setOrderStatus(options: $options) {
    id
    orderId
    custId
    serviceId
    adminId
    lockerId
    createdAt
    updatedAt
    endOrder
    status
    pictUrl
    amount
    totalPrice
    customer {
      id
      custId
      username
    }
  }
}
    `;
export type SetOrderStatusMutationFn = Apollo.MutationFunction<SetOrderStatusMutation, SetOrderStatusMutationVariables>;

/**
 * __useSetOrderStatusMutation__
 *
 * To run a mutation, you first call `useSetOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setOrderStatusMutation, { data, loading, error }] = useSetOrderStatusMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSetOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetOrderStatusMutation, SetOrderStatusMutationVariables>) {
        return Apollo.useMutation<SetOrderStatusMutation, SetOrderStatusMutationVariables>(SetOrderStatusDocument, baseOptions);
      }
export type SetOrderStatusMutationHookResult = ReturnType<typeof useSetOrderStatusMutation>;
export type SetOrderStatusMutationResult = Apollo.MutationResult<SetOrderStatusMutation>;
export type SetOrderStatusMutationOptions = Apollo.BaseMutationOptions<SetOrderStatusMutation, SetOrderStatusMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $title: String!, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    id
    title
    text
    textSnippet
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const ActiveOrderDocument = gql`
    query ActiveOrder {
  activeOrder {
    id
    orderId
    custId
    serviceId
    adminId
    lockerId
    createdAt
    updatedAt
    endOrder
    status
    pictUrl
    amount
    totalPrice
    customer {
      id
      custId
      username
    }
  }
}
    `;

/**
 * __useActiveOrderQuery__
 *
 * To run a query within a React component, call `useActiveOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveOrderQuery(baseOptions?: Apollo.QueryHookOptions<ActiveOrderQuery, ActiveOrderQueryVariables>) {
        return Apollo.useQuery<ActiveOrderQuery, ActiveOrderQueryVariables>(ActiveOrderDocument, baseOptions);
      }
export function useActiveOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveOrderQuery, ActiveOrderQueryVariables>) {
          return Apollo.useLazyQuery<ActiveOrderQuery, ActiveOrderQueryVariables>(ActiveOrderDocument, baseOptions);
        }
export type ActiveOrderQueryHookResult = ReturnType<typeof useActiveOrderQuery>;
export type ActiveOrderLazyQueryHookResult = ReturnType<typeof useActiveOrderLazyQuery>;
export type ActiveOrderQueryResult = Apollo.QueryResult<ActiveOrderQuery, ActiveOrderQueryVariables>;
export const IdentifyAdminDocument = gql`
    query IdentifyAdmin {
  identifyAdmin {
    id
    username
    email
    createdAt
    roleId
  }
}
    `;

/**
 * __useIdentifyAdminQuery__
 *
 * To run a query within a React component, call `useIdentifyAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdentifyAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdentifyAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useIdentifyAdminQuery(baseOptions?: Apollo.QueryHookOptions<IdentifyAdminQuery, IdentifyAdminQueryVariables>) {
        return Apollo.useQuery<IdentifyAdminQuery, IdentifyAdminQueryVariables>(IdentifyAdminDocument, baseOptions);
      }
export function useIdentifyAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IdentifyAdminQuery, IdentifyAdminQueryVariables>) {
          return Apollo.useLazyQuery<IdentifyAdminQuery, IdentifyAdminQueryVariables>(IdentifyAdminDocument, baseOptions);
        }
export type IdentifyAdminQueryHookResult = ReturnType<typeof useIdentifyAdminQuery>;
export type IdentifyAdminLazyQueryHookResult = ReturnType<typeof useIdentifyAdminLazyQuery>;
export type IdentifyAdminQueryResult = Apollo.QueryResult<IdentifyAdminQuery, IdentifyAdminQueryVariables>;
export const CustomerDocument = gql`
    query Customer {
  identifyCustomer {
    errors {
      field
      message
    }
    customer {
      id
      username
      custId
    }
    profile {
      balance
    }
  }
}
    `;

/**
 * __useCustomerQuery__
 *
 * To run a query within a React component, call `useCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomerQuery(baseOptions?: Apollo.QueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
        return Apollo.useQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
      }
export function useCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerQuery, CustomerQueryVariables>) {
          return Apollo.useLazyQuery<CustomerQuery, CustomerQueryVariables>(CustomerDocument, baseOptions);
        }
export type CustomerQueryHookResult = ReturnType<typeof useCustomerQuery>;
export type CustomerLazyQueryHookResult = ReturnType<typeof useCustomerLazyQuery>;
export type CustomerQueryResult = Apollo.QueryResult<CustomerQuery, CustomerQueryVariables>;
export const CustomerOrderDocument = gql`
    query CustomerOrder {
  customerOrder {
    errors {
      field
      message
    }
    ogOrder {
      id
      orderId
      serviceId
      lockerId
      createdAt
      endOrder
      status
      pictUrl
      amount
      totalPrice
    }
    histOrder {
      id
      orderId
      serviceId
      lockerId
      createdAt
      endOrder
      status
      pictUrl
      amount
      totalPrice
    }
  }
}
    `;

/**
 * __useCustomerOrderQuery__
 *
 * To run a query within a React component, call `useCustomerOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomerOrderQuery(baseOptions?: Apollo.QueryHookOptions<CustomerOrderQuery, CustomerOrderQueryVariables>) {
        return Apollo.useQuery<CustomerOrderQuery, CustomerOrderQueryVariables>(CustomerOrderDocument, baseOptions);
      }
export function useCustomerOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerOrderQuery, CustomerOrderQueryVariables>) {
          return Apollo.useLazyQuery<CustomerOrderQuery, CustomerOrderQueryVariables>(CustomerOrderDocument, baseOptions);
        }
export type CustomerOrderQueryHookResult = ReturnType<typeof useCustomerOrderQuery>;
export type CustomerOrderLazyQueryHookResult = ReturnType<typeof useCustomerOrderLazyQuery>;
export type CustomerOrderQueryResult = Apollo.QueryResult<CustomerOrderQuery, CustomerOrderQueryVariables>;
export const IdentifyLockerDocument = gql`
    query IdentifyLocker($lockerId: Int!) {
  identifyLocker(lockerId: $lockerId) {
    errors {
      field
      message
    }
    locker {
      id
      lockerId
      address
      lockStatus
      fillStatus
    }
  }
}
    `;

/**
 * __useIdentifyLockerQuery__
 *
 * To run a query within a React component, call `useIdentifyLockerQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdentifyLockerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdentifyLockerQuery({
 *   variables: {
 *      lockerId: // value for 'lockerId'
 *   },
 * });
 */
export function useIdentifyLockerQuery(baseOptions: Apollo.QueryHookOptions<IdentifyLockerQuery, IdentifyLockerQueryVariables>) {
        return Apollo.useQuery<IdentifyLockerQuery, IdentifyLockerQueryVariables>(IdentifyLockerDocument, baseOptions);
      }
export function useIdentifyLockerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IdentifyLockerQuery, IdentifyLockerQueryVariables>) {
          return Apollo.useLazyQuery<IdentifyLockerQuery, IdentifyLockerQueryVariables>(IdentifyLockerDocument, baseOptions);
        }
export type IdentifyLockerQueryHookResult = ReturnType<typeof useIdentifyLockerQuery>;
export type IdentifyLockerLazyQueryHookResult = ReturnType<typeof useIdentifyLockerLazyQuery>;
export type IdentifyLockerQueryResult = Apollo.QueryResult<IdentifyLockerQuery, IdentifyLockerQueryVariables>;
export const IdentifyServiceDocument = gql`
    query identifyService($serviceId: Int!) {
  identifyService(serviceId: $serviceId) {
    errors {
      field
      message
    }
    service {
      type
      duration
      price
    }
  }
}
    `;

/**
 * __useIdentifyServiceQuery__
 *
 * To run a query within a React component, call `useIdentifyServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdentifyServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdentifyServiceQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useIdentifyServiceQuery(baseOptions: Apollo.QueryHookOptions<IdentifyServiceQuery, IdentifyServiceQueryVariables>) {
        return Apollo.useQuery<IdentifyServiceQuery, IdentifyServiceQueryVariables>(IdentifyServiceDocument, baseOptions);
      }
export function useIdentifyServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IdentifyServiceQuery, IdentifyServiceQueryVariables>) {
          return Apollo.useLazyQuery<IdentifyServiceQuery, IdentifyServiceQueryVariables>(IdentifyServiceDocument, baseOptions);
        }
export type IdentifyServiceQueryHookResult = ReturnType<typeof useIdentifyServiceQuery>;
export type IdentifyServiceLazyQueryHookResult = ReturnType<typeof useIdentifyServiceLazyQuery>;
export type IdentifyServiceQueryResult = Apollo.QueryResult<IdentifyServiceQuery, IdentifyServiceQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    points
    text
    pictUrl
    voteStatus
    creator {
      id
      username
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const TopUpListDocument = gql`
    query TopUpList($cursor: String, $limit: Int!) {
  topUpList(cursor: $cursor, limit: $limit) {
    topUpList {
      custId
      pictUrl
      amount
      status
      createdAt
      customer {
        lastName
        firstName
      }
    }
    hasMore
  }
}
    `;

/**
 * __useTopUpListQuery__
 *
 * To run a query within a React component, call `useTopUpListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopUpListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopUpListQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTopUpListQuery(baseOptions: Apollo.QueryHookOptions<TopUpListQuery, TopUpListQueryVariables>) {
        return Apollo.useQuery<TopUpListQuery, TopUpListQueryVariables>(TopUpListDocument, baseOptions);
      }
export function useTopUpListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopUpListQuery, TopUpListQueryVariables>) {
          return Apollo.useLazyQuery<TopUpListQuery, TopUpListQueryVariables>(TopUpListDocument, baseOptions);
        }
export type TopUpListQueryHookResult = ReturnType<typeof useTopUpListQuery>;
export type TopUpListLazyQueryHookResult = ReturnType<typeof useTopUpListLazyQuery>;
export type TopUpListQueryResult = Apollo.QueryResult<TopUpListQuery, TopUpListQueryVariables>;