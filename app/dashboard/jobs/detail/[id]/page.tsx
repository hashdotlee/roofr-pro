"use client";

import { Clipboard, PenIcon, Plus, Trash, UserPlus } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import NoteList from "./NoteList";
import JobDetail from "./JobDetail";
import TasksList from "./TaskList";
import Measurement from "./Measurements";
import Proposal from "./Proposal";
import Attachment from "./Attachment";
import InstantEstimate from "./InstantEstimate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const InView = ({
  children,
  id,
  onChange,
  className,
}: {
  children: React.ReactNode;
  id: string;
  onChange: (inView: boolean, entry: IntersectionObserverEntry) => void;
  className?: string;
}) => {
  const { ref } = useInView({
    onChange: onChange,
    root: document.getElementById("job_detail_root"),
    rootMargin: "-10% 0px -90% 0px",
  });

  return (
    <div id={id} ref={ref} className={className}>
      {children}
    </div>
  );
};

export default function JobDetailPage() {
  const tabs = [
    {
      id: "job_details",
      name: "Job details",
      content: <JobDetail />,
    },
    {
      id: "tasks",
      name: "Tasks",
      content: <TasksList />,
    },
    {
      name: "Measurements",
      id: "measurements",
      content: <Measurement />,
    },
    {
      name: "Proposals",
      id: "proposals",
      content: <Proposal />,
    },
    {
      name: "Attachments",
      id: "attachments",
      content: <Attachment />,
    },
    {
      name: "Instances Estimates",
      id: "instances_estimates",
      content: <InstantEstimate />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabChange = (id: string) => {
    setActiveTab(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold">
              Fenchurch Street, London, England{" "}
            </div>
            <button>
              <PenIcon className="w-5 h-5 text-blue-400" />
            </button>
          </div>
          <button className="p-2 bg-blue-700 rounded-full text-white flex justify-center items-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-3 text-xs items-center">
          <span>5 days ago</span>
          <span className="p-1 bg-gray-100 rounded-md flex gap-2 items-center">
            <Clipboard className="w-4 h-4" /> Tasks 0/1
          </span>
          <span>Updated 5 days ago</span>
        </div>
        <div className="border-b mt-4 text-sm flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(`flex py-2 flex-col items-center gap-1`, {
                "border-b-2 border-blue-700": activeTab === tab.id,
                "border-b-2 border-transparent": activeTab !== tab.id,
              })}
              onClick={() => {
                handleTabChange(tab.id);
              }}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden items-stretch gap-4 h-full">
        <div className="overflow-y-auto h-full w-2/3" id="job_detail_root">
          {tabs.map((tab) => (
            <InView
              key={tab.id}
              id={tab.id}
              onChange={(inView) => {
                if (inView) {
                  setActiveTab(tab.id);
                }
              }}
              className="mb-4 p-4 bg-gray-100 rounded-md"
            >
              {tab.content}
            </InView>
          ))}
          <Button
            variant={"ghost"}
            className="flex gap-2 text-red-500 items-center"
          >
            <Trash className="w-4 h-4" /> Delete Job
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <div className="flex justify-between items-center p-4 border rounded-md">
            <div className="text-sm font-semibold">Customer Contact</div>
            <button className="rounded-full bg-gray-100 flex items-center gap-2 text-xs px-4 py-2">
              {" "}
              <UserPlus className="w-4 h-4" /> Add Customer
            </button>
          </div>
          <div className="bg-gray-100 h-full p-4 rounded-md">
            <NoteList />
          </div>
        </div>
      </div>
    </>
  );
}
