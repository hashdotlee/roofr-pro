"use server";

import { ComposeCustomerDTO } from "@/dtos/compose-customer.dto";
import { ActionHandler } from "@/lib/actionHandler";
import { CustomerModel } from "@/models/Customer";

interface ICustomerPayload {
  customer: Partial<ComposeCustomerDTO>;
}

export const createCustomer = ActionHandler<ICustomerPayload>(async (input) => {
  const { fullname, email, phone, ssn } = input.customer;
  const customer = await CustomerModel.create({
    fullname,
    email,
    phone,
    ssn,
  });
  return {
    ok: true,
    message: "Successfully!",
    data: customer,
  };
});

export const updateCustomer = ActionHandler<{
  id: string;
  customerPayload: Partial<ComposeCustomerDTO>;
}>(async (input) => {
  const { id, customerPayload } = input;
  const customer = await CustomerModel.findByIdAndUpdate(id, customerPayload);
  return {
    ok: true,
    message: "Update Successfully!",
    data: customer,
  };
});

export const deleteCustomer = ActionHandler<{ id: string }>(async (input) => {
  const { id } = input;
  await CustomerModel.findByIdAndDelete(id);
  return {
    ok: true,
    message: "Delete Successfully!",
  };
});
