import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CircleDot,
  Dot,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";

export default function Customers() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="flex items-center border px-4 focus-visible:ring-transparent rounded-md bg-white">
          <Search className="w-4 h-4" />
          <Input placeholder="Search customer" className="border-0" />
        </Label>
        <Button className="gap-2">
          <PlusCircle /> Add Customer
        </Button>
      </div>
      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Create On</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="cursor-pointer">
              <TableCell>John Doe</TableCell>
              <TableCell>08123456789</TableCell>
              <TableCell>
                <a href="mailto:hashdotlee@gmail.com">hashdotlee</a>
              </TableCell>
              <TableCell>2021-09-01</TableCell>
              <TableCell>
                <MoreHorizontal className="w-4 h-4" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}