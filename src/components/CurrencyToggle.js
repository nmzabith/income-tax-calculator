import React from 'react';
import { 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Typography, 
  Paper,
  Box,
  Card,
  CardContent,
  Chip,
  Divider
} from '@mui/material';
import {
  ArrowLeftRight,
  DollarSign,
  IndianRupee
} from 'lucide-react';

const CurrencyToggle = ({ currency, exchangeRate, onCurrencyChange }) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        mb: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #e8f5e8 100%)',
        border: '1px solid rgba(76, 175, 80, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(46, 125, 50, 0.05) 100%)',
          borderRadius: '0 0 0 100px',
        }
      }}
    >
      <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            mr: 2,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            <ArrowLeftRight size={24} color="white" />
          </Box>
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Currency Selection
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Choose your preferred currency for calculations
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3, opacity: 0.3 }} />
        
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup
            row
            name="currency-options"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            sx={{ gap: 3, justifyContent: 'space-around' }}
          >
            <FormControlLabel 
              value="LKR" 
              control={<Radio color="secondary" />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  රු
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Sri Lankan Rupee (LKR)
                  </Typography>
                </Box>
              }
              sx={{
                border: currency === 'LKR' ? '2px solid' : '2px solid transparent',
                borderColor: currency === 'LKR' ? 'secondary.main' : 'transparent',
                borderRadius: 2,
                p: 2,
                m: 0,
                backgroundColor: currency === 'LKR' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                transition: 'all 0.2s ease-in-out'
              }}
            />
            <FormControlLabel 
              value="USD" 
              control={<Radio color="secondary" />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DollarSign size={20} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    US Dollar (USD)
                  </Typography>
                </Box>
              }
              sx={{
                border: currency === 'USD' ? '2px solid' : '2px solid transparent',
                borderColor: currency === 'USD' ? 'secondary.main' : 'transparent',
                borderRadius: 2,
                p: 2,
                m: 0,
                backgroundColor: currency === 'USD' ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                transition: 'all 0.2s ease-in-out'
              }}
            />
          </RadioGroup>
        </FormControl>
        
        {currency === 'USD' && exchangeRate && (
          <Box 
            mt={3}
            p={2}
            sx={{ 
              backgroundColor: 'rgba(33, 150, 243, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(33, 150, 243, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <ArrowLeftRight size={20} style={{ color: '#10b981' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
                Current Exchange Rate
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                1 USD = {exchangeRate.toFixed(2)} LKR
              </Typography>
            </Box>
            <Chip
              label="Live Rate"
              size="small"
              color="info"
              variant="outlined"
              sx={{ ml: 'auto' }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyToggle;
