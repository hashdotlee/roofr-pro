import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LuKanbanSquare } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import KanbanView from "./KanbanView";

export default function Jobs() {
  return (
    <div className="h-screen w-full py-4 px-8 overflow-x-hidden">
      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger
            value="kanban"
            className="w-64 flex flex-row gap-2 items-center"
          >
            <LuKanbanSquare className="w-6 h-6" />
            <span>Kanban</span>
          </TabsTrigger>
          <TabsTrigger
            value="listview"
            className="w-64 flex flex-row gap-2 items-center"
          >
            <FaListUl className="w-5 h-5" />
            <span>List View</span>
          </TabsTrigger>
        </TabsList>

        <Action />

        <TabsContent value="kanban">
          <KanbanView />
        </TabsContent>
        <TabsContent value="listview">Coming soon!</TabsContent>
      </Tabs>
    </div>
  );
}

function Action() {
  return (
    <div className="w-full mt-6 flex flex-row gap-3 items-center justify-between">
      <div className="flex flex-row gap-3 items-center justify-start">
        <div className="relative">
          <div className="absolute top-3 ps-4 text-gray-500 text-lg">
            <IoIosSearch />
          </div>
          <Input placeholder="Search jobs" className="ps-12" />
        </div>

        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button>
        <FaPlus className="w-4 h-4 pr-1" />
        <span className="text-sm">New Job</span>
      </Button>
    </div>
  );
}
