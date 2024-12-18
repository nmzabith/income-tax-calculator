import React from 'react';
import { Grid, Typography } from '@mui/material';

const TaxOutput = ({ tax, oldTax, otherTax, totalMonthlyIncome, otherIncome }) => {
  const taxDifference = Math.floor(oldTax.total - tax.total);
  const taxReductionPercentage = ((taxDifference / oldTax.total) * 100).toFixed(2);
  const epfDeduction = totalMonthlyIncome * 0.08;
  const totalAfterTax = Number(totalMonthlyIncome) + Number(otherIncome) - Number(Math.floor(tax.total + otherTax));
  const incomeAfterTaxAndEpf = totalAfterTax - epfDeduction;

  const responsiveTypography = {
    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
    mb: { xs: 1, sm: 1.5 }
  };

  if (totalMonthlyIncome <= 150000) {
    return (
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ ...responsiveTypography, color: 'green', mb: 2 }}>
          Your income (Rs.{totalMonthlyIncome.toLocaleString()}) is now tax free under the new threshold!
        </Typography>
        <Typography variant="h5" sx={{ ...responsiveTypography }}>
          Previous Tax Amount: Rs.{Math.floor(oldTax.total + otherTax).toLocaleString()}
        </Typography>
        <Typography variant="h5" sx={{ ...responsiveTypography, color: 'green' }}>
          You Save: Rs.{Math.floor(oldTax.total + otherTax).toLocaleString()} (100% reduction)
        </Typography>
        <Typography variant="h5" sx={{ ...responsiveTypography }}>
          EPF Deduction (8% from salary): Rs.{Math.round(epfDeduction).toLocaleString()}
        </Typography>
        <Typography variant="h5" sx={{ ...responsiveTypography }}>
          Income After EPF: Rs.{Math.round(totalMonthlyIncome - epfDeduction).toLocaleString()}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <Typography variant="h5" sx={{ ...responsiveTypography }}>
        Previous Tax (100k threshold): Rs.{Math.floor(oldTax.total + otherTax).toLocaleString()}
      </Typography>
      <Typography variant="h5" sx={{ ...responsiveTypography }}>
        New Tax (150k threshold & 6% slab change): Rs.{Math.floor(tax.total + otherTax).toLocaleString()}
      </Typography>
      <Typography variant="h5" sx={{ ...responsiveTypography, color: 'green' }}>
        Tax Reduction: Rs.{taxDifference.toLocaleString()} ({taxReductionPercentage}%)
      </Typography>
      <Typography variant="h5" sx={{ ...responsiveTypography }}>
        Total Income: Rs.{(Number(totalMonthlyIncome) + Number(otherIncome)).toLocaleString()}
      </Typography>
      <Typography variant="h5" sx={{ ...responsiveTypography }}>
        EPF Deduction (8% from salary): Rs.{Math.round(epfDeduction).toLocaleString()}
      </Typography>
      <Typography variant="h5" sx={{ ...responsiveTypography }}>
        Income After Tax & EPF: Rs.{Math.round(incomeAfterTaxAndEpf).toLocaleString()}
      </Typography>
    </Grid>
  );
};

export default TaxOutput;
