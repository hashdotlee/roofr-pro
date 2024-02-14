import { catchAsync } from "@/app/api/utils";
import { TaskDTO } from "@/dtos/compose-job.dto";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { JobModel, Task } from "@/models/Job";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (
    req,
    {
      params,
    }: {
      params: { id: string };
    },
  ) => {
    await dbConnect();
    const jobId = params.id;
    const { title } = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json({
        code: 401,
        message: "Unauthorized",
        data: null,
      });
    }

    const job = await JobModel.findOneAndUpdate(
      { _id: jobId },
      {
        $push: {
          tasks: {
            creator: session.user.id,
            title: title,
          },
        },
      },
      { new: true },
    );

    return NextResponse.json({
      code: 200,
      message: "Successfully!",
      data: job?.tasks || [],
    });
  },
);

export const GET = catchAsync(
  async (
    req,
    {
      params,
    }: {
      params: { id: string };
    },
  ) => {
    await dbConnect();
    const jobId = params.id;
    const { searchParams } = new URL(req.url);
    const query = JobModel.findById(jobId)
      .populate([
        {
          path: "tasks.assignee",
        },
        {
          path: "tasks.creator",
        },
      ])
      .select("tasks");

    const done = searchParams.get("done");

    const job = await query.exec();

    let tasks = job?.tasks || [];

    if (done === "true") {
      tasks = tasks.filter((task: Task) => !task?.done);
    }

    return NextResponse.json({
      data: tasks,
      message: "Successfully fetched tasks",
    });
  },
);
