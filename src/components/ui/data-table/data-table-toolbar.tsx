import type { DataTableFacetedFilterOption } from "./data-table-faceted-filter";
import type { Table } from "@tanstack/react-table";

import { X } from "lucide-react";
import * as React from "react";

import { Button } from "#client/components/ui/button";
import { Input } from "#client/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export interface DataTableFacetedFilterConfig {
  columnId: string;
  title: string;
  options: DataTableFacetedFilterOption[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumnKey?: string;
  filterPlaceholder?: string;
  facetedFilters?: DataTableFacetedFilterConfig[];
}

export function DataTableToolbar<TData>({
  table,
  filterColumnKey,
  filterPlaceholder = "Filter...",
  facetedFilters = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const filterColumn = filterColumnKey ? table.getColumn(filterColumnKey) : undefined;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterColumn && (
          <Input
            placeholder={filterPlaceholder}
            value={(filterColumn.getFilterValue() as string) ?? ""}
            onChange={event => filterColumn.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {facetedFilters.map(
          filter =>
            table.getColumn(filter.columnId) && (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={table.getColumn(filter.columnId)}
                title={filter.title}
                options={filter.options}
              />
            )
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
