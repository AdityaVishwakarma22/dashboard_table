import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TableColumn {
  id: string
  label: string
  visible: boolean
}

export interface RowData {
  id: string
  name: string
  email: string
  age: number
  role: string
  [key: string]: any
}

interface TableState {
  columns: TableColumn[]
  rows: RowData[]
}

const initialState: TableState = {
  columns: [
    { id: 'name', label: 'Name', visible: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'age', label: 'Age', visible: true },
    { id: 'role', label: 'Role', visible: true },
  ],
  rows: [],
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<RowData[]>) {
      state.rows = action.payload
    },
    addColumn(state, action: PayloadAction<TableColumn>) {
      state.columns.push(action.payload)
    },
    toggleColumn(state, action: PayloadAction<string>) {
      const column = state.columns.find((c) => c.id === action.payload)
      if (column) column.visible = !column.visible
    },
    updateRow(state, action: PayloadAction<RowData>) {
      const index = state.rows.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) state.rows[index] = action.payload
    },
    deleteRow(state, action: PayloadAction<string>) {
      state.rows = state.rows.filter((r) => r.id !== action.payload)
    },
  },
})

export const { setRows, addColumn, toggleColumn, updateRow, deleteRow } =
  tableSlice.actions

export default tableSlice.reducer
