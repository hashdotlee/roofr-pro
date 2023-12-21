import mongoose from "mongoose";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "customers",
    timestamps: true,
    versionKey: false,
  },
})
export class Customer {
  public _id!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public fullname!: string;

  @prop({ required: false, unique: true })
  public email?: string;

  @prop({ unique: true })
  public phone?: string;

  @prop({ select: false })
  public ssn?: number;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}

export const CustomerModel =
  mongoose.models.Customer || getModelForClass(Customer);
