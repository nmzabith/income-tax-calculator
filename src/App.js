import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import {} from "bootstrap";
import CustomTaxInput from "./components/customTaxComponent";
import Description from "./components/descriptions";
import SocialMedia from "./components/socialIcons";
import React, { Component } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { calculateNewTax, calculateOldTax, calculateForeignRemittanceTax } from './utils/taxCalculations';
import { getUsdToLkrRate, convertUsdToLkr } from './services/currencyService';
import TaxTypeToggle from './components/TaxTypeToggle';
import CurrencyToggle from './components/CurrencyToggle';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import TaxBreakdownTable from './components/TaxBreakdownTable';
import TaxOutput from './components/TaxOutput';
import Helmet from 'react-helmet';

class App extends Component {
  state = {  
    totalMonthlyIncome: 0,
    income: { monthly: 0, annualy: 0 },
    tax: { total: 0, details: [] },
    customTax: [],
    oldTax: { total: 0, details: [] },
    isForeignRemittance: false,
    currency: 'LKR',
    exchangeRate: null,
    isLoading: false
  }

  componentDidMount() {
    this.fetchExchangeRate();
  }

  fetchExchangeRate = async () => {
    const rate = await getUsdToLkrRate();
    this.setState({ exchangeRate: rate });
  }

  handleMonthlyAmountChange = async (event) => {
    const amount = Number(event.target.value);
    this.setState({ isLoading: true });
    
    try {
      let convertedAmount = amount;
      
      // Convert from USD to LKR if needed
      if (this.state.currency === 'USD') {
        convertedAmount = await convertUsdToLkr(amount);
      }
      
      this.setState(
        { 
          income: { 
            monthly: amount, 
            annualy: amount * 12,
            convertedMonthly: convertedAmount
          } 
        }, 
        () => {
          this.calculate();
          this.setState({ isLoading: false });
        }
      );
    } catch (error) {
      console.error('Error converting currency:', error);
      this.setState({ isLoading: false });
    }
  };

  handleAnnualAmountChange = async (event) => {
    const amount = Number(event.target.value);
    const monthly = amount / 12;
    
    this.setState({ isLoading: true });
    
    try {
      let convertedMonthly = monthly;
      
      // Convert from USD to LKR if needed
      if (this.state.currency === 'USD') {
        convertedMonthly = await convertUsdToLkr(monthly);
      }
      
      this.setState(
        { 
          income: { 
            monthly, 
            annualy: amount,
            convertedMonthly
          } 
        }, 
        () => {
          this.calculate();
          this.setState({ isLoading: false });
        }
      );
    } catch (error) {
      console.error('Error converting currency:', error);
      this.setState({ isLoading: false });
    }
  };

  handleTaxTypeChange = (isForeignRemittance) => {
    // If switching from foreign remittance to regular income, reset to LKR
    if (!isForeignRemittance && this.state.currency === 'USD') {
      this.setState({ 
        isForeignRemittance,
        currency: 'LKR',
        // Remove the converted value since we're switching to LKR
        income: {
          ...this.state.income,
          convertedMonthly: this.state.income.monthly
        }
      }, this.calculate);
    } else {
      this.setState({ isForeignRemittance }, this.calculate);
    }
  };

