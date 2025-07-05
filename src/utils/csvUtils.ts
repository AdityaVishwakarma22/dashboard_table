import { saveAs } from "file-saver";
import Papa from "papaparse";

export const exportToCSV = (data: any[], columns: string[], filename: string) => {
  const csv = Papa.unparse(
    data.map((row) =>
      Object.fromEntries(
        Object.entries(row).filter(([key]) => columns.includes(key))
      )
    )
  );
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};
