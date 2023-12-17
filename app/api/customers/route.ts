import { CustomerModel, Customer } from "@/models/Customer";
import { NextResponse } from "next/server";
import { catchAsync } from "../utils";
import dbConnect from "@/lib/dbConnect";

export const GET = catchAsync(async () => {
  await dbConnect();
  const customers: Customer[] = await CustomerModel.find();
  return NextResponse.json(customers);
});
