import { Job, Task } from "@/models/Job";
import { ComposeAccountDTO } from "./compose-account.dto";

export interface ComposeJobDTO
  extends Omit<Job, "_id" | "creator" | "assignee" | "tasks" | "customer"> {
  _id: string;
  creator?: ComposeAccountDTO;
  assignee?: ComposeAccountDTO;
  customer?: {
    _id: string;
    fullname: string;
    email: string;
    ssn: string;
    phone: string;
  } | null;
  tasks?: TaskDTO[];
}

export interface TaskDTO extends Omit<Task, "_id" | "creator" | "assignee"> {
  _id: string;
  creator?: ComposeAccountDTO;
  assignee?: ComposeAccountDTO;
}
