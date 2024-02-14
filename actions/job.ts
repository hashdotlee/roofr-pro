"use server";

import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import { ActionHandler } from "@/lib/actionHandler";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { JobModel } from "@/models/Job";

export interface ServerResponse {
  ok?: boolean;
  code: number;
  message: string;
  data: any;
}

export const createJob = ActionHandler<{ address: string; customer?: string }>(
  async ({ address, customer }) => {
    const session = await auth();
    if (!session) {
      return {
        ok: false,
        message: "Unauthorized",
        data: null,
      };
    }
    const job = await JobModel.create({
      address,
      creator: session.user.id,
      assignee: session.user.id,
      customer,
    });
    return {
      ok: true,
      message: "Job created successfully",
      data: job,
    };
  },
);

export const deleteJob = async (jobId: string) => {
  try {
    await dbConnect();
    const job = await JobModel.findByIdAndDelete(jobId);
    return {
      code: 200,
      message: "Job deleted successfully",
      data: job,
    } satisfies ServerResponse;
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      message: "Internal server error",
      data: error,
    } satisfies ServerResponse;
  }
};

export const updateJob = ActionHandler<{
  jobId: string;
  job: Partial<ComposeJobDTO>;
}>(async ({ jobId, job }) => {
  const updatedJob = await JobModel.updateOne({ _id: jobId }, job);
  return {
    ok: true,
    message: "Job updated successfully",
    data: updatedJob,
  };
});
