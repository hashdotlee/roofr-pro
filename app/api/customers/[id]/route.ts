import { CustomerModel } from "@/models/Customer";
import { NextRequest, NextResponse } from "next/server";
import { getParsedId } from "../../validate";
import { catchAsync } from "../../utils";
import dbConnect from "@/lib/dbConnect";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = getParsedId(params.id);

    await dbConnect();
    const customer = await CustomerModel.findById(id);

    return NextResponse.json({
        data: customer,
        message: "Successfully!",
    });
  }
);
