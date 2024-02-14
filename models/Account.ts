import { Roles } from "@/types/account";
import {
    buildSchema,
    getModelForClass,
    modelOptions,
    prop
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
  schemaOptions: { collection: "accounts", versionKey: false },
  options: {
    allowMixed: 0,
  },
})
export class Account {
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, select: false })
  public password!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

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

  @prop({ default: [], type: () => [String] })
  public sourcePreferences?: string[];
}

export const AccountModel = getModelForClass(Account);
