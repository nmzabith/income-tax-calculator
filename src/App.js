import * as React from "react";
import { styled } from "@mui/material/styles";
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

export default function App() {
  const [income, setIncome] = React.useState({ monthly: 0, annualy: 0 });
  const [tax, setTax] = React.useState({ total: 0, details: [] });

  const handleMonthlyAmountChange = (event) => {
    const amount = Number(event.target.value);
    setIncome({ monthly: amount, annualy: amount * 12 });
  };
  const handleAnnualAmountChange = (event) => {
    const amount = Number(event.target.value);
    setIncome({ monthly: amount / 12, annualy: amount });
  };

  React.useEffect(() => {
    const amount = Number(income.monthly);

    if (amount <= 100_000) {
      setTax({ total: 0, details: [] });
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
      setTax(taxAmount);
    }
  }, [income]);

  return (
    <Box sx={{ flexGrow: 1 }} p={5}>
      <Grid container spacing={2}>
        {title("Income Tax - 2022")}
        {monthlyIncome()}
        {annualIncome()}
        {income.monthly <= 100_000 ? "" : taxTable()}
        {income.monthly <= 100_000 ? "" : incomeTaxOutput()}
      </Grid>
      <Description></Description>
      <CustomTaxInput addtionaltax = {createAdditonTax}/>
      <SocialMedia></SocialMedia>
    </Box>
  );

  function createAdditonTax(additionalTaxObject){
    console.log("this is from APP");
    console.log(additionalTaxObject);
  }

  function title(title) {
    return <Grid item xs={12}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
    </Grid>;
  }

  function incomeTaxOutput() {
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

  function annualIncome() {
    return <Grid item xs={6}>
      <TextField
        id="outlined-a"
        label="Annual Income"
        variant="outlined"
        value={income.annualy != 0 ? income.annualy : ""}
        onChange={handleAnnualAmountChange}
        fullWidth
        type="number" />
    </Grid>;
  }

  function monthlyIncome() {
    return <Grid item xs={6}>
      <TextField
        id="outlined-m"
        label="Monthly Income"
        variant="outlined"
        value={income.monthly != 0 ? income.monthly : ""}
        onChange={handleMonthlyAmountChange}
        fullWidth
        type="number" />
    </Grid>;
  }

  function taxTable() {
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
