import mongoose from "mongoose";
import { prop } from "@typegoose/typegoose";

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
}
