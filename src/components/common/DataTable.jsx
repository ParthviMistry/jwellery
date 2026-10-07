import React from "react";
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function DataTable({
  columns = [],
  rows = [],
  onView,
  onEdit,
  onDelete,
  onActivate,
  activateLabel = "Activate",
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox aria-label="Select all rows" />
              </TableHead>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={column.headerClassName || ""}
                >
                  {column.name}
                </TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="py-10 text-center text-muted-foreground"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Checkbox aria-label={`Select row ${row.id}`} />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={`${row.id}-${column.id}`}
                      className={column.cellClassName || ""}
                    >
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {onActivate && !row.isActive && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onActivate(row)}
                          aria-label={`${activateLabel} ${row.id}`}
                          title={activateLabel}
                        >
                          <CalendarCheck className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {onView && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onView(row)}
                          aria-label="View row"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onEdit(row)}
                          aria-label="Edit row"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onDelete(row)}
                          aria-label="Delete row"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/20 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(page + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
