import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import { JobStage } from "@/types/job";
import { create } from "zustand";

const defaultJobs: ComposeJobDTO[] = [];

interface JobState {
  jobs: ComposeJobDTO[];
  findJob: (jobId: string) => ComposeJobDTO | undefined;
  setJobs: (jobs: ComposeJobDTO[]) => void;
  modifyJob: (
    jobId: string,
    jobPayload: Partial<Omit<ComposeJobDTO, "_id">>
  ) => void;
  moveJob: (jobId: string, stage: JobStage) => void;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: defaultJobs,
  findJob: (jobId: string) =>
    get().jobs.find((job) => job._id.toString() === jobId),
  setJobs: (jobs: ComposeJobDTO[]) => set({ jobs }),
  modifyJob: (
    jobId: string,
    jobPayload: Partial<Omit<ComposeJobDTO, "_id">>
  ) => {
    const jobs = get().jobs;
    const oldJob = jobs.find((job) => job._id.toString() === jobId);
    if (oldJob) {
      const newJob = { ...oldJob, ...jobPayload };
      const newJobs = jobs.filter((job) => job._id.toString() !== jobId);
      set({ jobs: [...newJobs, newJob] });
    }
  },
  moveJob: (jobId: string, stage: JobStage) => {
    const jobs = get().jobs;
    const newJobs = jobs.filter((job) => job._id.toString() !== jobId);
    const job = jobs.find((job) => job._id.toString() === jobId);
    if (job) {
      job.stage = stage;
      set({ jobs: [...newJobs, job] });
    }
  },
}));
