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
          Caution: This calculation uses information as of 18/12/2024 5 PM, May change after official circular release. This is done on a rough basis considering your given
          incomes only. The real calculation may include multiple other incomes.
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
          Info: Tax free threshold increased to Rs.150,000 (previously Rs.100,000). First 6% tax slab increased to Rs.1 Million
          (previously Rs.500k) and remaining slabs remain at Rs.500k. If you receive annual bonuses tax will be calculated on that month
          when you receive bonus. Ex Salary(Rs. 200,000) + Bonus (Rs. 300,000)
          Your tax will be calculated for the sum which is Rs. 500,000 (Tax
          Rs.106,499). Use Other Income to calculate tax applied with different
          rates such as Tax on Rent, Tax on Interest Income
        </Typography>
      </Grid>
    );
  }
}

export default Description;
