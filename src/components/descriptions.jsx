import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Alert, Paper } from "@mui/material";
import Chip from "@mui/material/Chip";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

class Description extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <Grid item xs={12} mt={{ xs: 1, sm: 2 }}>
        <Alert
          severity="info"
          icon={<Info size={20} />}
          sx={{
            mb: 2,
            borderRadius: "0.5rem",
            backgroundColor: "rgba(59, 130, 246, 0.08)",
            border: "1px solid rgba(59, 130, 246, 0.16)",
            ".MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#1e40af",
                fontWeight: 600,
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                lineHeight: { xs: 1.4, sm: 1.6 },
              }}
            >
              <strong>Official Tax Update for 2025/2026:</strong> The new tax
              amendments have been approved in parliament and are now in effect.
              This calculation uses the official tax rates for the 2025/2026
              financial year. For complete details and official documentation,
              refer to the Inland Revenue Department
              <Chip
                label="IRD"
                size="small"
                style={{
                  margin: "2px",
                  backgroundColor: "rgba(59, 130, 246, 0.16)",
                }}
                component="a"
                href="http://www.ird.gov.lk/en/publications/sitepages/apit_tax_tables.aspx?menuid=1503"
                clickable
                aria-label="Visit IRD website"
              />
            </Typography>
          </Box>
        </Alert>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: "0.5rem",
            border: "1px solid rgba(220, 38, 38, 0.16)",
            backgroundColor: "rgba(220, 38, 38, 0.04)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <AlertTriangle
              size={18}
              style={{ color: "#dc2626", marginTop: "2px" }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#b91c1c",
                fontWeight: 500,
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                lineHeight: { xs: 1.4, sm: 1.6 },
              }}
            >
              <strong>2025/2026 Tax Structure:</strong> Tax free threshold is රු
              150,000 per month. First 6% tax slab applies up to රු 1 Million.
              The 12% tax bracket has been removed, and subsequent tax rates
              continue at 6% increments (18% → 24% → 30% → 36%). If you receive
              annual bonuses, tax will be calculated on that month when you
              receive bonus. Use Other Income to calculate tax applied with
              different rates such as Tax on Rent, Tax on Interest Income.
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: "0.5rem",
            border: "1px solid rgba(22, 163, 74, 0.16)",
            backgroundColor: "rgba(22, 163, 74, 0.04)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <CheckCircle2
              size={18}
              style={{ color: "#16a34a", marginTop: "2px" }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#166534",
                fontWeight: 500,
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                lineHeight: { xs: 1.4, sm: 1.6 },
              }}
            >
              <strong>About This Sri Lanka Income Tax Calculator:</strong> This
              free online tool helps you calculate your PAYE (Pay As You Earn)
              tax liability in Sri Lanka based on the latest tax regulations for
              2025/2026. The calculator supports both standard Sri Lankan income
              tax calculation and foreign remittance tax calculations, allowing
              you to estimate your tax obligations accurately.
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "0.5rem",
            border: "1px solid rgba(100, 116, 139, 0.16)",
            backgroundColor: "rgba(100, 116, 139, 0.04)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Info size={18} style={{ color: "#64748b", marginTop: "2px" }} />
            <Typography
              variant="body2"
              sx={{
                color: "#334155",
                fontWeight: 500,
                fontSize: { xs: "0.875rem", sm: "0.875rem" },
                lineHeight: { xs: 1.4, sm: 1.6 },
              }}
            >
              <strong>How to Use:</strong> Simply enter your monthly or annual
              salary, choose between standard income or foreign remittance
              income, and the calculator will instantly show your tax liability.
              You can also add other income sources with different tax rates.
            </Typography>
          </Box>
        </Paper>
      </Grid>
    );
  }
}

export default Description;
