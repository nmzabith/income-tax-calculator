import React from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

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
        newRow: null
      });
    } else {
      const matchingNewRow = newDetailsWithRate.find(newRow => 
        (newRow.rate === row.rate) || 
        (row.rate < 18 && newRow.rate === 18)
      );
      acc.push({ oldRow: row, newRow: matchingNewRow });
    }
    return acc;
  }, []);

  const RangeCell = ({ oldRow, newRow }) => (
    <>
      <Typography component="span" sx={{ 
        color: 'red',
        display: 'block' 
      }}>
        {`Rs.${Math.round(oldRow.from).toLocaleString()} - Rs.${Math.round(oldRow.to).toLocaleString()}`}
        {oldRow.rate === 12 && " (Removed)"}
      </Typography>
      {newRow && (
        <Typography component="span" sx={{ 
          color: 'green',
          display: 'block'
        }}>
          {`Rs.${Math.round(newRow.from).toLocaleString()} - Rs.${Math.round(newRow.to).toLocaleString()}`}
        </Typography>
      )}
    </>
  );

  const RateCell = ({ oldRow, newRow }) => {
    const isZeroRate = oldRow.rate === 0;
    const showStrikethrough = !isZeroRate && oldRow.rate !== newRow?.rate;
    const isRemoved = oldRow.rate === 12;

    return (
      <Typography component="span" sx={{ 
        color: showStrikethrough || isRemoved ? 'red' : 'inherit',
        textDecoration: showStrikethrough ? 'line-through' : 'none',
        backgroundColor: isRemoved ? '#ffebee' : 'inherit',
        padding: isRemoved ? '2px 6px' : '0',
        borderRadius: isRemoved ? '4px' : '0'
      }}>
        {`${oldRow.rate}%`}
        {isRemoved && ' (Removed)'}
        {showStrikethrough && !isRemoved && newRow && (
          <Typography component="span" sx={{ 
            marginLeft: '8px',
            color: 'inherit',
            textDecoration: 'none'
          }}>
            → {newRow.rate}%
          </Typography>
        )}
      </Typography>
    );
  };

  const TaxCell = ({ oldRow, newRow }) => {
    const taxChanged = Math.round(oldRow.tax) !== Math.round(newRow?.tax || 0);
    
    return (
      <>
        {taxChanged && (
          <Typography component="span" sx={{ 
            color: 'red',
            textDecoration: 'line-through',
            display: 'block'
          }}>
            {Math.round(oldRow.tax).toLocaleString()}
          </Typography>
        )}
        {newRow && Math.round(newRow.tax).toLocaleString()}
      </>
    );
  };

  return (
    <TableContainer 
      component={Paper}
      sx={{
        overflowX: 'auto',
        '.MuiTableCell-root': {
          px: { xs: 1, sm: 2 },  // Responsive padding
          py: { xs: 1, sm: 1.5 },
          fontSize: { xs: '0.8rem', sm: '0.875rem' }
        }
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
                  backgroundColor: oldRow.rate === 12 ? '#ffebee' : 'inherit'
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
