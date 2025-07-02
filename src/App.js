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
import { Typography, Container, ThemeProvider } from "@mui/material";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import {} from "bootstrap";
import CustomTaxInput from "./components/customTaxComponent";
import CustomTaxTable from "./components/CustomTaxTable";
import Description from "./components/descriptions";
import SocialMedia from "./components/socialIcons";
import React, { Component } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { calculateNewTax, calculateOldTax, calculateForeignRemittanceTax, calculateBonusTax } from './utils/taxCalculations';
import { getUsdToLkrRate, convertUsdToLkr } from './services/currencyService';
import TaxTypeToggle from './components/TaxTypeToggle';
import CurrencyToggle from './components/CurrencyToggle';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import TaxBreakdownTable from './components/TaxBreakdownTable';
import TaxOutput from './components/TaxOutput';
import Helmet from 'react-helmet';
import Header from './components/Header';
import InputCard from './components/InputCard';
import theme from './theme/theme';

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
    isLoading: false,
    // Beta bonus functionality
    isBonusEnabled: false,
    bonusAmount: 0,
    bonusTaxCalculation: null
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
    const { income, customTax, isForeignRemittance, currency, isBonusEnabled, bonusAmount } = this.state;
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
    }, () => {
      // Calculate bonus tax if enabled
      if (isBonusEnabled && bonusAmount > 0) {
        this.calculateBonusTax();
      }
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

  handleBonusToggle = (enabled) => {
    this.setState({ 
      isBonusEnabled: enabled,
      bonusAmount: enabled ? this.state.bonusAmount : 0,
      bonusTaxCalculation: enabled ? this.state.bonusTaxCalculation : null
    }, () => {
      if (enabled && this.state.bonusAmount > 0) {
        this.calculateBonusTax();
      }
    });
  };

  handleBonusAmountChange = (event) => {
    const amount = Number(event.target.value);
    this.setState({ bonusAmount: amount }, () => {
      if (this.state.isBonusEnabled && amount > 0 && this.state.income.monthly > 0) {
        this.calculateBonusTax();
      }
    });
  };

  calculateBonusTax = () => {
    const { income, bonusAmount, isForeignRemittance, currency } = this.state;
    
    if (!bonusAmount || bonusAmount <= 0 || !income.monthly || income.monthly <= 0) {
      this.setState({ bonusTaxCalculation: null });
      return;
    }

    // Use the converted amount for calculations if currency is USD
    const monthlySalary = currency === 'USD' ? 
      (income.convertedMonthly || 0) : 
      Number(income.monthly);

    const bonusTaxResult = calculateBonusTax(monthlySalary, bonusAmount, isForeignRemittance);
    this.setState({ bonusTaxCalculation: bonusTaxResult });
  };

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
      isLoading,
      isBonusEnabled,
      bonusAmount,
      bonusTaxCalculation
    } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>Sri Lanka Income Tax Calculator 2024/2025 | PAYE Tax Online Tool</title>
          <meta name="description" content="Calculate your income tax in Sri Lanka for 2024/2025 with our free PAYE tax calculator. Supports foreign remittance and latest tax amendments." />
        </Helmet>
        
        <Box sx={{ 
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}>
          <Header />
          
          <Container maxWidth="lg" sx={{ pb: 6 }}>
            <Grid container spacing={3}>
              
              {/* Tax Type Toggle */}
              <Grid item xs={12}>
                <TaxTypeToggle 
                  isForeignRemittance={isForeignRemittance} 
                  onTaxTypeChange={this.handleTaxTypeChange} 
                />
              </Grid>
              
              {/* Currency Toggle for Foreign Remittance */}
              {isForeignRemittance && (
                <Grid item xs={12}>
                  <CurrencyToggle 
                    currency={currency} 
                    exchangeRate={exchangeRate} 
                    onCurrencyChange={this.handleCurrencyChange} 
                  />
                </Grid>
              )}
              
              {/* Income Input Card */}
              <Grid item xs={12}>
                <InputCard
                  income={income}
                  isForeignRemittance={isForeignRemittance}
                  currency={currency}
                  isLoading={isLoading}
                  exchangeRate={exchangeRate}
                  onMonthlyAmountChange={this.handleMonthlyAmountChange}
                  onAnnualAmountChange={this.handleAnnualAmountChange}
                />
              </Grid>

              {/* Beta Bonus Calculation Feature */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mb: 2, backgroundColor: '#fff3e0', border: '1px solid #ff9800' }}>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>Beta Feature:</strong> Bonus tax calculations are experimental and may not be 100% accurate. 
                      This feature provides a rough estimate for planning purposes only.
                    </Typography>
                  </Alert>
                  
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={isBonusEnabled} 
                        onChange={(e) => this.handleBonusToggle(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Enable Bonus Tax Calculation (Beta)"
                  />
                  
                  {isBonusEnabled && (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="bonus-amount-input"
                          label="Annual Bonus Amount"
                          variant="outlined"
                          value={bonusAmount !== 0 ? bonusAmount : ""}
                          onChange={this.handleBonusAmountChange}
                          fullWidth
                          type="number"
                          aria-label="Annual Bonus Amount Input"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                LKR
                              </InputAdornment>
                            ),
                          }}
                          helperText="Enter your annual bonus amount"
                        />
                      </Grid>
                    </Grid>
                  )}
                  
                  {bonusTaxCalculation && (
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Bonus Tax Calculation (Cumulative Method)
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Total Annual Income: Rs.{bonusTaxCalculation.totalAnnualIncome.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Total Annual Tax: Rs.{bonusTaxCalculation.totalAnnualTax.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Annual Tax on Salary Only: Rs.{bonusTaxCalculation.salaryOnlyTax.toLocaleString()}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          Tax on Bonus: Rs.{bonusTaxCalculation.bonusTax.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                          Effective Tax Rate on Bonus: {bonusTaxCalculation.effectiveTaxRate}%
                        </Typography>
                      </Paper>
                    </Grid>
                  )}
                </Paper>
              </Grid>

              {/* Custom Tax Table */}
              {customTax.length > 0 && (
                <Grid item xs={12}>
                  <CustomTaxTable customTax={customTax} onDelete={this.handleDelete} />
                </Grid>
              )}

              {/* Tax Breakdown Table */}
              {totalMonthlyIncome > 150000 && (
                <Grid item xs={12}>
                  <TaxBreakdownTable 
                    oldTax={oldTax} 
                    newTax={tax} 
                    isForeignRemittance={isForeignRemittance}
                  />
                </Grid>
              )}

              {/* Tax Output for Regular Income */}
              {totalMonthlyIncome > 100000 && !isForeignRemittance && (
                <Grid item xs={12}>
                  <TaxOutput 
                    tax={tax}
                    oldTax={oldTax}
                    otherTax={otherTax}
                    totalMonthlyIncome={totalMonthlyIncome}
                    otherIncome={otherIncome}
                  />
                </Grid>
              )}

              {/* Tax Information */}
              <Grid item xs={12}>
                <section aria-label="Tax Information">
                  <Description />
                </section>
              </Grid>

              {/* Additional Tax Input */}
              <Grid item xs={12}>
                <section aria-label="Additional Tax Input">
                  <CustomTaxInput addtionaltax={this.createAdditonTax} />
                </section>
              </Grid>

              {/* Social Media */}
              <Grid item xs={12}>
                <footer>
                  <SocialMedia />
                </footer>
              </Grid>
              
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
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

