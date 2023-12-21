import { JobStage } from "@/types/job";
import type { Ref } from "@typegoose/typegoose";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import mongoose from "mongoose";
import { Account } from "./Account";
import { Customer } from "./Customer";

@modelOptions({
  schemaOptions: {
    collection: "jobs",
    timestamps: true,
    versionKey: false,
  },
  options: {
    allowMixed: 0,
  },
})
export class Job extends TimeStamps {
  public _id!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true, ref: () => Account })
  public creator!: Ref<Account>;

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

  @prop({ type: mongoose.Schema.Types.Mixed })
  public tasks?: Task[];

  @prop({ type: mongoose.Schema.Types.Mixed })
  public attachments?: string[];

  @prop({ ref: () => Customer })
  public customer: Ref<Customer>;

  @prop({ type: mongoose.Schema.Types.Mixed})
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
