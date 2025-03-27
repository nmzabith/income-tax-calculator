import React from 'react';
import { 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

const CurrencyToggle = ({ currency, exchangeRate, onCurrencyChange }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Select Currency:
      </Typography>
      
      <FormControl component="fieldset">
        <RadioGroup
          row
          name="currency-options"
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          <FormControlLabel value="LKR" control={<Radio />} label="Sri Lankan Rupee (LKR)" />
          <FormControlLabel value="USD" control={<Radio />} label="US Dollar (USD)" />
        </RadioGroup>
      </FormControl>
      
      {currency === 'USD' && exchangeRate && (
        <Box mt={1}>
          <Typography variant="body2" color="text.secondary">
            Current exchange rate: 1 USD = {exchangeRate.toFixed(2)} LKR
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CurrencyToggle;
