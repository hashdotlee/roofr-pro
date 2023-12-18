import dbConnect from "@/lib/dbConnect";
import { Customer, CustomerModel } from "@/models/Customer";
import { NextResponse } from "next/server";
import { catchAsync } from "../utils";

export const GET = catchAsync(async (req) => {
  await dbConnect();
  const searchParams = new URL(req.url);
  const search = searchParams.searchParams.get("search");
  const page = searchParams.searchParams.get("page");
  const limit = searchParams.searchParams.get("limit");
  const query = CustomerModel.find();
  if (!page || !limit) {
    return NextResponse.json(await query.exec());
  }
  query.skip((parseInt(page) - 1) * parseInt(limit)).limit(parseInt(limit));

  if (search) {
    query.where({ fullname: new RegExp(search, "i") });
  }

  const customers: Customer[] = await query.exec();
  return NextResponse.json(customers);
});
