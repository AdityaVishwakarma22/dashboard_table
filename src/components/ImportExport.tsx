"use client";
import React, { useRef } from "react";
import { Button } from "@mui/material";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setRows } from "@/store/tableSlice";
import { exportToCSV } from "@/utils/csvUtils";

export default function ImportExport() {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.table.rows);
  const columns = useSelector((state: RootState) =>
    state.table.columns.filter((c) => c.visible)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || !Array.isArray(results.data)) {
          alert("Invalid file, please try again");
          return;
        }

        const parsedRows = (results.data as any[]).map((row, index) => ({
          id: String(index + 1),
          name: row["Name"] || "",
          email: row["Email"] || "",
          age: parseInt(row["Age"], 10) || 0,
          role: row["Role"] || "",
        }));

        dispatch(setRows(parsedRows));
      },
      error: (err) => {
        alert("Error parsing CSV: " + err.message);
      },
    });

    e.target.value = "";
  };

  const handleExport = () => {
    if (!rows || rows.length === 0) {
      alert("No data to export.");
      return;
    }

    const visibleColumnIds = columns.map((col) => col.id);

    exportToCSV(rows, visibleColumnIds, "data_file.csv");
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleImport}
        style={{ display: "none" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => fileInputRef.current?.click()}
      >
        Import file
      </Button>

      <Button variant="outlined" color="secondary" onClick={handleExport}>
        Export file
      </Button>
    </div>
  );
}
