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
  mongoose.models.Customer || getModelForClass(Customer);
