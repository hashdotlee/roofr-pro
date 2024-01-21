"use server";

import { TaskDTO } from "@/dtos/compose-job.dto";
import { ActionHandler } from "@/lib/actionHandler";
import { auth } from "@/lib/auth";
import { JobModel } from "@/models/Job";

type CreateTaskInput = {
  jobId: string;
  title: string;
};

type UpdateTaskInput = {
  jobId: string;
  taskId: string;
  task: Partial<TaskDTO>;
};

type DeleteTaskInput = {
  jobId: string;
  taskId: string;
};

export const createTask = ActionHandler<CreateTaskInput>(async (input) => {
  const { jobId, title } = input;
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }
  const job = await JobModel.findById(jobId);
  if (!job) {
    return {
      ok: false,
      message: "Job not found!",
    };
  }
  const newTask = {
    title,
    creator: session.user.id,
  };

  job.tasks.push(newTask);

  await job.save();
  return {
    ok: true,
    message: "Create task successfully!",
    data: newTask,
  };
});

export const updateTask = ActionHandler<UpdateTaskInput>(async (input) => {
  const { jobId, taskId, task } = input;
  const { done, title, description, dueDate, assignee } = task;

  await JobModel.findOneAndUpdate(
    { _id: jobId, "tasks._id": taskId },
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

  return {
    ok: true,
    message: "Successfully!",
  };
});

export const DeleteTask = ActionHandler<DeleteTaskInput>(async (input) => {
  const { jobId, taskId } = input;
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  await JobModel.findByIdAndUpdate(
    jobId,
    {
      $pull: {
        tasks: { _id: taskId },
      },
    },
    { new: true },
  );

  return {
    ok: true,
    message: "Delete task successfully!",
  };
});
