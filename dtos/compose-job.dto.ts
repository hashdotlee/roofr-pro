import { Job, Task } from "@/models/Job";
import { ComposeAccountDTO } from "./compose-account.dto";
import { ComposeCustomerDTO } from "./compose-customer.dto";
import { JobStage } from "@/types/job";

export interface ComposeJobDTO
  extends Omit<
    Job,
    "stage" | "_id" | "creator" | "assignee" | "tasks" | "customer" | "createdAt" | "updatedAt"
  > {
  _id: string;
  creator?: ComposeAccountDTO;
  assignee?: ComposeAccountDTO;
  tasks?: TaskDTO[];
  stage?: JobStage;
  customer?: ComposeCustomerDTO;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskDTO extends Omit<Task, "_id" | "creator" | "assignee"> {
  _id?: string;
  creator?: ComposeAccountDTO;
  assignee?: ComposeAccountDTO;
}
