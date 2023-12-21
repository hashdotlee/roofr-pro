import { Job } from "@/models/Job";
import { useEffect, useState } from "react";

export const useMetrics = (jobId: string) => {
  const [metrics, setMetrics] = useState<Job["metrics"]>({
    roofFootprintArea: 0,
    pitch: 0,
    roofAreaAdjustedForPitch: 0,
    currentlyOnRoof: 0,
    desiredMaterial: 0,
    projectTimeline: 0,
    residentialCommercial: 0,
    wantsFinancing: 0,
    customerNote: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = (await fetch(`/api/jobs/${jobId}/metrics`).then((res) =>
        res.json(),
      )) as any;

      setMetrics(res.data);
    };

    fetchMetrics();
  }, []);

  return { metrics };
};
