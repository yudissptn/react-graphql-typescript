import { InputType, Field, registerEnumType } from "type-graphql";

export enum RoleTypeId {
  SKYMEN,
  SS,
  AP,
  FLEET,
}

registerEnumType(RoleTypeId, {
  name: "RoleTypeId",
});

@InputType()
export class AdminRegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
  @Field((_type) => RoleTypeId)
  roleId: RoleTypeId;
}

@InputType()
export class AdminRoleInput {
  @Field((_type) => RoleTypeId)
  roleId: RoleTypeId;
  @Field()
  roleType: string;
}
