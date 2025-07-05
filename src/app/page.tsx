import React from "react";
import DataTable from "@/components/DataTable";
import ImportExport from "@/components/ImportExport";
import ManageColumns from "@/components/ManageColumns";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <ImportExport />
        <ManageColumns />
      </div>
      <DataTable />
    </main>
  );
}
