import { NextRequest } from "next/server";
import { z } from "zod";
import { handleZodCredentials } from "./utils";
import { Types } from "mongoose";

export const getParsedId = (id: string) => {
  return handleZodCredentials(
    z
      .string()
      .refine((val) => Types.ObjectId.isValid(val))
      .safeParse(id)
  );
};

export const getParsedCustomer = (req: NextRequest) => {
  return handleZodCredentials(
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
