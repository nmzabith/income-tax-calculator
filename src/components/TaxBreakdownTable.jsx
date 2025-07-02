import React from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Tooltip,
} from "@mui/material";
import { Info, TrendingDown, TrendingUp, Ban, ArrowRight } from "lucide-react";

const TaxBreakdownTable = ({ oldTax, newTax }) => {
  // Add rate property to first bracket (0%)
  const oldDetailsWithRate = oldTax.details.map((detail, index) =>
    index === 0 ? { ...detail, rate: 0 } : detail
  );
  const newDetailsWithRate = newTax.details.map((detail, index) =>
    index === 0 ? { ...detail, rate: 0 } : detail
  );

  const modifiedOldDetails = oldDetailsWithRate.reduce((acc, row) => {
    if (row.rate === 12) {
      acc.push({
        oldRow: { ...row },
        newRow: null,
      });
    } else {
      const matchingNewRow = newDetailsWithRate.find(
        (newRow) =>
          newRow.rate === row.rate || (row.rate < 18 && newRow.rate === 18)
      );
      acc.push({ oldRow: row, newRow: matchingNewRow });
    }
    return acc;
  }, []);

  const RangeCell = ({ oldRow, newRow }) => (
    <>
      <Typography
        component="span"
        sx={{
          color: oldRow.rate === 12 ? "#ef4444" : "#475569",
          display: "block",
          fontSize: "0.875rem",
          fontWeight: oldRow.rate === 12 ? 600 : 500,
          textDecoration: oldRow.rate === 12 ? "line-through" : "none",
          opacity: oldRow.rate === 12 ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {`රු ${Math.round(oldRow.from).toLocaleString()} - රු ${Math.round(
          oldRow.to
        ).toLocaleString()}`}
        {oldRow.rate === 12 && (
          <Tooltip title="This bracket has been removed in the new tax structure">
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center" }}
            >
              <Ban size={14} style={{ color: "#ef4444" }} />
            </Box>
          </Tooltip>
        )}
      </Typography>
      {newRow && (
        <Typography
          component="span"
          sx={{
            color: "#10b981",
            display: "flex",
            fontSize: "0.875rem",
            fontWeight: 600,
            mt: 0.5,
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {`රු ${Math.round(newRow.from).toLocaleString()} - රු ${Math.round(
            newRow.to
          ).toLocaleString()}`}
        </Typography>
      )}
    </>
  );

  const RateCell = ({ oldRow, newRow }) => {
    const isZeroRate = oldRow.rate === 0;
    const showStrikethrough = !isZeroRate && oldRow.rate !== newRow?.rate;
    const isRemoved = oldRow.rate === 12;
    const isIncreased = newRow && newRow.rate > oldRow.rate;
    const isDecreased = newRow && newRow.rate < oldRow.rate;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          component="span"
          sx={{
            color: isRemoved
              ? "#ef4444"
              : showStrikethrough
              ? "#6b7280"
              : "#475569",
            textDecoration: showStrikethrough ? "line-through" : "none",
            backgroundColor: isRemoved ? "rgba(239, 68, 68, 0.08)" : "inherit",
            padding: isRemoved ? "2px 6px" : "0",
            borderRadius: isRemoved ? "4px" : "0",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontWeight: 500,
          }}
        >
          {`${oldRow.rate}%`}
          {isRemoved && <Ban size={14} style={{ color: "#ef4444" }} />}
        </Typography>

        {showStrikethrough && !isRemoved && newRow && (
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <ArrowRight
              size={14}
              style={{
                color: isIncreased ? "#ef4444" : "#10b981",
                margin: "0 4px",
              }}
            />
            <Typography
              component="span"
              sx={{
                color: isIncreased ? "#ef4444" : "#10b981",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontWeight: 600,
              }}
            >
              {newRow.rate}%{isIncreased && <TrendingUp size={14} />}
              {isDecreased && <TrendingDown size={14} />}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const TaxCell = ({ oldRow, newRow }) => {
    const oldTaxAmount = Math.round(oldRow.tax);
    const newTaxAmount = Math.round(newRow?.tax || 0);
    const taxChanged = oldTaxAmount !== newTaxAmount;
    const taxIncreased = newRow && newTaxAmount > oldTaxAmount;
    const taxDecreased = newRow && newTaxAmount < oldTaxAmount;

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {taxChanged && (
          <Typography
            component="span"
            sx={{
              color: "#6b7280",
              textDecoration: "line-through",
              display: "block",
              fontSize: "0.875rem",
            }}
          >
            {oldTaxAmount.toLocaleString()}
          </Typography>
        )}
        {newRow && (
          <Typography
            component="span"
            sx={{
              color: taxIncreased
                ? "#ef4444"
                : taxDecreased
                ? "#10b981"
                : "#475569",
              fontWeight: 600,
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {newTaxAmount.toLocaleString()}
            {taxIncreased && <TrendingUp size={14} />}
            {taxDecreased && <TrendingDown size={14} />}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        borderRadius: "0.75rem",
        ".MuiTableCell-root": {
          px: { xs: 1, sm: 2 }, // Responsive padding
          py: { xs: 1, sm: 1.5 },
          fontSize: { xs: "0.8rem", sm: "0.875rem" },
        },
        ".MuiTableHead-root": {
          backgroundColor: "rgba(243, 244, 246, 0.8)",
        },
        ".MuiTableHead-root .MuiTableCell-root": {
          fontWeight: 600,
          color: "#475569",
        },
      }}
    >
      <Table sx={{ minWidth: { xs: 280, sm: 350, md: 450 } }}>
        <TableHead>
          <TableRow>
            <TableCell>Slot</TableCell>
            <TableCell align="right">Rate(%)</TableCell>
            <TableCell align="right">Tax</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modifiedOldDetails.map((detail, index) => {
            const { oldRow, newRow } = detail;
            return (
              <TableRow
                key={`tax-row-${index}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    oldRow.rate === 12 ? "rgba(239, 68, 68, 0.05)" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      oldRow.rate === 12
                        ? "rgba(239, 68, 68, 0.08)"
                        : "rgba(243, 244, 246, 0.6)",
                  },
                  transition: "background-color 0.2s",
                }}
              >
                <TableCell component="th" scope="row">
                  <RangeCell oldRow={oldRow} newRow={newRow} />
                </TableCell>
                <TableCell align="right">
                  <RateCell oldRow={oldRow} newRow={newRow} />
                </TableCell>
                <TableCell align="right">
                  <TaxCell oldRow={oldRow} newRow={newRow} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxBreakdownTable;
