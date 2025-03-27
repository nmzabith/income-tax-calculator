import React from 'react';
import { Typography, Paper, Box, Tabs, Tab } from '@mui/material';

const Description = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Tax bracket colors that match the table
  const bracketColors = {
    exemption: '#e0f2f1',
    bracket1: '#e3f2fd',
    bracket2: '#e8f5e9',
    bracket3: '#fff3e0',
    bracket4: '#ffebee',
    bracket5: '#fce4ec',
  };

  // Helper function to format exact monthly values
  const formatMonthlyValue = (annualValue) => {
    const monthlyValue = annualValue / 12;
    return monthlyValue.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
        Official Tax Rate Amendment (Effective April 1, 2025)
      </Typography>
      
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Regular Income" />
        <Tab label="Foreign Remittance" />
      </Tabs>
      
      {tabIndex === 0 ? (
        // Regular income tax description
        <>
          <Typography variant="body1" paragraph>
            The Inland Revenue Department has officially confirmed tax rates effective from April 1, 2025 through the Amendment Act No. 02 of 2025 released on March 20, 2025.
          </Typography>
          
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <Box component="span" sx={{ 
              backgroundColor: bracketColors.exemption, 
              px: 1, 
              borderRadius: 1 
            }}>
              New Tax-Free Threshold: Up to Rs. 150,000.00 monthly (Rs. 1,800,000 annually)
            </Box>
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2, fontWeight: 'medium' }}>
            New Income Tax Rates for Individuals:
          </Typography>
          
          <Box sx={{ pl: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              '& > div': { 
                borderRadius: 1, 
                p: 1,
                display: 'flex',
                justifyContent: 'space-between'
              }
            }}>
              <Box sx={{ backgroundColor: bracketColors.exemption }}>
                <Typography variant="body2">Rs. 0 - Rs. 150,000.00</Typography>
                <Typography variant="body2"><strong>0%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket1 }}>
                <Typography variant="body2">Rs. 150,000.01 - Rs. 233,333.33</Typography>
                <Typography variant="body2"><strong>6%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket2 }}>
                <Typography variant="body2">Rs. 233,333.34 - Rs. 291,666.67</Typography>
                <Typography variant="body2"><strong>18%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket3 }}>
                <Typography variant="body2">Rs. 291,666.68 - Rs. 333,333.33</Typography>
                <Typography variant="body2"><strong>24%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket4 }}>
                <Typography variant="body2">Rs. 333,333.34 - Rs. 375,000.00</Typography>
                <Typography variant="body2"><strong>30%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket5 }}>
                <Typography variant="body2">Above Rs. 375,000.00</Typography>
                <Typography variant="body2"><strong>36%</strong></Typography>
              </Box>
            </Box>
          </Box>
          
          <Typography variant="caption" component="div" sx={{ mt: 1, pl: 2, color: '#666' }}>
            (Annual equivalents: Rs. 0-1,800,000: 0%, Rs. 1,800,001-2,800,000: 6%, Rs. 2,800,001-3,500,000: 18%, 
            Rs. 3,500,001-4,000,000: 24%, Rs. 4,000,001-4,500,000: 30%, Above Rs. 4,500,000: 36%)
          </Typography>
        </>
      ) : (
        // Foreign remittance tax description
        <>
          <Typography variant="body1" paragraph>
            Foreign remittance income benefits from special tax rates under the Amendment Act No. 02 of 2025.
          </Typography>
          
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <Box component="span" sx={{ 
              backgroundColor: bracketColors.exemption, 
              px: 1, 
              borderRadius: 1 
            }}>
              Tax-Free Threshold: Up to Rs. 150,000.00 monthly (Rs. 1,800,000 annually)
            </Box>
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2, fontWeight: 'medium' }}>
            Tax Rates for Foreign Remittance:
          </Typography>
          
          <Box sx={{ pl: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              '& > div': { 
                borderRadius: 1, 
                p: 1,
                display: 'flex',
                justifyContent: 'space-between'
              }
            }}>
              <Box sx={{ backgroundColor: bracketColors.exemption }}>
                <Typography variant="body2">Rs. 0 - Rs. 150,000.00</Typography>
                <Typography variant="body2"><strong>0%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket1 }}>
                <Typography variant="body2">Rs. 150,000.01 - Rs. 233,333.33</Typography>
                <Typography variant="body2"><strong>6%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: '#e8f5e9' }}>
                <Typography variant="body2">Above Rs. 233,333.34</Typography>
                <Typography variant="body2"><strong>15%</strong></Typography>
              </Box>
            </Box>
          </Box>
          
          <Typography variant="caption" component="div" sx={{ mt: 1, pl: 2, color: '#666' }}>
            (Annual equivalents: Rs. 0-1,800,000: 0%, Rs. 1,800,001-2,800,000: 6%, Above Rs. 2,800,000: 15%)
          </Typography>
          
          <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: '#fff8e1' }}>
            <Typography variant="body2">
              <strong>Note:</strong> Foreign remittance income has a lower maximum tax rate of 15% for amounts exceeding Rs. 233,333.34 per month, compared to the regular income tax rates which can go up to 36%.
            </Typography>
          </Box>
        </>
      )}
      
      <Typography variant="body1" sx={{ mt: 3 }}>
        This calculator compares the <Box component="span" sx={{ color: '#1565c0', fontWeight: 'medium' }}>previous tax structure</Box> with the <Box component="span" sx={{ color: '#2e7d32', fontWeight: 'medium' }}>official new tax rates</Box> to help you understand how the changes will affect your monthly tax liability.
      </Typography>
      
      <Box sx={{ 
        mt: 2, 
        p: 1, 
        borderLeft: '4px solid #1976d2',
        backgroundColor: '#f5f5f5'
      }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Reference: <a 
            href="https://www.taxadvisor.lk/data/uploads/inland_revenue_amendment_act_no_02_of_2025.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Inland Revenue Amendment Act No. 02 of 2025 (March 20, 2025)
          </a>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Description;
