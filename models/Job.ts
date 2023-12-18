import { JobStage } from "@/types/job";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import mongoose, { ObjectId } from "mongoose";
import { Account } from "./Account";
import { Customer } from "./Customer";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
})
export class Job extends TimeStamps {
  public _id!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public address!: string;

  @prop({ ref: () => Account })
  public assignee?: Ref<Account>;

  @prop({ default: JobStage.NEW_LEAD, required: true, enum: JobStage })
  public stage!: string;

  @prop()
  public source?: string;

  @prop()
  public jobValue?: number;

  @prop()
  public details?: string;

  @prop({ type: () => [Task] })
  public tasks?: Task[];

  @prop({ type: [String] })
  public attachments?: string[];

  @prop({ ref: () => Customer, type: () => String })
  public customer: Ref<Customer, string>;

  @prop({ type: () => [Note] })
  public notes?: Note[];
}

export class Task extends TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ ref: () => Account })
  public creator?: Ref<Account>;

  @prop({ default: false })
  done?: boolean;

  @prop()
  description?: string;

  @prop({ ref: () => Account })
  assignee?: Ref<Account>;

  @prop()
  dueDate?: Date;
}

export class Note extends TimeStamps {
  @prop({ required: true, ref: () => Account })
  public writer!: Ref<Account>;

  @prop({ required: true })
  public content!: string;
}

export const JobModel = mongoose.models.Job || getModelForClass(Job);
