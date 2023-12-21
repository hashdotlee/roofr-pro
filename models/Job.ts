import { JobStage } from "@/types/job";
import type { Ref } from "@typegoose/typegoose";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import mongoose from "mongoose";
import { Account } from "./Account";
import { Customer } from "./Customer";

export class Metric {
  @prop({ required: true, default: 0 })
  public roofFootprintArea!: number;

  @prop({ required: true, default: 0 })
  public pitch!: number;

  @prop({ required: true, default: 0 })
  public roofAreaAdjustedForPitch!: number;

  @prop({ required: true, default: 0 })
  public currentlyOnRoof!: number;

  @prop({ required: true, default: 0 })
  public desiredMaterial!: number;

  @prop({ required: true, default: 0 })
  public projectTimeline!: number;

  @prop({ required: true, default: 0 })
  public residentialCommercial!: number;

  @prop({ required: true, default: 0 })
  public wantsFinancing!: number;

  @prop({ required: true, default: 0 })
  public customerNote!: number;
}

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

  @prop({ type: () => [Task] })
  public tasks?: Task[];

  @prop({ type: () => [String] })
  public attachments?: string[];

  @prop({ ref: () => Customer })
  public customer: Ref<Customer>;

  @prop({ type: () => [Note] })
  public notes?: Note[];

  @prop({ type: () => Metric })
  public metrics?: Metric;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
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


@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Note extends TimeStamps {
  @prop({ required: true })
  public writer!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public content!: string;
}

export const JobModel = mongoose.models.Job || getModelForClass(Job);
