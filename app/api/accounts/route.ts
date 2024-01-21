import dbConnect from "@/lib/dbConnect";
import { AccountModel } from "@/models/Account";
import { NextResponse } from "next/server";
import { catchAsync } from "../utils";
import { Roles } from "@/types/account";

export const GET = catchAsync(async (req) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  let query = AccountModel.find({
    role: Roles.CONTRACTOR,
  });
  const search = searchParams.get("search");
  if (search) {
    query.or([
      {
        firstName: new RegExp(search, "i"),
      },
      {
        lastName: new RegExp(search, "i"),
      },
    ]);
  }
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  if (page && limit) {
    query = query
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
  }

  const accounts = await query.exec();

  return NextResponse.json({
    data: accounts,
    message: "Get accounts successfully",
  });
});
