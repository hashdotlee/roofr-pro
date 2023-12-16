import { NextRequest } from "next/server";
import { z } from "zod";
import { handleZodCreddentials } from "../utils";

export const getParsedId = (req: NextRequest) => {
  return handleZodCreddentials(
    z
      .string()
      .regex(/^[0-9]+$/)
      .safeParse(req.nextUrl.searchParams.get("id"))
  );
};

export const getParsedCustomer = (req: NextRequest) => {
  return handleZodCreddentials(
    z
      .object({
        fullname: z.string(),
        phone: z
          .string()
          .min(10)
          .max(10)
          .regex(/^[0-9]+$/)
          .optional(),
        email: z.string().email().optional(),
      })
      .safeParse(req.body)
  );
};
