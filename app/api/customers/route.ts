import { CustomerModel } from "@/models/Customer";
import { NextRequest, NextResponse } from "next/server";
import { catchAsync } from "../utils";
import { getParsedCustomer } from "./validate";
import dbConnect from "@/lib/dbConnect";

export const GET = catchAsync(async () => {
  await dbConnect();
  const customers = await CustomerModel.find();
  return NextResponse.json(customers);
});

export const POST = catchAsync(async (req: NextRequest) => {
  const customerPayload = getParsedCustomer(req);

  await dbConnect();
  const customer = await CustomerModel.create(customerPayload);
  return NextResponse.json(customer);
});
