import dbConnect from "@/lib/dbConnect";
import { catchAsync } from "../../utils";
import { JobModel } from "@/models/Job";
import { NextResponse } from "next/server";
import { TaskDTO } from "@/dtos/compose-job.dto";

const LIMIT = 5;

export const GET = catchAsync(async () => {
  await dbConnect();
  const query = JobModel.find({})
    .select("tasks address _id")
    .populate("tasks.assignee")
    .populate({ path: "tasks.creator", model: "Account" });
  let jobs = await query
    .where({ "tasks.done": false })
    .sort({ "tasks.dueDate": -1 })
    .limit(LIMIT)
    .exec();
  const urgentTasks: TaskDTO[] = [];
  jobs.forEach((job) => {
    const { tasks, ...info } = job.toJSON();
    const taskWithJob = tasks.map((item: any) => {
      return {
        ...item,
        job: info,
      };
    });
    urgentTasks.push(...taskWithJob);
  });
  return NextResponse.json({
    code: 200,
    message: "Get tasks successfully",
    data: urgentTasks.sort((a, b) => {
      if (!a?.dueDate) return 1;
      if (!b?.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    }),
  });
});
