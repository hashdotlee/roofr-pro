import { catchAsync } from "@/app/api/utils";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { JobModel } from "@/models/Job";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (
    req,
    {
      params,
    }: {
      params: { id: string };
    },
  ) => {
    await dbConnect();
    const jobId = params.id;
    const { content } = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json({
        code: 401,
        message: "Unauthorized",
        data: null,
      });
    }

    const note = await JobModel.findOneAndUpdate(
      { _id: jobId },
      {
        $push: {
          notes: {
            writer: session.user.id,
            content: content,
          },
        },
      },
      { new: true },
    );

    return NextResponse.json({
      code: 200,
      message: "Successfully!",
      data: note,
    });
  },
);

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
    const jobId = params.id;
    const job = await JobModel.findById(jobId)
      .populate("notes.writer")
      .select("notes");
    return NextResponse.json({
      message: "Successfully!",
      data: job.notes,
    });
  },
);