  handleCurrencyChange = async (currency) => {
    this.setState({ currency, isLoading: true });
    
    try {
      if (this.state.income.monthly) {
        let convertedMonthly;
        
        if (currency === 'USD') {
          // Get the latest rate
          const rate = await getUsdToLkrRate();
          this.setState({ exchangeRate: rate });
          
          // Convert LKR to USD if switching to USD
          convertedMonthly = await convertUsdToLkr(this.state.income.monthly);
        } else {
          // When switching back to LKR, we use the stored converted value
          convertedMonthly = this.state.income.monthly;
        }
        
        this.setState({
          income: {
            ...this.state.income,
            convertedMonthly
          }
        }, () => {
          this.calculate();
          this.setState({ isLoading: false });
        });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error converting currency:', error);
      this.setState({ isLoading: false });
    }
  };

  calculate = () => {
    const { income, customTax, isForeignRemittance, currency } = this.state;
    const { totalOtherIncome, totalTax } = this.calculateCustomTax(customTax);
    
    // Use the converted amount for calculations if currency is USD
    const amount = currency === 'USD' ? 
      (income.convertedMonthly || 0) : 
      Number(income.monthly);
    
    const oldTaxAmount = calculateOldTax(amount, 100000);
    
    // Use the appropriate tax calculation method
    const newTaxAmount = isForeignRemittance ?
      calculateForeignRemittanceTax(amount, 150000) :
      calculateNewTax(amount, 150000);

    this.setState({
      tax: newTaxAmount,
      oldTax: oldTaxAmount,
      totalMonthlyIncome: amount,
      otherTax: totalTax,
      otherIncome: totalOtherIncome
    });
  };

  calculateCustomTax = (customTax) => {
    let totalOtherIncome = 0;
    let totalTax = 0;
    
    customTax.forEach(tax => {
      totalOtherIncome += Number(tax.amount);
      totalTax += (tax.amount * (tax.percentage/100));
    });

    return { totalOtherIncome, totalTax };
  };

  handleDelete = (i) => {
    const{customTax} = this.state
    let afterFilter = customTax.filter((value, j) => j !== i)
    this.setState({customTax : afterFilter}, () => {
      this.calculate()
    })
  }

  render(){
    const {
      income, 
      customTax, 
      totalMonthlyIncome, 
      otherTax, 
      tax, 
      oldTax, 
      otherIncome,
      isForeignRemittance,
      currency,
      exchangeRate,
      isLoading
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Sri Lanka Income Tax Calculator 2024/2025 | PAYE Tax Online Tool</title>
          <meta name="description" content="Calculate your income tax in Sri Lanka for 2024/2025 with our free PAYE tax calculator. Supports foreign remittance and latest tax amendments." />
        </Helmet>
        <Box component="main" role="main" sx={{ 
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 5 }
        }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} mb={{ xs: 2, md: 3 }}>
              <header>
                {this.title("Sri Lanka Income Tax Calculator 2024/2025")}
              </header>
            </Grid>
            
            {/* Move tax type toggle to the top */}
            <Grid item xs={12}>
              <TaxTypeToggle 
                isForeignRemittance={isForeignRemittance} 
                onTaxTypeChange={this.handleTaxTypeChange} 
              />
            </Grid>
            
            {/* Only show currency toggle for foreign remittance */}
            {isForeignRemittance && (
              <Grid item xs={12}>
                <CurrencyToggle 
                  currency={currency} 
                  exchangeRate={exchangeRate} 
                  onCurrencyChange={this.handleCurrencyChange} 
                />
              </Grid>
            )}
            
            <Grid item xs={12} sm={6}>
              <TextField
                id="monthly-salary-input"
                label={`Monthly ${isForeignRemittance && currency === 'USD' ? 'Salary in USD' : 'Salary'}`}
                variant="outlined"
                value={income.monthly !== 0 ? income.monthly : ""}
                onChange={this.handleMonthlyAmountChange}
                fullWidth
                type="number"
                aria-label="Monthly Salary Input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {isForeignRemittance ? currency : "LKR"}
                    </InputAdornment>
                  ),
                  endAdornment: isLoading ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} aria-label="Loading" />
                    </InputAdornment>
                  ) : null
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="annual-salary-input"
                label={`Annual ${isForeignRemittance && currency === 'USD' ? 'Salary in USD' : 'Salary'}`}
                variant="outlined"
                value={income.annualy !== 0 ? income.annualy : ""}
                onChange={this.handleAnnualAmountChange}
                fullWidth
                type="number"
                aria-label="Annual Salary Input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {isForeignRemittance ? currency : "LKR"}
                    </InputAdornment>
                  ),
                  endAdornment: isLoading ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} aria-label="Loading" />
                    </InputAdornment>
                  ) : null
                }}
              />
            </Grid>

            {/* Only show currency conversion info for foreign remittance in USD */}
            {isForeignRemittance && currency === 'USD' && exchangeRate && !isLoading && income.convertedMonthly > 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body2">
                    {`Equivalent in LKR: Monthly ${Math.round(income.convertedMonthly).toLocaleString()} LKR, Annual ${Math.round(income.convertedMonthly * 12).toLocaleString()} LKR`}
                  </Typography>
                </Paper>
              </Grid>
            )}

            {customTax.length > 0 && (
              <Grid item xs={12} mb={3}>
                <CustomTaxTable customTax={customTax} onDelete={this.handleDelete} />
              </Grid>
            )}

            {totalMonthlyIncome > 150000 && (
              <Grid item xs={12} mb={3}>
                <TaxBreakdownTable 
                  oldTax={oldTax} 
                  newTax={tax} 
                  isForeignRemittance={isForeignRemittance}
                />
              </Grid>
            )}

            {/* Only show TaxOutput for regular income, not for foreign remittance */}
            {totalMonthlyIncome > 100000 && !isForeignRemittance && (
              <Grid item xs={12} mb={3}>
                <TaxOutput 
                  tax={tax}
                  oldTax={oldTax}
                  otherTax={otherTax}
                  totalMonthlyIncome={totalMonthlyIncome}
                  otherIncome={otherIncome}
                />
              </Grid>
            )}

            <Grid item xs={12} mb={3}>
              <section aria-label="Tax Information">
                <Description />
              </section>
            </Grid>

            <Grid item xs={12} mb={3}>
              <section aria-label="Additional Tax Input">
                <CustomTaxInput addtionaltax={this.createAdditonTax} />
              </section>
            </Grid>

            <Grid item xs={12}>
              <footer>
                <SocialMedia />
              </footer>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  createAdditonTax= (additionalTaxObject) => {
    const{customTax} = this.state;
    customTax.push(additionalTaxObject)
    this.setState({customTax},() => {
      this.calculate()
    })
  }

  title(title) {
    return (
      <Typography 
        variant="h1" 
        component="h1"
        sx={{ 
          textAlign: "center",
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }  // Responsive font size
        }}
      >
        Sri Lanka Income Tax Calculator 2025/2026
      </Typography>
    );
  }
}
 
export default App;

