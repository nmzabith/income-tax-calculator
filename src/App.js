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

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {  
    totalMonthlyIncome : 0,
    income : {
      monthly: 0, 
      annualy: 0
    },
    tax: {
      total: 0, 
      details: []
    },
    customTax: []
  }

  handleMonthlyAmountChange = (event) => {
    const amount = Number(event.target.value);
    this.setState({income : { monthly: amount, annualy: amount * 12 }}, () => {
      this.calculate();
    })
  };
  handleAnnualAmountChange = (event) => {
    const amount = Number(event.target.value);
    this.setState({income : { monthly: amount / 12, annualy: amount }}, () => {
      this.calculate();
    })
  };

  calculate =() => {
    
    const {income, customTax } = this.state;
    let amount = Number(income.monthly);
    if(customTax.length > 0){
      let totalMonthly = Number(0);

      customTax.forEach(tax => {
        if(tax.isMonthly){
          totalMonthly += Number(tax.amount);
        }else{
          totalMonthly += (Number(tax.amount)/12)
        }
      })
      amount += totalMonthly;
    }
    if (amount <= 100_000) {
      this.setState({tax : { total: 0, details: [] }});
    } else {
      let taxAmount = { total: 0, details: [{ tax: 0, from: 0, to: 100_000 }] };
      let incomeAmount = amount - 100_000;
      let rate = 6;
      let slot = 41666.6666667;

      while (incomeAmount > 0) {
        if (incomeAmount > slot) {
          const slotTax = (slot * rate) / 100;
          taxAmount = {
            total: taxAmount.total + slotTax,
            details: [
              ...taxAmount.details,
              {
                tax: Math.round(slotTax),
                from: Math.round(
                  taxAmount.details[taxAmount.details.length - 1].to
                ),
                to: Math.round(
                  taxAmount.details[taxAmount.details.length - 1].to + slot
                ),
                rate
              }
            ]
          };
          incomeAmount -= slot;
          if (rate < 36) {
            rate += 6;
          }
          if (rate === 36) {
            taxAmount = {
              total:
                taxAmount.total +
                ((amount - taxAmount.details[taxAmount.details.length - 1].to) *
                  rate) /
                  100,
              details: [
                ...taxAmount.details,
                {
                  tax: Math.round(
                    ((amount -
                      taxAmount.details[taxAmount.details.length - 1].to) *
                      rate) /
                      100
                  ),
                  from: Math.round(
                    taxAmount.details[taxAmount.details.length - 1].to
                  ),
                  to: amount,
                  rate
                }
              ]
            };
            break;
          }
        } else {
          const slotTax = Math.round((incomeAmount * rate) / 100);
          taxAmount = {
            total: taxAmount.total + slotTax,
            details: [
              ...taxAmount.details,
              {
                tax: Math.round(slotTax),
                from: Math.floor(
                  taxAmount.details[taxAmount.details.length - 1].to
                ),
                to: Math.floor(
                  taxAmount.details[taxAmount.details.length - 1].to +
                    incomeAmount
                ),
                rate
              }
            ]
          };
          incomeAmount = 0;
        }
      }
      this.setState({tax: taxAmount, totalMonthlyIncome : amount})
    }
  };

  handleDelete = (i) => {
    const{customTax} = this.state
    let afterFilter = customTax.filter((value, j) => j !== i)
    this.setState({customTax : afterFilter}, () => {
      this.calculate()
    })
  }
  render(){
    const {income, customTax, totalMonthlyIncome } = this.state;
    return (
      <Box sx={{ flexGrow: 1 }} p={5}>
        <Grid container spacing={2}>
          {this.title("Income Tax - 2022")}
          {this.monthlyIncome()}
          {this.annualIncome()}
          {customTax.length > 0 ? this.customTaxTable() : ""}
          {totalMonthlyIncome <= 100_000 ? "" : this.taxTable()}
          {totalMonthlyIncome <= 100_000 ? "" : this.incomeTaxOutput()}
        </Grid>
        <Description></Description>
        <CustomTaxInput addtionaltax = {this.createAdditonTax}/>
        <SocialMedia></SocialMedia>
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
    return <Grid item xs={12}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
    </Grid>;
  }

  incomeTaxOutput() {
    const {tax} = this.state;
    return <Grid item xs={12}>
      <Typography variant="h5">
        Income Tax Monthly: Rs.{Math.floor(tax.total).toLocaleString()}
      </Typography>
      <Typography variant="h5">
        Income Tax Annualy: Rs.
        {(Math.floor(tax.total) * 12).toLocaleString()}
      </Typography>
    </Grid>;
  }

  annualIncome() {
    const {income } = this.state;
    return <Grid item xs={6}>
      <TextField
        id="outlined-a"
        label="Annual Salary"
        variant="outlined"
        value={income.annualy != 0 ? income.annualy : ""}
        onChange={this.handleAnnualAmountChange}
        fullWidth
        type="number" />
    </Grid>;
  }

  monthlyIncome() {
    const {income } = this.state;
    return <Grid item xs={6}>
      <TextField
        id="outlined-m"
        label="Monthly Salary"
        variant="outlined"
        value={income.monthly != 0 ? income.monthly : ""}
        onChange={this.handleMonthlyAmountChange}
        fullWidth
        type="number" />
    </Grid>;
  }

  customTaxTable(){
    const {customTax} = this.state
    return(
      <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 130 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Income Title</TableCell>
              <TableCell align="right">Income Type</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customTax.map((row,i) => (
              <TableRow key={i+row.amount}>
                <TableCell key={i} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.isMonthly ? "Montly" : "Annually"}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right"><CloseOutlinedIcon onClick={()=> {this.handleDelete(i)}}></CloseOutlinedIcon></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    );
  }

  taxTable() {
    const {tax} = this.state;
    return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Slot</TableCell>
              <TableCell align="right">Rate(%)</TableCell>
              <TableCell align="right">Tax</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tax.details.map((row) => (
              <TableRow
                key={`Rs.${row.from} - Rs.${row.to}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`Rs.${row.from} - Rs.${row.to}`}
                </TableCell>
                <TableCell align="right">{row.rate}</TableCell>
                <TableCell align="right">{row.tax}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>);
  }
}
 
export default App;

