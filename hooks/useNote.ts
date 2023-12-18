import { useEffect, useState } from "react";

export const useNotes = (jobId: string) => {
  const [notes, setNotes] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const toggleRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch(`/api/jobs/${jobId}/notes`);
      const data = await res.json();
      setNotes(data);
    }
    fetchNotes();
  }, [refetch]);

  return {
    notes,
    toggleRefetch,
  };
};
