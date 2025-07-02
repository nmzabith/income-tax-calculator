import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { DollarSign, TrendingUp, Calendar, Sparkles } from "lucide-react";

const InputCard = ({
  income,
  isForeignRemittance,
  currency,
  isLoading,
  exchangeRate,
  onMonthlyAmountChange,
  onAnnualAmountChange,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid rgba(79, 70, 229, 0.1)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          background:
            "linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
          borderRadius: "0 0 0 100px",
        },
      }}
    >
      <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              mr: 2,
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            }}
          >
            <DollarSign size={24} color="white" />
          </Box>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}
            >
              Income Details
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Sparkles size={14} />
              Enter your salary information
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4, opacity: 0.2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Calendar size={16} />
                Monthly Salary
              </Typography>
              <TextField
                id="monthly-salary-input"
                label={`Monthly ${
                  isForeignRemittance && currency === "USD"
                    ? "Salary in USD"
                    : "Salary"
                }`}
                variant="outlined"
                value={income.monthly !== 0 ? income.monthly : ""}
                onChange={onMonthlyAmountChange}
                fullWidth
                type="number"
                aria-label="Monthly Salary Input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <DollarSign
                          size={18}
                          style={{ color: "text.secondary" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {isForeignRemittance ? currency : "රු"}
                        </Typography>
                      </Box>
                    </InputAdornment>
                  ),
                  endAdornment: isLoading ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} aria-label="Loading" />
                    </InputAdornment>
                  ) : null,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 500, color: "text.secondary" }}
              >
                Annual Salary
              </Typography>
              <TextField
                id="annual-salary-input"
                label={`Annual ${
                  isForeignRemittance && currency === "USD"
                    ? "Salary in USD"
                    : "Salary"
                }`}
                variant="outlined"
                value={income.annualy !== 0 ? income.annualy : ""}
                onChange={onAnnualAmountChange}
                fullWidth
                type="number"
                aria-label="Annual Salary Input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <TrendingUp
                          sx={{ fontSize: 18, color: "text.secondary" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {isForeignRemittance ? currency : "LKR"}
                        </Typography>
                      </Box>
                    </InputAdornment>
                  ),
                  endAdornment: isLoading ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} aria-label="Loading" />
                    </InputAdornment>
                  ) : null,
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Currency conversion info */}
        {isForeignRemittance &&
          currency === "USD" &&
          exchangeRate &&
          !isLoading &&
          income.convertedMonthly > 0 && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(33, 150, 243, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "info.main" }}
              >
                💱 Currency Conversion
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                Equivalent in LKR: Monthly{" "}
                {Math.round(income.convertedMonthly).toLocaleString()} LKR,
                Annual{" "}
                {Math.round(income.convertedMonthly * 12).toLocaleString()} LKR
              </Typography>
            </Box>
          )}
      </CardContent>
    </Card>
  );
};

export default InputCard;
