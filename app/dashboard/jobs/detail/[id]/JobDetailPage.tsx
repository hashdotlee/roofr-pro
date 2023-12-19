"use client";

import { cn, getTimeAgo } from "@/lib/utils";
import { Clipboard, Mail, Plus, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Attachment from "./(components)/tabs/Attachment";
import DeleteJobDialog from "./(components)/dialogs/DeleteJobDialog";
import InstantEstimate from "./(components)/tabs/InstantEstimate";
import JobDetail from "./(components)/tabs/JobDetail";
import Measurement from "./(components)/tabs/Measurement";
import NoteList from "./(components)/sidebar/NoteList";
import Proposal from "./(components)/tabs/Proposal";
import TasksList from "./(components)/tabs/TaskList";
import { DialogClose } from "@radix-ui/react-dialog";
import { AddCustomerModal } from "./(components)/dialogs/AddCustomerDialog";
import EditAddressDialog from "./(components)/dialogs/EditAddressDialog";
import useJob from "@/hooks/useJob";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { updateJob } from "@/actions/job";

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
    root: document?.getElementById("job_detail_root"),
    rootMargin: "-10% 0px -90% 0px",
  });

  return (
    <div id={id} ref={ref} className={className}>
      {children}
    </div>
  );
};

export default function JobDetailPage({
  hasCloseButton = false,
}: {
  hasCloseButton?: boolean;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { job, setJob } = useJob();

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

  const handleRemoveCustomer = async () => {
    await updateJob(String(job?._id), {
      customer: null,
    });
    setJob((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        customer: null,
      };
    });
    toast.success("Customer removed successfully");
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-semibold">{job?.address}</div>
            {job?.address && <EditAddressDialog />}
          </div>
          <div className="flex flex-row gap-2">
            <button className="p-2 bg-blue-700 rounded-full text-white flex justify-center items-center w-10 h-10">
              <Plus className="w-5 h-5" />
            </button>
            {hasCloseButton && (
              <DialogClose className="ml-auto">
                <button className="flex justify-center items-center w-10 h-10">
                  <X className="w-5 h-5" />
                </button>
              </DialogClose>
            )}
          </div>
        </div>
        <div className="flex gap-3 text-xs items-center mt-2">
          <span>New to stage</span>
          <span className="p-1 bg-gray-100 rounded-md flex gap-2 items-center">
            <Clipboard className="w-4 h-4 font-semibold" /> Tasks 0/1
          </span>
          <span>Updated {getTimeAgo(job?.updatedAt?.toString())}</span>
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
          <DeleteJobDialog />
        </div>
        <div className="flex flex-col gap-4 w-1/3 h-full overflow-hidden">
          {!job?.customer ? (
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="text-sm font-semibold">Customer Contact</div>
              <AddCustomerModal>
                <Button className="rounded-full bg-gray-100 text-current hover:bg-gray-200 flex items-center gap-2 text-xs px-4 py-2">
                  <UserPlus className="w-4 h-4" /> Add Customer
                </Button>
              </AddCustomerModal>
            </div>
          ) : (
            <div className="flex justify-between items-start p-4 border rounded-md">
              <div className="text-sm font-semibold">
                <div>{job?.customer?.fullname}</div>
                <div className="text-xs mt-2 flex items-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4" /> {job?.customer?.email}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AddCustomerModal>
                  <Button
                    variant={"outline"}
                    className="text-xs p-1 border-0 h-auto rounded-lg hover:text-blue-700 hover:bg-transparent"
                  >
                    Edit
                  </Button>
                </AddCustomerModal>
                <Button
                  variant={"outline"}
                  className="text-xs p-1 border-0 h-auto rounded-lg hover:text-blue-700 hover:bg-transparent"
                  onClick={() => {
                    handleRemoveCustomer();
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3 bg-gray-100 border p-4 overflow-hidden h-full rounded-md">
            <NoteList />
          </div>
        </div>
      </div>
    </>
  );
}
