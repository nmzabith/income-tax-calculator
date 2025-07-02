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
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const CustomTaxTable = ({ customTax, onDelete }) => {
  if (!customTax || customTax.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
        Additional Taxable Income
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="custom tax table">
          <TableHead>
            <TableRow>
              <TableCell>Income Type</TableCell>
              <TableCell align="right">Amount (LKR)</TableCell>
              <TableCell align="right">Tax Rate (%)</TableCell>
              <TableCell align="right">Tax Amount (LKR)</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customTax.map((tax, index) => {
              const taxAmount = tax.amount * (tax.percentage / 100);
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tax.name}
                  </TableCell>
                  <TableCell align="right">
                    {Number(tax.amount).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{tax.percentage}%</TableCell>
                  <TableCell align="right">
                    {Math.round(taxAmount).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => onDelete(index)}
                      color="error"
                      size="small"
                      aria-label={`Delete ${tax.name} tax entry`}
                    >
                      <CloseOutlinedIcon />
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
