import { Customer } from "@/models/Customer";

export enum ComposeMode {
  Create = "create",
  Edit = "edit",
}

export interface ComposeCustomerDTO {
  _id: string;
  fullname: string;
  phone?: string;
  email?: string;
  createdOn: string;
}

export const toComposeCustomerDTO = (
  customer: Customer & { _id: string; createdAt: string }
): ComposeCustomerDTO => ({
  _id: customer._id,
  fullname: customer.fullname,
  phone: customer.phone,
  email: customer.email,
  createdOn: new Date(customer.createdAt).toLocaleDateString(),
});
