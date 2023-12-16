import { CustomerModel } from "@/models/Customer";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { getParsedCustomer, getParsedId } from "../validate";
import { catchAsync } from "../../utils";
import dbConnect from "@/lib/dbConnect";

export const GET = catchAsync(async (req: NextRequest) => {
  const id = getParsedId(req);

  await dbConnect();
  const customer = await CustomerModel.findById(id);

  return NextResponse.json(customer);
});

export const PATCH = catchAsync(async (req: NextRequest) => {
  const id = getParsedId(req);
  const customerDTO = getParsedCustomer(req);

  await dbConnect();
  const customer = await CustomerModel.findByIdAndUpdate(id, customerDTO);

  return NextResponse.json(customer);
});

export const DELETE = catchAsync(async (req: NextRequest) => {
  const id = getParsedId(req);

  await dbConnect();
  await CustomerModel.findByIdAndDelete(id);
  return NextResponse.json({}, { status: StatusCodes.NO_CONTENT });
});
