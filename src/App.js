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
import { calculateNewTax, calculateOldTax } from './utils/taxCalculations';
import TaxBreakdownTable from './components/TaxBreakdownTable';
import TaxOutput from './components/TaxOutput';

class App extends Component {
  state = {  
    totalMonthlyIncome: 0,
    income: { monthly: 0, annualy: 0 },
    tax: { total: 0, details: [] },
    customTax: [],
    oldTax: { total: 0, details: [] }
  }

  handleMonthlyAmountChange = (event) => {
    const amount = Number(event.target.value);
    this.setState(
      { income: { monthly: amount, annualy: amount * 12 } }, 
      this.calculate
    );
  };

  handleAnnualAmountChange = (event) => {
    const amount = Number(event.target.value);
    this.setState(
      { income: { monthly: amount / 12, annualy: amount } }, 
      this.calculate
    );
  };

  calculate = () => {
    const { income, customTax } = this.state;
    const amount = Number(income.monthly);
    const { totalOtherIncome, totalTax } = this.calculateCustomTax(customTax);

    const oldTaxAmount = calculateOldTax(amount, 100000);
    const newTaxAmount = calculateNewTax(amount, 150000);

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
    const {income, customTax, totalMonthlyIncome, otherTax, tax, oldTax, otherIncome } = this.state;

    return (
      <Box sx={{ 
        flexGrow: 1,
        p: { xs: 2, sm: 3, md: 5 }  // Responsive padding
      }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>  {/* Responsive spacing */}
          <Grid item xs={12} mb={{ xs: 2, md: 3 }}>  {/* Added margin bottom to title */}
            {this.title("Income Tax Calculator")}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-m"
              label="Monthly Salary"
              variant="outlined"
              value={this.state.income.monthly != 0 ? this.state.income.monthly : ""}
              onChange={this.handleMonthlyAmountChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-a"
              label="Annual Salary"
              variant="outlined"
              value={this.state.income.annualy != 0 ? this.state.income.annualy : ""}
              onChange={this.handleAnnualAmountChange}
              fullWidth
              type="number"
            />
          </Grid>

          {customTax.length > 0 && (
            <Grid item xs={12} mb={3}>
              <CustomTaxTable customTax={customTax} onDelete={this.handleDelete} />
            </Grid>
          )}

          {totalMonthlyIncome > 150000 && (
            <Grid item xs={12} mb={3}>
              <TaxBreakdownTable oldTax={oldTax} newTax={tax} />
            </Grid>
          )}

          {totalMonthlyIncome > 100000 && (
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
            <Description />
          </Grid>

          <Grid item xs={12} mb={3}>
            <CustomTaxInput addtionaltax={this.createAdditonTax} />
          </Grid>

          <Grid item xs={12}>
            <SocialMedia />
          </Grid>
        </Grid>
      </Box>
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
        variant="h4" 
        sx={{ 
          textAlign: "center",
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }  // Responsive font size
        }}
      >
        {title}
      </Typography>
    );
  }
}
 
export default App;

