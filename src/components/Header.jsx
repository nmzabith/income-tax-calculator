import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Chip,
} from "@mui/material";
import { Calculator, TrendingUp, Shield, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background:
            "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)",
          mb: 4,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              py: 3,
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Calculator size={32} color="white" />
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    textAlign: "center",
                    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    mb: 0.5,
                  }}
                >
                  Sri Lanka Income Tax Calculator
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.95)",
                    textAlign: "center",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Sparkles size={16} />
                  Official 2025/2026 Rates & Proposed Budget 2027 Relief
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Feature highlights banner */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            borderRadius: 3,
            border: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Chip
              icon={<Sparkles size={16} />}
              label="NEW: Budget 2027 Relief"
              variant="filled"
              sx={{
                background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
                color: "white",
                fontWeight: 600,
                px: 1,
              }}
            />
            <Chip
              icon={<TrendingUp size={16} />}
              label="Official 2025/2026 Rates"
              variant="filled"
              sx={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                fontWeight: 600,
                px: 1,
              }}
            />
            <Chip
              icon={<Shield size={16} />}
              label="Inland Revenue Compliant"
              variant="outlined"
              sx={{
                borderColor: "#4f46e5",
                color: "#4f46e5",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(79, 70, 229, 0.04)",
                },
              }}
            />
            <Chip
              icon={<Calculator size={16} />}
              label="Instant Side-by-Side Comparison"
              variant="outlined"
              sx={{
                borderColor: "#7c3aed",
                color: "#7c3aed",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(124, 58, 237, 0.04)",
                },
              }}
            />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Header;
