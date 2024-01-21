import { JobModel } from "@/models/Job";
import { catchAsync } from "../../utils";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = catchAsync(
  async (_, { params }: { params: { id: string } }) => {
    await dbConnect();
    const job = await JobModel.findById(params.id)
      .populate({
        path: "creator",
        select: "_id firstName lastName email avatar role",
      })
      .populate({
        path: "assignee",
        select: "_id firstName lastName email avatar role",
      })
      .populate({
        path: "customer",
        select: "_id fullname email phone ssn",
      })
      .exec();
    return NextResponse.json({
      data: job,
      message: "Successfully fetched job",
    });
  },
);
