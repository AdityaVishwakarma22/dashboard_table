"use client";
import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { updateRow, deleteRow } from "@/store/tableSlice";
import { Button } from "@mui/material";

export default function DataTable() {
  const columnData = useSelector((state: RootState) => state.table.columns);
  const rows = useSelector((state: RootState) => state.table.rows);
  const dispatch = useDispatch();

  const handleRowUpdate = (newRow: any) => {
    dispatch(updateRow(newRow));
    return newRow;
  };

  const gridColumns: GridColDef[] = [
    ...columnData
      .filter((col) => col.visible)
      .map((col) => ({
        field: col.id,
        headerName: col.label,
        flex: 1,
        editable: true,
      })),
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="error"
          onClick={() => dispatch(deleteRow(params.row.id))}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        processRowUpdate={handleRowUpdate}
        pageSizeOptions={[10]}
      />
    </div>
  );
}
