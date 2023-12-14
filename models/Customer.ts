import mongoose from "mongoose";
import { prop } from "@typegoose/typegoose";

export class Customter {
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public fullname!: string;

  @prop()
  public email?: string;

  @prop()
  public phone?: string;

  @prop()
  public address?: string;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}
