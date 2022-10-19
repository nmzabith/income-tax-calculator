import React, { Component } from 'react';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { SocialIcon } from "react-social-icons";

class SocialMedia extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <Grid item xs={12} mt={2}>
                <SocialIcon
                url="https://twitter.com/izabith"
                style={{ margin: "5px" }}
                />
                <SocialIcon
                url="https://www.facebook.com/nmzabith"
                style={{ margin: "5px" }}
                />
                <SocialIcon
                url="https://www.linkedin.com/in/zabithnm"
                style={{ margin: "5px" }}
                />
            </Grid>
         );
    }
}
 
export default SocialMedia;