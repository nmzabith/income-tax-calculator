import React from 'react';
import { 
  FormControl, 
  FormControlLabel, 
  Switch, 
  Typography, 
  Paper,
  Box,
  Tooltip
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const TaxTypeToggle = ({ isForeignRemittance, onTaxTypeChange }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            Tax Type
          </Typography>
          <Tooltip title="Foreign remittance income has different tax rates: 0% up to Rs. 150,000/month, 6% for next Rs. 83,333/month, and 15% for income above that" arrow>
            <InfoOutlinedIcon sx={{ ml: 1, fontSize: '1rem', color: 'text.secondary' }} />
          </Tooltip>
        </Box>
        <FormControl component="fieldset">
          <FormControlLabel
            control={
              <Switch 
                checked={isForeignRemittance} 
                onChange={(e) => onTaxTypeChange(e.target.checked)}
                color="primary"
              />
            }
            label={isForeignRemittance ? "Foreign Remittance" : "Regular Income"}
            labelPlacement="start"
          />
        </FormControl>
      </Box>
      
      {isForeignRemittance && (
        <Box mt={1} p={1} sx={{ backgroundColor: '#e3f2fd', borderRadius: 1 }}>
          <Typography variant="body2">
            Foreign remittance taxes: 0% up to Rs. 150,000/month, 6% for next Rs. 83,333/month, and 15% for income above that
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TaxTypeToggle;
