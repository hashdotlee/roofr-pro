import { Job, Task } from "@/models/Job";
import { ComposeAccountDTO } from "./compose-account.dto";

export interface ComposeJobDTO extends Omit<Job, "_id" | "assignee" | "tasks"> {
  _id: string;
  assignee?: ComposeAccountDTO;
  tasks?: TaskDTO[];
}

export interface TaskDTO extends Omit<Task, "_id" | "creator" | "assignee"> {
  _id: string;
  creator?: ComposeAccountDTO;
  assignee?: ComposeAccountDTO;
}