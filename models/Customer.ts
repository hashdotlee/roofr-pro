import {
    buildSchema,
    getModelForClass,
    modelOptions,
    prop
} from "@typegoose/typegoose";
import mongoose from "mongoose";

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

  @prop()
  public ssn?: string;

  @prop({ default: Date.now() })
  public createdAt?: Date;
}

export const CustomerModel = getModelForClass(Customer);
