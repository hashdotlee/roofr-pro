import dbConnect from "@/lib/dbConnect";
import { JobModel } from "@/models/Job";
import { catchAsync } from "../utils";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const GET = catchAsync(async (req) => {
  await dbConnect();

  const session = await auth();

  if (!session) {
    return NextResponse.json({
      code: 401,
      message: "Unauthorized",
      data: null,
    });
  }

  const query = JobModel.find({});

  const { searchParams } = new URL(req.url);

  const updatedAt = searchParams.get("updatedAt");
  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy");
  const search = searchParams.get("search");

  if (search) {
    query.where({
      title: new RegExp(search, "i"),
    });
  }

  if (updatedAt) {
    query.where({
      updatedAt: new RegExp(updatedAt, "i"),
    });
  }

  if (status) {
    query.where({
      status: new RegExp(status, "i"),
    });
  }

  if (sortBy) {
    query.sort({
      [sortBy]: -1,
    });
  }

  const role = session.user.role;
  if (role === "admin") {
    const jobs = await query.exec();
    return NextResponse.json({
      code: 200,
      message: "Successfully!",
      data: jobs,
    });
  }

  const jobs = await query.where({ assignee: session.user.id }).exec();

  return NextResponse.json({
    code: 200,
    message: "Successfully!",
    data: jobs,
  });
});
