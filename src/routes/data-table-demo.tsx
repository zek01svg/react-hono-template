import type { DataTableFacetedFilterConfig } from "#client/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Circle,
  CircleHelp,
  MoreHorizontal,
  Timer,
  XCircle,
} from "lucide-react";

import { Badge } from "#client/components/ui/badge";
import { Button } from "#client/components/ui/button";
import { Checkbox } from "#client/components/ui/checkbox";
import { DataTable, DataTableColumnHeader } from "#client/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#client/components/ui/dropdown-menu";

export type Task = {
  id: string;
  title: string;
  status: "backlog" | "todo" | "in progress" | "done" | "canceled";
  label: "bug" | "feature" | "documentation";
  priority: "low" | "medium" | "high";
};

const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleHelp,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];

const tasks: Task[] = [
  {
    id: "TASK-8782",
    title: "You can't parse the program without connecting the analog BT-500!",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "backlog",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source pixel!",
    status: "backlog",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-8686",
    title: "I'll parse the wireless Microchip matrix, that should matrix the HTTP application!",
    status: "canceled",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-1280",
    title: "Use the digital RAM system, then you can parse the neural panel!",
    status: "done",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-7262",
    title: "The Application program is down, navigate the optical SSL array!",
    status: "done",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-1138",
    title: "Connecting the microchip won't do anything, we need to generate the mobile JSON!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-4821",
    title: "Reconfiguring the driver won't calculate the SSD bus, compress the pixel!",
    status: "todo",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-3391",
    title: "Synthesizing the array won't do anything, we need to index the open-source PNG card!",
    status: "backlog",
    label: "documentation",
    priority: "low",
  },
];

const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
    cell: ({ row }) => (
      <div className="w-[80px] font-mono text-xs">{row.getValue<string>("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const label = row.original.label;

      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className="capitalize">
            {label}
          </Badge>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue<string>("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const statusValue = row.getValue<string>("status");
      const status = statuses.find(s => s.value === statusValue);

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
          <span className="capitalize">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value: unknown) => {
      return Array.isArray(value) && value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priorityValue = row.getValue<string>("priority");
      const priority = priorities.find(p => p.value === priorityValue);

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          <priority.icon className="text-muted-foreground mr-2 h-4 w-4" />
          <span className="capitalize">{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value: unknown) => {
      return Array.isArray(value) && value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(task.id);
              }}
            >
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const facetedFilters: DataTableFacetedFilterConfig[] = [
  {
    columnId: "status",
    title: "Status",
    options: statuses,
  },
  {
    columnId: "priority",
    title: "Priority",
    options: priorities,
  },
];

export const Route = createFileRoute("/data-table-demo")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-4 p-4 sm:p-8">
      <div className="border-border/50 bg-background/50 relative mx-auto flex h-full min-h-full w-full max-w-7xl flex-col gap-4 rounded-lg border p-4 backdrop-blur-[2px] sm:gap-8 sm:p-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Data Table Demo</h1>
          <p className="text-muted-foreground text-sm">
            A task management data table built with Shadcn UI and TanStack Table v9.
          </p>
        </div>
        <DataTable
          columns={columns}
          data={tasks}
          filterColumnKey="title"
          filterPlaceholder="Filter tasks..."
          facetedFilters={facetedFilters}
        />
      </div>
    </main>
  );
}
