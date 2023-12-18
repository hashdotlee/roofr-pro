import { catchAsync } from "@/app/api/utils";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { JobModel } from "@/models/Job";
import { NextResponse } from "next/server";

export const PUT = catchAsync(async (req, { params }) => {
  await dbConnect();
  const jobId = params.id;
  const taskId = params.taskId;

  const { done, title, description, dueDate, assignee } = await req.json();

  const session = await auth();

  if (!session) {
    return NextResponse.json({
      code: 401,
      message: "Unauthorized",
      data: null,
    });
  }

  console.log(session.user);

  const job = await JobModel.findOneAndUpdate(
    {
      _id: jobId,
      "tasks._id": taskId,
    },
    {
      $set: {
        "tasks.$.done": done,
        "tasks.$.title": title,
        "tasks.$.description": description,
        "tasks.$.dueDate": dueDate,
        "tasks.$.assignee": assignee,
      },
    },
  );

  return NextResponse.json({
    code: 200,
    message: "Successfully!",
  });
});

export const DELETE = catchAsync(async (req, { params }) => {
  await dbConnect();
  const jobId = params.id;
  const taskId = params.taskId;

  await JobModel.findOneAndUpdate(
    {
      _id: jobId,
      "tasks._id": taskId,
    },
    {
      $pull: {
        tasks: {
          _id: taskId,
        },
      },
    },
  );

  return NextResponse.json({
    code: 200,
    message: "Successfully!",
  });
});
