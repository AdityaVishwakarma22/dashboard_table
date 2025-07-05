"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addColumn, toggleColumn } from "@/store/tableSlice";
import { v4 as uuidv4 } from "uuid";

export default function ManageColumns() {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);

  const [open, setOpen] = useState(false);
  const [newField, setNewField] = useState("");

  const handleAddColumn = () => {
    if (!newField.trim()) return;
    dispatch(
      addColumn({
        id: newField.toLowerCase().replace(/\s+/g, "_") + "_" + uuidv4(),
        label: newField,
        visible: true,
      })
    );
    setNewField("");
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Manage Columns
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          {columns.map((col) => (
            <FormControlLabel
              key={col.id}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={() => dispatch(toggleColumn(col.id))}
                />
              }
              label={col.label}
            />
          ))}
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <TextField
              label="New column name"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddColumn}>
              Add
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
