import React from "react";
import { TableBody, TableRow, TableCell } from "@mui/material";

export default function TableRows({
  data = [],
  keys = [],
  config = {},
  currentPage = 1,
  tableLimit = 10,
  hasActionRow = false,
  slNo = true,
  msg = "No Data Found"
}) {
  const startIndex = (currentPage - 1) * tableLimit;
  const paginatedData = data.slice(startIndex, startIndex + tableLimit);

  if (!paginatedData.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={keys.length + 2} align="center">
            {msg}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {paginatedData.map((row, index) => (
        <TableRow key={row._id || index}>
          {slNo && (
            <TableCell>
              {startIndex + index + 1}
            </TableCell>
          )}

          {keys.map((key) => {
            const value = row[key];

            if (config[key]?.type === "date" && value) {
              return (
                <TableCell key={key}>
                  {new Date(value).toLocaleDateString()}
                </TableCell>
              );
            }

            return (
              <TableCell key={key}>
                {value}
              </TableCell>
            );
          })}

          {hasActionRow && (
            <TableCell>Action</TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}