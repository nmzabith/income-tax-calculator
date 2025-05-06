import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

class Description extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <Grid item xs={12} mt={{ xs: 1, sm: 2 }}>
        <Typography
          variant="body2"
          color="red"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "0.875rem", sm: "0.875rem" },
            lineHeight: { xs: 1.4, sm: 1.6 },
          }}
        >
          <strong>Official Tax Update for 2025/2026:</strong> The new tax
          amendments have been approved in parliament and are now in effect.
          This calculation uses the official tax rates for the 2025/2026
          financial year. For complete details and official documentation, refer
          to the Inland Revenue Department
          <Chip
            label="IRD"
            size="small"
            style={{ margin: "2px" }}
            component="a"
            href="http://www.ird.gov.lk/en/publications/sitepages/apit_tax_tables.aspx?menuid=1503"
            clickable
            aria-label="Visit IRD website"
          />
        </Typography>
        <Typography
          variant="body2"
          color="blue"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "0.875rem", sm: "0.875rem" },
            lineHeight: { xs: 1.4, sm: 1.6 },
            mt: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 2 },
          }}
        >
          <strong>2025/2026 Tax Structure:</strong> Tax free threshold is
          Rs.150,000 per month. First 6% tax slab applies up to Rs.1 Million.
          The 12% tax bracket has been removed, and subsequent tax rates
          continue at 6% increments (18% → 24% → 30% → 36%). If you receive
          annual bonuses, tax will be calculated on that month when you receive
          bonus. Use Other Income to calculate tax applied with different rates
          such as Tax on Rent, Tax on Interest Income.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            fontSize: { xs: "0.875rem", sm: "0.875rem" },
            lineHeight: { xs: 1.4, sm: 1.6 },
          }}
        >
          <strong>About This Sri Lanka Income Tax Calculator:</strong> This free
          online tool helps you calculate your PAYE (Pay As You Earn) tax
          liability in Sri Lanka based on the latest tax regulations for
          2025/2026. The calculator supports both standard Sri Lankan income tax
          calculation and foreign remittance tax calculations, allowing you to
          estimate your tax obligations accurately.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            fontSize: { xs: "0.875rem", sm: "0.875rem" },
            lineHeight: { xs: 1.4, sm: 1.6 },
          }}
        >
          <strong>How to Use:</strong> Simply enter your monthly or annual
          salary, choose between standard income or foreign remittance income,
          and the calculator will instantly show your tax liability. You can
          also add other income sources with different tax rates.
        </Typography>
      </Grid>
    );
  }
}

export default Description;
