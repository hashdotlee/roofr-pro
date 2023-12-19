"use server";

import { ComposeAccountDTO } from "@/dtos/compose-account.dto";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import dbConnect from "@/lib/dbConnect";
import { Job, JobModel } from "@/models/Job";

export interface ServerResponse {
  code: number;
  message: string;
  data: any;
}

export const createJob = async ({
  address,
  creatorId,
}: {
  address: ComposeJobDTO["address"];
  creatorId: ComposeAccountDTO["_id"];
}) => {
  try {
    await dbConnect();
    const job = await JobModel.create({
      address,
      creator: creatorId,
      assignee: creatorId,
    });
    return {
      code: 200,
      message: "Job created successfully",
      data: job,
    } satisfies ServerResponse;
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      message: "Internal server error",
      data: error,
    } satisfies ServerResponse;
  }
};

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
    console.log(error);
    return {
      code: 500,
      message: "Internal server error",
      data: error,
    } satisfies ServerResponse;
  }
};

export const updateJob = async (
  jobId: string,
  job: Partial<Omit<Job, "customer">> & { customer: string | null },
) => {
  try {
    console.log(job);
    await dbConnect();
    const updatedJob = await JobModel.updateOne({ _id: jobId }, job);
    return {
      code: 200,
      message: "Job updated successfully",
      data: updatedJob,
    } satisfies ServerResponse;
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      message: "Internal server error",
      data: error,
    } satisfies ServerResponse;
  }
};
