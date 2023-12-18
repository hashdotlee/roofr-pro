import { JobModel } from "@/models/Job";
import { catchAsync } from "../../utils";
import { NextResponse } from "next/server";

export const GET = catchAsync(
  async (req, { params }: { params: { id: string } }) => {
    const job = await JobModel.findById(params.id);
    return NextResponse.json(job);
  },
);
