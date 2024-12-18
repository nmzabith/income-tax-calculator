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
    customTax: [],
    oldTax: {
      total: 0,
      details: []
    }
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

  calculate = () => {
    const {income, customTax} = this.state;
    let amount = Number(income.monthly);
    let totalMonthly = Number(0);
    let totalOtherIncome = Number(0);

    if(customTax.length > 0){
      customTax.forEach(tax => {
        totalOtherIncome += Number(tax.amount)
        totalMonthly += (tax.amount * (tax.percentage/100))
      })
    }

    // Calculate old tax (100,000 threshold)
    let oldTaxAmount = this.calculateOldTax(amount, 100000);
    
    // Calculate new tax (150,000 threshold)
    let newTaxAmount = this.calculateNewTax(amount, 150000);

    this.setState({
      tax: newTaxAmount,
      oldTax: oldTaxAmount,
      totalMonthlyIncome: amount,
      otherTax: totalMonthly,
      otherIncome: totalOtherIncome
    });
  };

  calculateOldTax = (amount, threshold) => {
    if (amount <= threshold) {
      return { total: 0, details: [] };
    }

    let taxAmount = { total: 0, details: [{ tax: 0, from: 0, to: threshold }]};
    let incomeAmount = amount - threshold;
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
              from: Math.round(taxAmount.details[taxAmount.details.length - 1].to),
              to: Math.round(taxAmount.details[taxAmount.details.length - 1].to + slot),
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
            total: taxAmount.total + ((amount - taxAmount.details[taxAmount.details.length - 1].to) * rate) / 100,
            details: [
              ...taxAmount.details,
              {
                tax: Math.round(((amount - taxAmount.details[taxAmount.details.length - 1].to) * rate) / 100),
                from: Math.round(taxAmount.details[taxAmount.details.length - 1].to),
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
              from: Math.floor(taxAmount.details[taxAmount.details.length - 1].to),
              to: Math.floor(taxAmount.details[taxAmount.details.length - 1].to + incomeAmount),
              rate
            }
          ]
        };
        incomeAmount = 0;
      }
    }
    return taxAmount;
  };

  calculateNewTax = (amount, threshold) => {
    if (amount <= threshold) {
      return { total: 0, details: [] };
    }

    let taxAmount = { total: 0, details: [{ tax: 0, from: 0, to: threshold }]};
    let incomeAmount = amount - threshold;
    let rate = 6;
    let slot = 41666.6666667;
    let sixPercentSlot = 83333.33333334;

    // Handle first 6% bracket differently for new calculation
    if (incomeAmount > sixPercentSlot) {
      const slotTax = (sixPercentSlot * rate) / 100;
      taxAmount = {
        total: taxAmount.total + slotTax,
        details: [
          ...taxAmount.details,
          {
            tax: Math.round(slotTax),
            from: threshold,
            to: threshold + sixPercentSlot,
            rate
          }
        ]
      };
      incomeAmount -= sixPercentSlot;
      rate += 6;
    } else {
      const slotTax = (incomeAmount * rate) / 100;
      taxAmount = {
        total: taxAmount.total + slotTax,
        details: [
          ...taxAmount.details,
          {
            tax: Math.round(slotTax),
            from: threshold,
            to: threshold + incomeAmount,
            rate
          }
        ]
      };
      incomeAmount = 0;
    }

    // Continue with remaining brackets using standard slot size
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
    return taxAmount;
  };

  handleDelete = (i) => {
    const{customTax} = this.state
    let afterFilter = customTax.filter((value, j) => j !== i)
    this.setState({customTax : afterFilter}, () => {
      this.calculate()
    })
  }

  render(){
    const {income, customTax, totalMonthlyIncome, otherTax, tax } = this.state;

    return (
      <Box sx={{ flexGrow: 1 }} p={5}>
        <Grid container spacing={2}>
          {this.title("Income Tax Calculator")}
          {this.monthlyIncome()}
          {this.annualIncome()}
          {customTax.length > 0 ? this.customTaxTable() : ""}
          {totalMonthlyIncome > 150000 ? this.taxTable() : ""}
          {totalMonthlyIncome > 100000 ? this.taxOutput() : ""}
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

  taxOutput() {
    const {tax, oldTax, otherTax, totalMonthlyIncome, otherIncome} = this.state;
    const taxDifference = Math.floor(oldTax.total - tax.total);
    const taxReductionPercentage = ((taxDifference / oldTax.total) * 100).toFixed(2);
    // Calculate EPF only from monthly salary
    const epfDeduction = totalMonthlyIncome * 0.08;
    // Calculate final income after tax and EPF separately
    const totalAfterTax = Number(totalMonthlyIncome) + Number(otherIncome) - Number(Math.floor(tax.total+otherTax));
    const incomeAfterTaxAndEpf = totalAfterTax - epfDeduction;
    
    if (totalMonthlyIncome <= 150000) {
      return <Grid item xs={12}>
        <Typography variant="h5" sx={{ color: 'green', mb: 2 }}>
          Your income (Rs.{totalMonthlyIncome.toLocaleString()}) is now tax free under the new threshold!
        </Typography>
        <Typography variant="h5">
          Previous Tax Amount: Rs.{Math.floor(oldTax.total+otherTax).toLocaleString()}
        </Typography>
        <Typography variant="h5" sx={{ color: 'green' }}>
          You Save: Rs.{Math.floor(oldTax.total+otherTax).toLocaleString()} (100% reduction)
        </Typography>
        <Typography variant="h5">
          Income After EPF: Rs.{Math.round(totalMonthlyIncome - epfDeduction).toLocaleString()}
        </Typography>
      </Grid>;
    }

    return (
      <Grid item xs={12}>
        <Typography variant="h5">
          Previous Tax (100k threshold): Rs.{Math.floor(oldTax.total+otherTax).toLocaleString()}
        </Typography>
        <Typography variant="h5">
          New Tax (150k threshold & 6% slab change): Rs.{Math.floor(tax.total+otherTax).toLocaleString()}
        </Typography>
        <Typography variant="h5" sx={{ color: 'green' }}>
          Tax Reduction: Rs.{taxDifference.toLocaleString()} ({taxReductionPercentage}%)
        </Typography>
        <Typography variant="h5">
          Total Income: Rs.{(Number(totalMonthlyIncome) + Number(otherIncome)).toLocaleString()}
        </Typography>
        <Typography variant="h5">
          Income After Tax: Rs.{totalAfterTax.toLocaleString()}
          {' '}<Typography component="span" sx={{ color: 'gray' }}>
            (After Tax & EPF: Rs.{Math.round(incomeAfterTaxAndEpf).toLocaleString()})
          </Typography>
        </Typography>
      </Grid>
    );
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
              <TableCell align="right">Percentage</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customTax.map((row,i) => (
              <TableRow key={i+row.amount}>
                <TableCell key={i} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.percentage}%</TableCell>
                <TableCell align="right">Rs.{(row.amount).toLocaleString()}</TableCell>
                <TableCell align="right">Rs.{(row.amount*(row.percentage/100)).toLocaleString()}</TableCell>
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
    const {tax, oldTax, totalMonthlyIncome} = this.state;
    if (totalMonthlyIncome <= 0) return null;
    
    // Get the longer of the two detail arrays
    const detailsToShow = oldTax.details.length > tax.details.length ? 
      oldTax.details.map((oldRow, index) => ({
        oldRow,
        newRow: tax.details[index] || null
      })) :
      tax.details.map((newRow, index) => ({
        oldRow: oldTax.details[index] || null,
        newRow
      }));
    
    return (
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Tax Breakdown Comparison</Typography>
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
            {detailsToShow.map((detail, index) => {
              const { oldRow, newRow } = detail;
              return (
                <TableRow
                  key={`tax-row-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {oldRow && (!newRow || oldRow.from !== newRow.from) && (
                      <Typography component="span" sx={{ color: 'red', textDecoration: 'line-through', display: 'block' }}>
                        {`Rs.${Math.round(oldRow.from).toLocaleString()} - Rs.${Math.round(oldRow.to).toLocaleString()}`}
                      </Typography>
                    )}
                    {newRow && `Rs.${Math.round(newRow.from).toLocaleString()} - Rs.${Math.round(newRow.to).toLocaleString()}`}
                  </TableCell>
                  <TableCell align="right">
                    {oldRow && (!newRow || oldRow.rate !== newRow.rate) && (
                      <Typography component="span" sx={{ color: 'red', textDecoration: 'line-through', display: 'block' }}>
                        {oldRow.rate}
                      </Typography>
                    )}
                    {newRow && newRow.rate}
                  </TableCell>
                  <TableCell align="right">
                    {oldRow && (!newRow || oldRow.tax !== newRow.tax) && (
                      <Typography component="span" sx={{ color: 'red', textDecoration: 'line-through', display: 'block' }}>
                        {Math.round(oldRow.tax).toLocaleString()}
                      </Typography>
                    )}
                    {newRow && Math.round(newRow.tax).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>);
  }
}
 
export default App;

