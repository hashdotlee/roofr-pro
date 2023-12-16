import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Roles } from "@/types/account";

export class Account {
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  @prop()
  public address?: string;

  @prop()
  public avatar?: string;

  @prop({
    type: () => String,
    required: true,
    enum: Roles,
    default: () => Roles.CONTRACTOR,
  })
  public role!: Roles;
}

export const AccountModel =
  mongoose.models.Account || getModelForClass(Account);
