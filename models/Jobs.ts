import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stage: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    source: {
      type: String,
      enum: ["internal", "external"],
      default: "internal",
    },
    jobValue: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
      },
    ],
    customerContact: {
      type: Schema.Types.ObjectId,
      ref: "CustomerContact",
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Job", jobSchema);
