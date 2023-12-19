import dbConnect from "@/lib/dbConnect";
import { catchAsync } from "../../utils";
import { JobModel } from "@/models/Job";
import { NextResponse } from "next/server";
import { TaskDTO } from "@/dtos/compose-job.dto";

const LIMIT = 5;

export const GET = catchAsync(async () => {
  await dbConnect();
  const query = JobModel.find({})
    .select("tasks")
    .populate("tasks.assignee")
    .populate("tasks.creator");
  let jobs = await query.sort({ "tasks.dueDate": 1 }).limit(LIMIT).exec();
  const tasks: TaskDTO[] = [];
  jobs.forEach((job) => {
    tasks.push(...job.tasks);
  });
  return NextResponse.json({
    code: 200,
    message: "Get tasks successfully",
    data: tasks,
  });
});
