import dbConnect from "@/lib/dbConnect";
import { JobModel } from "@/models/Job";
import { catchAsync } from "../utils";
import { NextResponse } from "next/server";

export const GET = catchAsync(async () => {
    await dbConnect();
    const jobs = await JobModel.find({});
    return NextResponse.json(jobs);
});
