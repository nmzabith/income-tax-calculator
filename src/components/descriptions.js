import React from 'react';
import { Typography, Paper, Box, Tabs, Tab, Alert, Chip } from '@mui/material';
import { Sparkles, Info } from 'lucide-react';

const Description = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Tax bracket colors that match the table
  const bracketColors = {
    exemption: '#e0f2f1',
    bracket1: '#e3f2fd',
    bracket12: '#e0f7fa',
    bracket2: '#e8f5e9',
    bracket3: '#fff3e0',
    bracket4: '#ffebee',
    bracket5: '#fce4ec',
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1 }}>
        <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 600 }}>
          Sri Lanka Tax Rate Frameworks
        </Typography>
        <Chip
          icon={<Sparkles size={16} />}
          label="Budget 2027 Update (Nov 12, 2026)"
          color="success"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      </Box>
      
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="🔥 Proposed Budget 2027 Relief" />
        <Tab label="Current Official 2025 Rates" />
        <Tab label="Foreign Remittance" />
      </Tabs>
      
      {tabIndex === 0 ? (
        // Proposed Budget 2027 Relief description
        <>
          <Alert severity="success" icon={<Sparkles size={20} />} sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              <strong>New Tax Update (November 12, 2026):</strong> President and Finance Minister Anura Kumara Dissanayake presented the 2027 Budget proposals in Parliament, introducing significant tax cuts for salaried employees, including a higher tax-free threshold and the reintroduction of a 12% intermediate tax bracket.
            </Typography>
          </Alert>

          <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <Box component="span" sx={{ 
              backgroundColor: bracketColors.exemption, 
              px: 1.5, 
              py: 0.5,
              borderRadius: 1,
              display: 'inline-block'
            }}>
              Proposed Tax-Free Threshold: Up to Rs. 162,500.00 monthly (Rs. 1,950,000 annually)
            </Box>
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2, fontWeight: 'medium' }}>
            Proposed Progressive Tax Slabs & Rates:
          </Typography>
          
          <Box sx={{ pl: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              '& > div': { 
                borderRadius: 1, 
                p: 1.2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }
            }}>
              <Box sx={{ backgroundColor: bracketColors.exemption }}>
                <Typography variant="body2">Rs. 0 - Rs. 162,500.00 (Tax-free allowance)</Typography>
                <Typography variant="body2"><strong>0%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket1 }}>
                <Typography variant="body2">Rs. 162,500.01 - Rs. 233,333.33 (First Rs. 850k annual)</Typography>
                <Typography variant="body2"><strong>6%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket12, border: '1px solid #80deea' }}>
                <Typography variant="body2">Rs. 233,333.34 - Rs. 283,333.33 (NEW 12% Bracket - Next Rs. 600k annual)</Typography>
                <Typography variant="body2"><strong>12% (New)</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket2 }}>
                <Typography variant="body2">Rs. 283,333.34 - Rs. 333,333.33 (Next Rs. 600k annual)</Typography>
                <Typography variant="body2"><strong>18%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket3 }}>
                <Typography variant="body2">Rs. 333,333.34 - Rs. 383,333.33 (Next Rs. 600k annual)</Typography>
                <Typography variant="body2"><strong>24%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket4 }}>
                <Typography variant="body2">Rs. 383,333.34 - Rs. 433,333.33 (Next Rs. 600k annual)</Typography>
                <Typography variant="body2"><strong>30%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket5 }}>
                <Typography variant="body2">Above Rs. 433,333.33 (Annual income over Rs. 5,200,000)</Typography>
                <Typography variant="body2"><strong>36%</strong></Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <Typography variant="body2" sx={{ color: '#166534' }}>
              💡 <strong>Monthly Tax Savings:</strong> Salaried individuals will enjoy additional monthly savings between <strong>Rs. 750</strong> (at Rs. 162,500/mo) and <strong>Rs. 15,750</strong> (at Rs. 433,333/mo or above). You can tick the checkbox above to calculate your exact relief instantly.
            </Typography>
          </Box>
        </>
      ) : tabIndex === 1 ? (
        // Current official 2025 rates description
        <>
          <Typography variant="body1" paragraph>
            The Inland Revenue Department officially enacted these rates effective April 1, 2025 under the Inland Revenue Amendment Act No. 02 of 2025.
          </Typography>
          
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <Box component="span" sx={{ 
              backgroundColor: bracketColors.exemption, 
              px: 1, 
              borderRadius: 1 
            }}>
              Current Tax-Free Threshold: Up to Rs. 150,000.00 monthly (Rs. 1,800,000 annually)
            </Box>
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2, fontWeight: 'medium' }}>
            Current Income Tax Rates for Individuals:
          </Typography>
          
          <Box sx={{ pl: 1 }}>
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
          
          <Typography variant="caption" component="div" sx={{ mt: 1, pl: 1, color: '#666' }}>
            (Annual equivalents: Rs. 0-1,800,000: 0%, Rs. 1,800,001-2,800,000: 6%, Rs. 2,800,001-3,500,000: 18%, 
            Rs. 3,500,001-4,000,000: 24%, Rs. 4,000,001-4,500,000: 30%, Above Rs. 4,500,000: 36%)
          </Typography>
        </>
      ) : (
        // Foreign remittance tax description
        <>
          <Typography variant="body1" paragraph>
            Foreign remittance income benefits from special concessionary tax rates under the Inland Revenue provisions.
          </Typography>
          
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <Box component="span" sx={{ 
              backgroundColor: bracketColors.exemption, 
              px: 1, 
              borderRadius: 1 
            }}>
              Tax-Free Threshold: Rs. 150,000.00 monthly (Rs. 162,500 under Budget 2027 proposal)
            </Box>
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2, fontWeight: 'medium' }}>
            Tax Rates for Foreign Remittance:
          </Typography>
          
          <Box sx={{ pl: 1 }}>
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
                <Typography variant="body2">Up to Tax-Free Threshold</Typography>
                <Typography variant="body2"><strong>0%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: bracketColors.bracket1 }}>
                <Typography variant="body2">First Taxable Bracket (up to Rs. 233,333.33/mo)</Typography>
                <Typography variant="body2"><strong>6%</strong></Typography>
              </Box>
              <Box sx={{ backgroundColor: '#e8f5e9' }}>
                <Typography variant="body2">Above Rs. 233,333.34/mo</Typography>
                <Typography variant="body2"><strong>15% (Capped Rate)</strong></Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: '#fff8e1' }}>
            <Typography variant="body2">
              <strong>Note:</strong> Foreign remittance income has a lower maximum tax rate capped at 15% for amounts exceeding Rs. 233,333.34 per month, compared to regular employment income which reaches up to 36%.
            </Typography>
          </Box>
        </>
      )}
      
      <Box sx={{ 
        mt: 3, 
        p: 1.5, 
        borderLeft: '4px solid #1976d2',
        backgroundColor: '#f8fafc',
        borderRadius: '0 8px 8px 0'
      }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#475569' }}>
          Official Sources: Sri Lanka Budget 2027 proposals (presented November 12, 2026) and Inland Revenue Amendment Act No. 02 of 2025.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Description;
