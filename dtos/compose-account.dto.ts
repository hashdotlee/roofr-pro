import { Account } from "@/models/Account";

export interface ComposeAccountDTO
  extends Omit<Partial<Account>, "_id" | "password"> {
  _id: string;
}
