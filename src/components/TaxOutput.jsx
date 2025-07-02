import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import {
  TrendingDown,
  Sparkles,
  PiggyBank,
  DollarSign,
  CheckCircle,
  BarChart3,
} from "lucide-react";

const TaxOutput = ({
  tax,
  oldTax,
  otherTax,
  totalMonthlyIncome,
  otherIncome,
}) => {
  const taxDifference = Math.floor(oldTax.total - tax.total);
  const taxReductionPercentage = ((taxDifference / oldTax.total) * 100).toFixed(
    2
  );
  const epfDeduction = totalMonthlyIncome * 0.08;
  const totalAfterTax =
    Number(totalMonthlyIncome) +
    Number(otherIncome) -
    Number(Math.floor(tax.total + otherTax));
  const incomeAfterTaxAndEpf = totalAfterTax - epfDeduction;

  if (totalMonthlyIncome <= 150000) {
    return (
      <Card
        elevation={0}
        sx={{
          mb: 3,
          background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
          border: "2px solid rgba(76, 175, 80, 0.3)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Alert
            severity="success"
            icon={<CheckCircle size={32} />}
            sx={{
              mb: 3,
              backgroundColor: "transparent",
              border: "none",
              "& .MuiAlert-icon": { fontSize: 32 },
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "success.main" }}
            >
              🎉 Congratulations! Your income is tax-free!
            </Typography>
          </Alert>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <DollarSign
              size={28}
              style={{ color: "#10b981", marginRight: 16 }}
            />
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Tax Calculation Results
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}
                >
                  Monthly Income
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "success.main" }}
                >
                  රු {totalMonthlyIncome.toLocaleString()}
                </Typography>
                <Chip
                  label="Tax Free Zone"
                  size="small"
                  color="success"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}
                >
                  Previous Tax Amount
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "error.main" }}
                >
                  රු {Math.floor(oldTax.total + otherTax).toLocaleString()}
                </Typography>
                <Chip
                  label="100% Reduction"
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "text.secondary" }}
                  >
                    EPF Deduction (8%)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    රු {Math.round(epfDeduction).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "text.secondary" }}
                  >
                    Net Income After EPF
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "success.main" }}
                  >
                    රු{" "}
                    {Math.round(
                      totalMonthlyIncome - epfDeduction
                    ).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f3e5f5 100%)",
        border: "1px solid rgba(156, 39, 176, 0.1)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <BarChart3 size={28} style={{ color: "#4f46e5", marginRight: 16 }} />
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            Tax Comparison Results
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, opacity: 0.3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(244, 67, 54, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(244, 67, 54, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BarChart3
                  size={20}
                  style={{ color: "#ef4444", marginRight: 8 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "error.main" }}
                >
                  Previous Tax (100k threshold)
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "error.main" }}
              >
                රු {Math.floor(oldTax.total + otherTax).toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(76, 175, 80, 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BarChart3
                  size={20}
                  style={{ color: "#10b981", marginRight: 8 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "success.main" }}
                >
                  New Tax (150k threshold)
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "success.main" }}
              >
                රු {Math.floor(tax.total + otherTax).toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(33, 150, 243, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(33, 150, 243, 0.1)",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <TrendingDown
                  size={24}
                  style={{ color: "#3b82f6", marginRight: 8 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "info.main" }}
                >
                  Tax Savings
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "info.main", mb: 1 }}
              >
                රු {taxDifference.toLocaleString()}
              </Typography>
              <Chip
                label={`${taxReductionPercentage}% Reduction`}
                color="info"
                size="large"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}
              >
                Total Monthly Income
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                රු{" "}
                {(
                  Number(totalMonthlyIncome) + Number(otherIncome)
                ).toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "text.secondary", mb: 1 }}
              >
                EPF Deduction (8%)
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                රු {Math.round(epfDeduction).toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "rgba(156, 39, 176, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(156, 39, 176, 0.1)",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <PiggyBank
                  size={24}
                  style={{ color: "#4f46e5", marginRight: 8 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "primary.main" }}
                >
                  Net Income After Tax & EPF
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                රු {Math.round(incomeAfterTaxAndEpf).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaxOutput;
