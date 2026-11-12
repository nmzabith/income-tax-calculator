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
  isProposedTax = false,
  current2025Tax = null,
}) => {
  const isProposed = Boolean(isProposedTax || tax.isProposed);
  const effectiveThreshold = isProposed ? 162500 : 150000;

  // Comparison metrics
  const baselineTaxTotal = (isProposed && current2025Tax) ? current2025Tax.total : oldTax.total;
  const taxDifference = Math.floor(oldTax.total - tax.total);
  const additionalReliefFrom2025 = (isProposed && current2025Tax) 
    ? Math.max(0, Math.floor(current2025Tax.total - tax.total)) 
    : 0;
  
  const taxReductionPercentage = oldTax.total > 0
    ? ((taxDifference / oldTax.total) * 100).toFixed(2)
    : "100.00";
    
  const epfDeduction = totalMonthlyIncome * 0.08;
  const totalAfterTax =
    Number(totalMonthlyIncome) +
    Number(otherIncome) -
    Number(Math.floor(tax.total + otherTax));
  const incomeAfterTaxAndEpf = totalAfterTax - epfDeduction;

  if (totalMonthlyIncome <= effectiveThreshold || tax.total === 0) {
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
              Tax Calculation Results {isProposed ? "(Budget 2027 Proposed Relief)" : ""}
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
                  label={isProposed ? "Tax Free Zone (Under Rs. 162,500/mo)" : "Tax Free Zone (Under Rs. 150,000/mo)"}
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

            {isProposed && current2025Tax && current2025Tax.total > 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(16, 185, 129, 0.08)",
                    borderRadius: 2,
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#065f46", fontWeight: 600 }}>
                    ✨ Under current 2025 law you would pay <strong>රු {current2025Tax.total.toLocaleString()}</strong>/month. Under the new Budget 2027 proposal you pay <strong>රු 0</strong> (Monthly saving of <strong>රු {current2025Tax.total.toLocaleString()}</strong>).
                  </Typography>
                </Box>
              </Grid>
            )}

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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BarChart3 size={28} style={{ color: "#4f46e5", marginRight: 16 }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {isProposed ? "Tax Comparison: Budget 2027 Proposed Relief" : "Tax Comparison Results"}
            </Typography>
          </Box>
          {isProposed && (
            <Chip
              icon={<Sparkles size={16} />}
              label="Proposed 2027 Rates Active"
              color="success"
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>

        <Divider sx={{ mb: 3, opacity: 0.3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={isProposed && current2025Tax ? 4 : 6}>
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

          {isProposed && current2025Tax && (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "rgba(255, 152, 0, 0.05)",
                  borderRadius: 2,
                  border: "1px solid rgba(255, 152, 0, 0.2)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <BarChart3
                    size={20}
                    style={{ color: "#f57c00", marginRight: 8 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "#e65100" }}
                  >
                    Current Tax (150k threshold)
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#e65100" }}
                >
                  රු {Math.floor(current2025Tax.total + otherTax).toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={isProposed && current2025Tax ? 4 : 6}>
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
                  {isProposed ? "Proposed Tax (162.5k threshold)" : "New Tax (150k threshold)"}
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
                backgroundColor: isProposed ? "rgba(16, 185, 129, 0.06)" : "rgba(33, 150, 243, 0.05)",
                borderRadius: 2,
                border: isProposed ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(33, 150, 243, 0.1)",
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
                  style={{ color: isProposed ? "#059669" : "#3b82f6", marginRight: 8 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: isProposed ? "success.dark" : "info.main" }}
                >
                  {isProposed ? "Monthly Tax Savings (vs. Current 2025 Law)" : "Tax Savings"}
                </Typography>
              </Box>
              
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: isProposed ? "success.main" : "info.main", mb: 1 }}
              >
                රු {isProposed ? additionalReliefFrom2025.toLocaleString() : taxDifference.toLocaleString()}
              </Typography>

              <Chip
                label={isProposed 
                  ? `Additional Rs. ${additionalReliefFrom2025.toLocaleString()} Relief/mo (Total Rs. ${taxDifference.toLocaleString()} vs Pre-2025)` 
                  : `${taxReductionPercentage}% Reduction`}
                color={isProposed ? "success" : "info"}
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
