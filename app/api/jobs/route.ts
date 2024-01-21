import dbConnect from "@/lib/dbConnect";
import { JobModel } from "@/models/Job";
import { catchAsync } from "../utils";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Roles } from "@/types/account";

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
  const stage = searchParams.get("stage");
  const sortBy = searchParams.get("sortBy");
  const search = searchParams.get("search");
  const assignee = searchParams.get("assignee");

  if (search) {
    query.where({
      address: new RegExp(search, "i"),
    });
  }

  if (updatedAt) {
    query.where({
      updatedAt: {
        $gte: new Date(updatedAt),
      },
    });
  }

  if (stage) {
    const stages = stage.split(",");
    query.where({
      stage: {
        $in: stages,
      },
    });
  }

  if (sortBy) {
    query.sort({
      [sortBy]: -1,
    });
  }

  if (assignee) {
    query.where({
      assignee,
    });
  }

  const role = session.user.role;
  if (role === Roles.ADMIN) {
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
