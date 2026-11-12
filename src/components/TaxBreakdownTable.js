import React from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Box,
  Chip
} from '@mui/material';

function TaxBreakdownTable({ oldTax, newTax, isForeignRemittance }) {
  // Calculate the effective tax rates correctly
  const annualIncome = (newTax.details.length > 0 ? newTax.details[newTax.details.length - 1].to : 0);
  const oldEffectiveRate = oldTax.total ? ((oldTax.total * 12 / annualIncome) * 100).toFixed(2) : 0;
  const newEffectiveRate = newTax.total ? ((newTax.total * 12 / annualIncome) * 100).toFixed(2) : 0;
  const rateDifference = (newEffectiveRate - oldEffectiveRate).toFixed(2);
  const isProposed = Boolean(newTax.isProposed);
  
  // Determine colors for difference values
  const getColorForDifference = (diff) => {
    if (diff > 0) return '#d32f2f'; // Red for increase
    if (diff < 0) return '#2e7d32'; // Green for decrease
    return 'inherit'; // Default color for no change
  };

  // Get appropriate label and color for tax difference
  const getTaxDifferenceInfo = (diff) => {
    if (diff > 0) return { label: ' (Increase)', color: '#d32f2f' };
    if (diff < 0) return { label: ' (Decrease)', color: '#2e7d32' };
    return { label: ' (No change)', color: 'inherit' };
  };

  // Tax differences
  const monthlyDiff = newTax.total - oldTax.total;
  const annualDiff = monthlyDiff * 12;
  const monthlyDiffInfo = getTaxDifferenceInfo(monthlyDiff);
  const annualDiffInfo = getTaxDifferenceInfo(annualDiff);
  const rateDiffInfo = getTaxDifferenceInfo(parseFloat(rateDifference));

  // Colors for tax brackets
  const getBracketColor = (rate) => {
    switch (rate) {
      case 0: return '#e0f2f1'; // Very light teal for tax-free
      case 6: return '#e3f2fd'; // Very light blue
      case 12: return '#e0f7fa'; // Very light cyan for new 12% bracket
      case 15: return '#e8f5e9'; // Very light green for foreign remittance
      case 18: return '#e8f5e9'; // Very light green
      case 24: return '#fff3e0'; // Very light orange
      case 30: return '#ffebee'; // Very light red
      case 36: return '#fce4ec'; // Very light pink
      default: return '#ffffff'; // White for unknown
    }
  };

  // Helper function to get precise monthly bracket description
  const getMonthlyBracketDescription = (detail) => {
    if (isProposed) {
      if (detail.rate === 0) {
        return "Rs. 0 - Rs. 162,500.00"; // Proposed tax-free threshold
      }
      if (detail.description) {
        if (detail.description.includes("First Rs. 850,000")) {
          return "Rs. 162,500.01 - Rs. 233,333.33";
        } else if (detail.description.includes("12%")) {
          return "Rs. 233,333.34 - Rs. 283,333.33";
        } else if (detail.description.includes("18%")) {
          return "Rs. 283,333.34 - Rs. 333,333.33";
        } else if (detail.description.includes("24%")) {
          return "Rs. 333,333.34 - Rs. 383,333.33";
        } else if (detail.description.includes("30%")) {
          return "Rs. 383,333.34 - Rs. 433,333.33";
        } else if (detail.description.includes("36%")) {
          return "Above Rs. 433,333.33";
        }
      }
    } else {
      if (detail.rate === 0) {
        return "Rs. 0 - Rs. 150,000.00"; // Current tax-free threshold
      }
      if (detail.description) {
        if (detail.description.includes("Up to Rs. 1,000,000")) {
          return "Rs. 150,000.01 - Rs. 233,333.33";
        } else if (detail.description.includes("1,000,001 to Rs. 1,500,000")) {
          return "Rs. 233,333.34 - Rs. 291,666.67";
        } else if (detail.description.includes("1,500,001 to Rs. 2,000,000")) {
          return "Rs. 291,666.68 - Rs. 333,333.33";
        } else if (detail.description.includes("2,000,001 to Rs. 2,500,000")) {
          return "Rs. 333,333.34 - Rs. 375,000.00";
        } else if (detail.description.includes("Over Rs. 2,500,000")) {
          return "Above Rs. 375,000.00";
        }
      }
    }

    // For custom ranges, calculate from the actual values
    const monthlyFrom = (detail.from / 12).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    const monthlyTo = (detail.to / 12).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `Rs. ${monthlyFrom} - Rs. ${monthlyTo}`;
  };

  // Helper function to get precise monthly bracket description for foreign remittance
  const getForeignRemittanceBracketDescription = (detail) => {
    const thresholdDesc = isProposed ? "Rs. 0 - Rs. 162,500.00" : "Rs. 0 - Rs. 150,000.00";
    const bracket1Desc = isProposed ? "Rs. 162,500.01 - Rs. 233,333.33" : "Rs. 150,000.01 - Rs. 233,333.33";
    const bracket2Desc = "Above Rs. 233,333.34";

    if (detail.rate === 0) {
      return thresholdDesc;
    }
    
    if (detail.rate === 6) {
      return bracket1Desc;
    }
    
    if (detail.rate === 15) {
      return bracket2Desc;
    }
    
    const monthlyFrom = (detail.from / 12).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    const monthlyTo = (detail.to / 12).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `Rs. ${monthlyFrom} - Rs. ${monthlyTo}`;
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Only show comparison for regular income, not for foreign remittance */}
      {!isForeignRemittance && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h6">
              {isProposed 
                ? "Tax Comparison: Previous Rates vs. Proposed Budget 2027 Rates" 
                : "Tax Comparison: Previous vs. 2025 Official Rates"}
            </Typography>
            {isProposed && (
              <Chip label="Proposed Rates Active" color="success" size="small" sx={{ fontWeight: 600 }} />
            )}
          </Box>
          
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tax Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Previous Tax (Rs.)</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {isProposed ? "Proposed Budget 2027 Tax (Rs.)" : "2025 Official Tax (Rs.)"}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Difference</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Monthly Tax</TableCell>
                  <TableCell>{oldTax.total.toLocaleString()}</TableCell>
                  <TableCell>{newTax.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Box component="span" sx={{ color: monthlyDiffInfo.color, fontWeight: 'medium' }}>
                      {monthlyDiff.toLocaleString()}
                      {monthlyDiffInfo.label}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Annual Tax</TableCell>
                  <TableCell>{(oldTax.total * 12).toLocaleString()}</TableCell>
                  <TableCell>{(newTax.total * 12).toLocaleString()}</TableCell>
                  <TableCell>
                    <Box component="span" sx={{ color: annualDiffInfo.color, fontWeight: 'medium' }}>
                      {annualDiff.toLocaleString()}
                      {annualDiffInfo.label}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Effective Tax Rate</TableCell>
                  <TableCell>{oldEffectiveRate}%</TableCell>
                  <TableCell>{newEffectiveRate}%</TableCell>
                  <TableCell>
                    <Box component="span" sx={{ color: rateDiffInfo.color, fontWeight: 'medium' }}>
                      {rateDifference}%
                      {rateDiffInfo.label}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h6">
          {isForeignRemittance
            ? (isProposed ? "Foreign Remittance Tax Breakdown (Proposed Budget 2027)" : "Foreign Remittance Tax Breakdown")
            : (isProposed ? "Monthly Tax Breakdown (Budget 2027 Proposed Rates)" : "Monthly Tax Breakdown (2025 Official Rates)")}
        </Typography>
        {isProposed && (
          <Chip label="Rs. 162,500 Threshold & 12% Bracket" color="primary" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Monthly Salary Range</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tax Rate</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tax Amount (Rs.)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newTax.details.map((detail, index) => (
              <TableRow 
                key={index} 
                sx={{ backgroundColor: getBracketColor(detail.rate) }}
              >
                <TableCell>
                  {isForeignRemittance 
                    ? getForeignRemittanceBracketDescription(detail)
                    : getMonthlyBracketDescription(detail)}
                </TableCell>
                <TableCell>
                  <Box component="span" sx={{ 
                    fontWeight: detail.rate > 0 ? 'medium' : 'normal',
                  }}>
                    {detail.rate}%
                  </Box>
                </TableCell>
                <TableCell>{Math.round(detail.tax / 12).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {newTax.details.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">No tax payable (Income below tax-free threshold)</TableCell>
              </TableRow>
            )}
            {newTax.total > 0 && (
              <TableRow sx={{ backgroundColor: '#eeeeee' }}>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Total Monthly Tax</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{newTax.total.toLocaleString()}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isForeignRemittance && (
        <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: '#e8f5e9' }}>
          <Typography variant="body2">
            Foreign remittance income benefits from simplified tax rates: 0% up to {isProposed ? "Rs. 162,500/month" : "Rs. 150,000/month"}, 
            6% for income from {isProposed ? "Rs. 162,500.01" : "Rs. 150,000.01"} to Rs. 233,333.33/month, and 15% for income above Rs. 233,333.34/month.
          </Typography>
        </Box>
      )}

      {isProposed && !isForeignRemittance && (
        <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
          <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500 }}>
            💡 <strong>Budget 2027 Relief Highlights:</strong> The newly proposed structure increases the tax-free limit to Rs. 162,500/mo (Rs. 1.95M/year) and introduces a 12% bracket (Rs. 233,333 - Rs. 283,333/mo), offering monthly tax reductions from Rs. 750 up to Rs. 15,750.
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 2, fontSize: '0.85rem', color: '#666' }}>
        <Typography variant="caption" component="div">
          * Effective tax rate is calculated as (annual tax / annual income) × 100%
        </Typography>
        <Typography variant="caption" component="div">
          * Monthly salary ranges reflect exact income brackets subject to each tax rate
        </Typography>
      </Box>
    </Paper>
  );
}

export default TaxBreakdownTable;
