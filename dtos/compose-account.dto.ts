import { Account } from "@/models/Account";

export interface ComposeAccountDTO extends Omit<Account, "_id" | "password"> {
  _id: string;
}
