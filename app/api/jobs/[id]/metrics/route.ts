import { catchAsync } from "@/app/api/utils";
import dbConnect from "@/lib/dbConnect";
import { JobModel } from "@/models/Job";
import { NextResponse } from "next/server";

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
    const id = params.id;
    const job = await JobModel.findById(id).select("metrics");

    return NextResponse.json({
      code: 200,
      message: "Get metrics successfully",
      data: job?.metrics,
    });
  },
);
