"use server";

import dbConnect from "@/lib/dbConnect";
import { CustomerModel } from "@/models/Customer";

interface ICustomerPayload {
  fullname: string;
  email?: string;
  phone?: string;
  ssn?: string;
}

type TCustomerResponse = {
  ok: boolean;
  message: string;
  data?: any;
};

export const createCustomer = async (customerPayload: ICustomerPayload) => {
  try {
    await dbConnect();
    const customer = await CustomerModel.create(customerPayload);
    return {
      ok: true,
      message: "Successfully!",
      data: customer,
    } satisfies TCustomerResponse;
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: "Something went wrong!",
    } satisfies TCustomerResponse;
  }
};

export const updateCustomer = async (
  id: string,
  customerPayload: ICustomerPayload,
) => {
  try {
    await dbConnect();
    const customer = await CustomerModel.findByIdAndUpdate(id, customerPayload);
    return {
      ok: true,
      message: "Update Successfully!",
      data: customer,
    } satisfies TCustomerResponse;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Something went wrong!",
    } satisfies TCustomerResponse;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    await dbConnect();
    await CustomerModel.findByIdAndDelete(id);
    return {
      ok: true,
      message: "Delete Successfully!",
    } satisfies TCustomerResponse;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Something went wrong!",
    } satisfies TCustomerResponse;
  }
};
