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
      <Grid item xs={12} mt={2}>
        <Typography variant="body2" color={"red"} fontWeight={"bold"}>
          Important: The new tax amendments are pending parliamentary approval and the effective date is yet to be announced. 
          This calculation uses proposed changes as of 18/12/2024 10 PM. Real implementation may vary based on final legislation.
          This is done on a rough basis considering your given incomes only. The real calculation may include multiple other incomes.
          Refer IRD document
          <Chip
            label="IRD"
            size="small"
            style={{ margin: "2px" }}
            component="a"
            href="http://www.ird.gov.lk/en/publications/sitepages/apit_tax_tables.aspx?menuid=1503"
            clickable
          />
        </Typography>
        <Typography
          variant="body2"
          color={"blue"}
          fontWeight={"bold"}
          marginTop={"8px"}
          marginBottom={"8px"}
        >
          Info: Updated tax structure as of 10 PM 19/12/2024 - Tax free threshold increased to Rs.150,000 (previously Rs.100,000). 
          First 6% tax slab increased to Rs.1 Million (previously Rs.500k). The 12% tax bracket has been removed, 
          and. Subsequent tax rates continue at 6% increments 
          (18% -> 24% -> 30% -> 36%). If you receive annual bonuses, tax will be calculated on that month
          when you receive bonus. Use Other Income to calculate tax applied with different
          rates such as Tax on Rent, Tax on Interest Income.
        </Typography>
      </Grid>
    );
  }
}

export default Description;
