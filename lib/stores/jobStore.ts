import { Job } from "@/app/dashboard/jobs/_components/JobItem";
import { JobStatus } from "@/types/job";
import { create } from "zustand";

const defaultJobs: Job[] = [
  {
    id: 1,
    name: "Job 1",
    status: JobStatus.NEW_LEAD,
  },
  {
    id: 2,
    name: "Job 2",
    status: JobStatus.NEW_LEAD,
  },
  {
    id: 3,
    name: "Job 3",
    status: JobStatus.NEW_LEAD,
  },
  {
    id: 4,
    name: "Job 4",
    status: JobStatus.NEW_LEAD,
  },
  {
    id: 5,
    name: "Job 5",
    status: JobStatus.NEW_LEAD,
  },
];

interface JobState {
  jobs: Job[];
  moveJob: (jobId: number, status: JobStatus) => void;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: defaultJobs,
  moveJob: (jobId: number, status: JobStatus) => {
    const jobs = get().jobs;
    const newJobs = jobs.filter((job) => job.id !== jobId);
    const job = jobs.find((job) => job.id === jobId);
    if (job) {
      job.status = status;
      console.log(jobs);
      set({ jobs: [...newJobs, job] });
    }
  },
}));
