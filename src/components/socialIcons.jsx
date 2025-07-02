import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Paper } from "@mui/material";
import { SocialIcon } from "react-social-icons";
import { MessageSquare } from "lucide-react";

class SocialMedia extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <Grid item xs={12} mt={3}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "0.75rem",
            border: "1px solid rgba(99, 102, 241, 0.16)",
            backgroundColor: "rgba(99, 102, 241, 0.04)",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
              color: "#4338ca",
              gap: 1,
            }}
          >
            <MessageSquare size={18} />
            <Typography variant="body2" fontWeight={600}>
              Any bugs? Let me know:
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <SocialIcon
              url="https://twitter.com/izabith"
              style={{ height: 36, width: 36 }}
            />
            <SocialIcon
              url="https://www.facebook.com/nmzabith"
              style={{ height: 36, width: 36 }}
            />
            <SocialIcon
              url="https://www.linkedin.com/in/zabithnm"
              style={{ height: 36, width: 36 }}
            />
          </Box>
        </Paper>
      </Grid>
    );
  }
}

export default SocialMedia;
