import React from "react";
import { TableHead as MuiTableHead, TableRow, TableCell } from "@mui/material";

export default function TableHead({ keys, config, hasAction }) {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell>#</TableCell>

        {keys.map((key) => (
          <TableCell key={key}>
            {config[key]?.label || key}
          </TableCell>
        ))}

        {hasAction && <TableCell>Action</TableCell>}
      </TableRow>
    </MuiTableHead>
  );
}