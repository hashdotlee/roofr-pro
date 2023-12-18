import { Job } from "@/models/Job";
import { JobStatus } from "@/types/job";
import { create } from "zustand";

const defaultJobs: Job[] = [];

interface JobState {
  jobs: Job[];
  moveJob: (jobId: string, status: JobStatus) => void;
  updateJobs: (jobs: Job[]) => void;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: defaultJobs,
  updateJobs: (jobs: Job[]) => set({ jobs }),
  moveJob: (jobId: string, status: JobStatus) => {
    const jobs = get().jobs;
    const newJobs = jobs.filter((job) => job._id.toString() !== jobId);
    const job = jobs.find((job) => job._id.toString() === jobId);
    if (job) {
      job.status = status;
      set({ jobs: [...newJobs, job] });
    }
  },
}));
