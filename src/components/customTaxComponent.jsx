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
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Building2, Plus, Percent, HelpCircle, DollarSign } from "lucide-react";

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
      <Card
        elevation={0}
        sx={{
          mb: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #fff3e0 100%)",
          border: "1px solid rgba(255, 152, 0, 0.1)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Building2
              size={28}
              style={{ color: "warning.main", marginRight: "16px" }}
            />
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Additional Income Sources
            </Typography>
            <Tooltip
              title="Add other taxable income sources like bonuses, dividends, rental income, etc."
              arrow
              placement="right"
            >
              <Box
                component="span"
                sx={{ display: "inline-flex", ml: 1, cursor: "help" }}
              >
                <HelpCircle size={20} style={{ color: "text.secondary" }} />
              </Box>
            </Tooltip>
          </Box>

          <Divider sx={{ mb: 3, opacity: 0.3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary", fontStyle: "italic" }}
              >
                Add any additional taxable income sources to get a more accurate
                tax calculation
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Tooltip
                title="Input the name of your additional taxable income. Ex: Annual Bonus, Rental Income, Dividends"
                followCursor={true}
              >
                <TextField
                  id="outlined-m"
                  label="Income Source"
                  variant="outlined"
                  value={customTax.name}
                  onChange={(events) => this.handleTaxName(events.target.value)}
                  fullWidth
                  type="text"
                  placeholder="e.g., Annual Bonus"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mr: 1 }}
                      >
                        <DollarSign
                          size={18}
                          style={{ color: "text.secondary" }}
                        />
                      </Box>
                    ),
                  }}
                />
              </Tooltip>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-amount"
                label="Income Amount"
                variant="outlined"
                value={customTax.amount}
                onChange={(events) => this.handleTaxAmount(events.target.value)}
                fullWidth
                type="number"
                placeholder="0"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        රු
                      </Typography>
                    </Box>
                  ),
                }}
                helperText="Annual amount"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="outlined-percentage"
                label="Tax Percentage"
                variant="outlined"
                value={customTax.percentage}
                onChange={(events) =>
                  this.handlePercentage(events.target.value)
                }
                fullWidth
                type="number"
                placeholder="0"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      <Percent sx={{ fontSize: 18, color: "text.secondary" }} />
                    </Box>
                  ),
                  endAdornment: (
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      %
                    </Typography>
                  ),
                }}
                helperText="Tax rate (0-100%)"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Plus size={18} />}
                  disabled={
                    !(
                      this.isEmpty(customTax.amount) === false &&
                      this.isEmpty(customTax.name) === false &&
                      this.isEmpty(customTax.percentage) === false
                    )
                  }
                  onClick={() => this.handleSubmit()}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0px 4px 12px rgba(255, 152, 0, 0.3)",
                    "&:hover": {
                      boxShadow: "0px 6px 16px rgba(255, 152, 0, 0.4)",
                    },
                  }}
                >
                  Add Income Source
                </Button>
              </Box>
            </Grid>

            {/* Example chips */}
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
                >
                  Common examples:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label="Annual Bonus - 10%"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="Rental Income - 24%"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="Dividends - 14%"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="Freelance Income - 24%"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
