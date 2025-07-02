import React from 'react';
import { 
  FormControl, 
  FormControlLabel, 
  Switch, 
  Typography, 
  Paper,
  Box,
  Tooltip,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { 
  InfoOutlined
} from '@mui/icons-material';
import {
  Building2,
  Globe,
  TrendingUp,
  Info
} from 'lucide-react';

const TaxTypeToggle = ({ isForeignRemittance, onTaxTypeChange }) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        mb: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f3e5f5 100%)',
        border: '1px solid rgba(156, 39, 176, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(233, 30, 99, 0.05) 100%)',
          borderRadius: '0 0 120px 0',
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
            background: isForeignRemittance 
              ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
              : 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
            mr: 2,
            boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            {isForeignRemittance ? (
              <Globe size={24} color="white" />
            ) : (
              <Building2 size={24} color="white" />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Tax Type Selection
            </Typography>
            <Tooltip 
              title="Foreign remittance income has different tax rates: 0% up to Rs. 150,000/month, 6% for next Rs. 83,333/month, and 15% for income above that" 
              arrow
              placement="right"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', cursor: 'help' }}>
                <Info size={14} />
                <Typography variant="body2">Select the appropriate calculation method</Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
              Income Type
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Select the appropriate tax calculation method
            </Typography>
          </Box>
          
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Switch 
                  checked={isForeignRemittance} 
                  onChange={(e) => onTaxTypeChange(e.target.checked)}
                  color="secondary"
                  size="medium"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {isForeignRemittance ? "Foreign Remittance" : "Regular Income"}
                  </Typography>
                  <Chip
                    icon={isForeignRemittance ? <Globe size={16} /> : <Building2 size={16} />}
                    label={isForeignRemittance ? "International" : "Domestic"}
                    size="small"
                    color={isForeignRemittance ? "secondary" : "primary"}
                    variant="outlined"
                  />
                </Box>
              }
              labelPlacement="start"
              sx={{ m: 0 }}
            />
          </FormControl>
        </Box>
        
        {isForeignRemittance && (
          <Box 
            mt={3} 
            p={2} 
            sx={{ 
              backgroundColor: 'rgba(76, 175, 80, 0.05)',
              borderRadius: 2,
              border: '1px solid rgba(76, 175, 80, 0.2)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2
            }}
          >
            <TrendingUp size={20} style={{ color: 'success.main', marginTop: '4px' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'success.main', mb: 1 }}>
                Foreign Remittance Tax Structure
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                • 0% tax up to රු 150,000/month<br/>
                • 6% tax for next රු 83,333/month<br/>
                • 15% tax for income above රු 233,333/month
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxTypeToggle;
