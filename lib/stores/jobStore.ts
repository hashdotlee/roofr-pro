import { Job } from "@/models/Job";
import { JobStage } from "@/types/job";
import { create } from "zustand";

const defaultJobs: Job[] = [];

interface JobState {
  jobs: Job[];
  moveJob: (jobId: string, stage: JobStage) => void;
  updateJobs: (jobs: Job[]) => void;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: defaultJobs,
  updateJobs: (jobs: Job[]) => set({ jobs }),
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
