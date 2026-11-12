import React from "react";
import {
  Paper,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Chip,
  Alert,
} from "@mui/material";
import { Sparkles, TrendingDown, CheckCircle2 } from "lucide-react";

const ProposedTaxBanner = ({ isProposedTax, onProposedTaxToggle }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: isProposedTax ? "2px solid #10b981" : "1px solid #cbd5e1",
        background: isProposedTax
          ? "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        transition: "all 0.25s ease-in-out",
        boxShadow: isProposedTax
          ? "0 4px 16px rgba(16, 185, 129, 0.18)"
          : "0 2px 6px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexWrap: "wrap",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Chip
            icon={<Sparkles size={16} />}
            label="NEW TAX UPDATE TODAY"
            size="small"
            color="success"
            sx={{
              fontWeight: 700,
              fontSize: "0.75rem",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
            }}
          />
          <Chip
            label="Budget 2027 Proposals (Nov 12, 2026)"
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, borderColor: "#10b981", color: "#047857" }}
          />
        </Box>

        {isProposedTax && (
          <Chip
            icon={<CheckCircle2 size={16} />}
            label="Proposed Calculation Active"
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "300px" } }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isProposedTax}
                onChange={(e) => onProposedTaxToggle(e.target.checked)}
                color="success"
                id="calculate-proposed-tax-checkbox"
                inputProps={{ "aria-label": "Calculate with new proposed Budget 2027 tax rates" }}
                sx={{
                  color: "#059669",
                  "&.Mui-checked": {
                    color: "#059669",
                  },
                  "& .MuiSvgIcon-root": { fontSize: 30 },
                  mr: 1,
                }}
              />
            }
            label={
              <Box>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{
                    fontWeight: 700,
                    color: isProposedTax ? "#065f46" : "text.primary",
                    fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    display: "block",
                  }}
                >
                  Tick here to calculate with newly proposed Budget 2027 tax rates
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{
                    color: isProposedTax ? "#047857" : "text.secondary",
                    fontSize: "0.85rem",
                    display: "block",
                    mt: 0.25,
                  }}
                >
                  Includes higher <strong>Rs. 162,500/mo</strong> tax-free allowance, new <strong>12% bracket</strong>, and monthly tax relief up to <strong>Rs. 15,750</strong>.
                </Typography>
              </Box>
            }
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: isProposedTax ? "rgba(16, 185, 129, 0.12)" : "rgba(241, 245, 249, 0.8)",
            p: 1.5,
            borderRadius: 2,
            border: isProposedTax ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid #e2e8f0",
          }}
        >
          <TrendingDown size={22} style={{ color: "#059669" }} />
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              Expected Monthly Relief
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#065f46" }}>
              Rs. 750 – Rs. 15,750
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProposedTaxBanner;
