import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Hello, world! But nothing for you now" },
    { status: 404 }
  );
}
