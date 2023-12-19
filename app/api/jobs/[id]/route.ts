import { JobModel } from "@/models/Job";
import { catchAsync } from "../../utils";
import { NextResponse } from "next/server";

export const GET = catchAsync(
  async (_, { params }: { params: { id: string } }) => {
    const job = await JobModel.findById(params.id)
      .populate({
        path: "creator",
        select: "_id firstName lastName email avatar role",
      })
      .populate({
        path: "assignee",
        select: "_id firstName lastName email avatar role",
      })
      .exec();
    return NextResponse.json(job);
  }
);
