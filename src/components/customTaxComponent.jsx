import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { Margin } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class CustomTaxInput extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    customTax: {
      isMonthly: true,
      name: "",
      amount: "",
    },
  };
  render() {
    const { customTax } = this.state;

    return (
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ border: "black", marginTop: "10px", marginBottom: "10px" }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Additonal Tax Calculation
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Tooltip
            title="Input the name of your additionl taxable income. Ex Annual Bonus"
            followCursor={true}
          >
            <TextField
              id="outlined-m"
              label="Taxable Income Name"
              variant="outlined"
              value={customTax.name}
              onChange={(events) => this.handleTaxName(events.target.value)}
              fullWidth
              type="text"
            />
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-m"
            label="Income Amount"
            variant="outlined"
            value={customTax.amount}
            onChange={(events) => this.handleTaxAmount(events.target.value)}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            aria-labelledby="tax-type"
            defaultValue="monthly"
            name="radio-buttons-group"
            onChange={(events) => this.handletaxType(events.target.value)}
          >
            <FormControlLabel
              value="annual"
              control={<Radio />}
              label="Annual"
            />
            <FormControlLabel
              value="monthly"
              control={<Radio />}
              label="Monthly"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            disabled={
              !(
                this.isEmpty(customTax.amount) == false &&
                this.isEmpty(customTax.name) == false
              )
            }
            onClick={() => this.handleSubmit()}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    );
  }

  isEmpty(value) {
    return value == null || value.length === 0;
  }

  handleTaxName(name) {
    let customTaxObject = this.state.customTax;
    customTaxObject.name = name;
    this.setState(customTaxObject);
  }

  handletaxType(type) {
    let customTaxObject = this.state.customTax;
    customTaxObject.isMonthly = type == "monthly";
    this.setState(customTaxObject);
  }

  handleTaxAmount(amount) {
    let customTaxObject = this.state.customTax;
    customTaxObject.amount = amount;
    this.setState(customTaxObject);
  }

  handleSubmit() {
    this.props.addtionaltax(this.state.customTax);
  }
}

export default CustomTaxInput;
