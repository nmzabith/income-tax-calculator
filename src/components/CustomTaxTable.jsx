import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { BarChart2, X, DollarSign } from "lucide-react";

const CustomTaxTable = ({ customTax, onDelete }) => {
  if (!customTax || customTax.length === 0) {
    return null;
  }

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "0.75rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Box
        sx={{
          p: 2,
          pb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <BarChart2 size={22} style={{ color: "#6366f1" }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
          Additional Taxable Income
        </Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="custom tax table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#475569" }}>
                Income Type
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: "#475569" }}
              >
                Amount (රු)
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: "#475569" }}
              >
                Tax Rate (%)
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: "#475569" }}
              >
                Tax Amount (රු)
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "#475569" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customTax.map((tax, index) => {
              const taxAmount = tax.amount * (tax.percentage / 100);
              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: "rgba(243, 244, 246, 0.6)",
                    },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: 500 }}
                  >
                    {tax.name}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#475569" }}>
                    {Number(tax.amount).toLocaleString()}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "#475569" }}>
                    {tax.percentage}%
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 600, color: "#6366f1" }}
                  >
                    {Math.round(taxAmount).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => onDelete(index)}
                      color="error"
                      size="small"
                      aria-label={`Delete ${tax.name} tax entry`}
                      sx={{
                        backgroundColor: "rgba(239, 68, 68, 0.05)",
                        "&:hover": {
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                        },
                      }}
                    >
                      <X size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTaxTable;
