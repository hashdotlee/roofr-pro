import { JobStatus } from "@/types/job";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import mongoose from "mongoose";

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

  @prop()
  public assignee?: any;

  @prop({ default: JobStatus.NEW_LEAD, required: true, enum: JobStatus })
  public status!: string;

  @prop()
  public stage?: string;

  @prop()
  public source?: string;

  @prop()
  public jobValue?: number;

  @prop()
  public details?: string;

  @prop({ type: () => [Task] })
  public tasks?: Task[];

  @prop()
  public attachments?: string[];

  @prop()
  public customerId: mongoose.Schema.Types.ObjectId;

  @prop({ type: () => [Note] })
  public notes?: Note[];
}

class Task {
  @prop({ required: true })
  public title!: string;

  @prop()
  public creator?: any;

  @prop({ default: false })
  done?: boolean;

  @prop()
  description?: string;

  @prop()
  assignee?: mongoose.Schema.Types.ObjectId;

  @prop()
  dueDate?: Date;
}

class Note {
  @prop({ required: true })
  public writer!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public content!: string;
}

export const JobModel = mongoose.models.Job || getModelForClass(Job);
