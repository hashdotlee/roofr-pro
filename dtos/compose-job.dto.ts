import { Job, Task } from "@/models/Job";
import { ComposeAccountDTO } from "./compose-account.dto";
import { ComposeCustomerDTO } from "./compose-customer.dto";

export interface ComposeJobDTO
  extends Omit<Job, "_id" | "creator" | "assignee" | "tasks" | "customer"> {
  _id: string;
  creator?: ComposeAccountDTO;
  assignee?: ComposeAccountDTO;
  tasks?: TaskDTO[];
  customer?: ComposeCustomerDTO;
}

export interface TaskDTO extends Omit<Task, "_id" | "creator" | "assignee"> {
  _id: string;
  creator?: ComposeAccountDTO;
  assignee?: ComposeAccountDTO;
}
