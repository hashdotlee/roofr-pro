import dbConnect from "@/lib/dbConnect";
import { AccountModel } from "@/models/Account";
import { NextResponse } from "next/server";
import { catchAsync } from "../utils";
import { Roles } from "@/types/account";

export const GET = catchAsync(async (req) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const query = AccountModel.find({
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
  if (!page || !limit) {
    return NextResponse.json(await query.exec());
  }

  const accounts = await query
    .skip((parseInt(page) - 1) * parseInt(limit))
    .limit(parseInt(limit))
    .exec();

  return NextResponse.json(accounts);
});
