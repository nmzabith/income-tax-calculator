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
          Caution: This calculation done on a rough basis considering your
          monthly income only. The real calculation may include multiple other
          incomes such as allowances, bonuses etc. Refer IRD document
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
          Info: If you can calculate your annual gross income (Salary +
          allowances + bonuses + etc). you can put inside the the Annual Income
          Input and it will calculate your monthly tax.
        </Typography>
      </Grid>
    );
  }
}

export default Description;
