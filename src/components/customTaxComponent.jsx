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
      percentage: "",
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
            Other Income
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Tooltip
            title="Input the name of your additionl taxable income. Ex Annual Bonus"
            followCursor={true}
          >
            <TextField
              id="outlined-m"
              label="Taxable Income Title"
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
          <TextField
            id="outlined-a"
            label="Tax Percenatge"
            variant="outlined"
            value={customTax.percentage}
            onChange={(events) => this.handlePercentage(events.target.value)}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            disabled={
              !(
                this.isEmpty(customTax.amount) == false &&
                this.isEmpty(customTax.name) == false &&
                this.isEmpty(customTax.percentage) == false
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

  handlePercentage(percentage) {
    console.log(percentage, "percenatge");
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    let customTaxObject = this.state.customTax;
    customTaxObject.percentage = percentage;
    this.setState(customTaxObject);
  }

  handleTaxAmount(amount) {
    let customTaxObject = this.state.customTax;
    customTaxObject.amount = amount;
    this.setState(customTaxObject);
  }

  handleSubmit() {
    let customTax = Object.assign({}, this.state.customTax);
    this.props.addtionaltax(customTax);
    this.setState({
      customTax: {
        percentage: "",
        name: "",
        amount: "",
      },
    });
  }
}

export default CustomTaxInput;
