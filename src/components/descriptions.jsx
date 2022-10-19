import React, { Component } from 'react';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

class Description extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (  
            <Grid item xs={12} mt={2}>
                <Typography variant="body2" color={"red"} fontWeight={"bold"}>
                Caution: This calculation done on a rough basis considering your
                monthly income only. The real calculation may include multiple other
                incomes such as allowances, bonuses etc. Refer IRD document
                (ird.gov.lk)
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
                <Typography variant="body2" fontWeight={"bold"}>
                Any bugs. Let me know
                </Typography>
            </Grid>
        );
    }
}
 
export default Description;