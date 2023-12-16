import { StatusCodes } from "http-status-codes";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const catchAsync = (fn: any) => (req: NextRequest) => {
  Promise.resolve(fn(req)).catch((error: ApiError) => {
    console.error(error);
    return NextResponse.json(
      { error: error.message || null },
      { status: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR }
    );
  });
};

export const handleZodCreddentials = (parsedCredentials: any) => {
  if (!parsedCredentials.success) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      parsedCredentials.error.toString()
    );
  }
  return parsedCredentials.data;
};
