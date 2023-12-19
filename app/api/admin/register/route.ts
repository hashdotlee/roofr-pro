// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import { AccountModel } from "@/models/Account";
// import { Roles } from "@/types/account";
// import dbConnect from "@/lib/dbConnect";

// export async function GET() {
//   const email = "abc@app.com";
//   const password = "abcd1234";

//   const hashedPassword = bcrypt.hashSync(password, 12);

//   await dbConnect();
//   const user = await AccountModel.create({
//     email,
//     password: hashedPassword,
//     firstName: "Mr.",
//     lastName: "Jack",
//     role: Roles.CONTRACTOR,
//   });

//   return NextResponse.json({
//     success: true,
//     user,
//   });
// }
