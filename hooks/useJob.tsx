import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import { useParams } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const JobContext = createContext<{
  job: ComposeJobDTO | null;
  setJob: Dispatch<SetStateAction<ComposeJobDTO | null>>;
}>({
  job: null,
  setJob: () => {},
});

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [job, setJob] = useState<ComposeJobDTO | null>(null);
  const jobId = useParams().id as string;
  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`/api/jobs/${jobId}`);
      const data = await res.json();
      setJob(data);
    }
    fetchJob();
  }, [jobId]);

  return (
    <JobContext.Provider value={{ job, setJob }}>
      {children}
    </JobContext.Provider>
  );
};

export default function useJob() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  const { job, setJob } = context;
  return { job, setJob };
}
