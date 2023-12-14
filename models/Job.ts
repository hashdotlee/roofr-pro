import { prop } from "@typegoose/typegoose";

import mongoose from "mongoose";

export class Job {
  public _id!: mongoose.Types.ObjectId;

  @prop()
  public jobDetails?: JobDetails;

  @prop()
  public tasks?: Task[];

  @prop()
  public attachments?: string[];

  @prop()
  public notes?: string[];
}

class JobDetails {
  @prop()
  public assignee?: any;

  @prop()
  public stage?: string;

  @prop()
  public source?: string;

  @prop()
  public jobValue?: number;

  @prop()
  public details?: string;
}

class Task {
  @prop({ required: true })
  public title!: string;

  @prop()
  public creator?: any;
}

class Note {
  @prop({ required: true })
  public writer!: any;

  @prop({ required: true })
  public content!: string;
}
