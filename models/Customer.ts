import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

export class Customer {
  public _id!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public fullname!: string;

  @prop()
  public email?: string;

  @prop()
  public phone?: string;

  @prop({ select: false })
  public ssn?: string;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}

export const CustomerModel =
  mongoose.models.Customer ||
  getModelForClass(Customer, { schemaOptions: { versionKey: false } });
