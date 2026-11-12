// Use memoization for tax calculations to improve performance
const taxCalculationCache = new Map();

export const calculateOldTax = (amount, threshold = 100000) => {
  // Check if calculation already exists in cache
  const cacheKey = `old_${amount}_${threshold}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }
  
  if (amount <= threshold) {
    const result = { total: 0, details: [] };
    taxCalculationCache.set(cacheKey, result);
    return result;
  }

  let details = [{ tax: 0, from: 0, to: threshold }];
  let incomeAmount = amount - threshold;
  let rate = 6;
  let slot = 41666.6666667;
  let taxableAmount = 0;
  let currentPosition = threshold;

  while (incomeAmount > 0) {
    if (incomeAmount > slot) {
      const exactTax = (slot * rate) / 100;
      taxableAmount += exactTax;
      
      details.push({
        tax: Math.round(exactTax),
        from: Math.round(currentPosition),
        to: Math.round(currentPosition + slot),
        rate
      });
      
      currentPosition += slot;
      incomeAmount -= slot;
      rate = rate < 36 ? rate + 6 : rate;
      
      if (rate === 36 && incomeAmount > 0) {
        const finalTax = (incomeAmount * rate) / 100;
        taxableAmount += finalTax;
        details.push({
          tax: Math.round(finalTax),
          from: Math.round(currentPosition),
          to: Math.round(amount),
          rate
        });
        break;
      }
    } else {
      const exactTax = (incomeAmount * rate) / 100;
      taxableAmount += exactTax;
      details.push({
        tax: Math.round(exactTax),
        from: Math.round(currentPosition),
        to: Math.round(currentPosition + incomeAmount),
        rate
      });
      incomeAmount = 0;
    }
  }

  const result = {
    total: Math.round(taxableAmount),
    details
  };
  
  // Store the result in the cache
  taxCalculationCache.set(cacheKey, result);
  
  return result;
};

// Current official tax calculation based on Amendment Act No. 02 of 2025 (Effective April 1, 2025)
export const calculateNewTax = (amount, threshold = 150000) => {
  // Check if calculation already exists in cache
  const cacheKey = `new_${amount}_${threshold}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }
  
  // Convert monthly amount to annual
  const annualAmount = amount * 12;
  
  // Official tax-free threshold is Rs. 1,800,000 annually (Rs. 150,000 monthly)
  if (annualAmount <= 1800000) {
    const result = { 
      total: 0, 
      details: [{
        tax: 0, 
        from: 0, 
        to: annualAmount, 
        rate: 0,
        description: "Tax-free threshold"
      }],
      annual: 0,
      taxFreeAmount: 1800000,
      isProposed: false
    };
    taxCalculationCache.set(cacheKey, result);
    return result;
  }
  
  const taxableAmount = annualAmount - 1800000;
  let totalTax = 0;
  let details = [{ 
    tax: 0, 
    from: 0, 
    to: 1800000, 
    rate: 0, 
    description: "Tax-free threshold"
  }];
  let remainingAmount = taxableAmount;
  let currentPosition = 1800000;
  
  // Bracket 1: Up to Rs. 1,000,000 at 6%
  if (remainingAmount > 0) {
    const bracket1Amount = Math.min(remainingAmount, 1000000);
    const taxBracket1 = bracket1Amount * 0.06;
    totalTax += taxBracket1;
    
    details.push({
      tax: Math.round(taxBracket1),
      from: currentPosition,
      to: currentPosition + bracket1Amount,
      rate: 6,
      description: "Up to Rs. 1,000,000: 6%"
    });
    
    currentPosition += bracket1Amount;
    remainingAmount -= bracket1Amount;
  }
  
  // Bracket 2: Rs. 1,000,001 to Rs. 1,500,000 at 18%
  if (remainingAmount > 0) {
    const bracket2Amount = Math.min(remainingAmount, 500000);
    const taxBracket2 = bracket2Amount * 0.18;
    totalTax += taxBracket2;
    
    details.push({
      tax: Math.round(taxBracket2),
      from: currentPosition,
      to: currentPosition + bracket2Amount,
      rate: 18,
      description: "Rs. 1,000,001 to Rs. 1,500,000: 18%"
    });
    
    currentPosition += bracket2Amount;
    remainingAmount -= bracket2Amount;
  }
  
  // Bracket 3: Rs. 1,500,001 to Rs. 2,000,000 at 24%
  if (remainingAmount > 0) {
    const bracket3Amount = Math.min(remainingAmount, 500000);
    const taxBracket3 = bracket3Amount * 0.24;
    totalTax += taxBracket3;
    
    details.push({
      tax: Math.round(taxBracket3),
      from: currentPosition,
      to: currentPosition + bracket3Amount,
      rate: 24,
      description: "Rs. 1,500,001 to Rs. 2,000,000: 24%"
    });
    
    currentPosition += bracket3Amount;
    remainingAmount -= bracket3Amount;
  }
  
  // Bracket 4: Rs. 2,000,001 to Rs. 2,500,000 at 30%
  if (remainingAmount > 0) {
    const bracket4Amount = Math.min(remainingAmount, 500000);
    const taxBracket4 = bracket4Amount * 0.30;
    totalTax += taxBracket4;
    
    details.push({
      tax: Math.round(taxBracket4),
      from: currentPosition,
      to: currentPosition + bracket4Amount,
      rate: 30,
      description: "Rs. 2,000,001 to Rs. 2,500,000: 30%"
    });
    
    currentPosition += bracket4Amount;
    remainingAmount -= bracket4Amount;
  }
  
  // Bracket 5: Over Rs. 2,500,000 at 36%
  if (remainingAmount > 0) {
    const taxBracket5 = remainingAmount * 0.36;
    totalTax += taxBracket5;
    
    details.push({
      tax: Math.round(taxBracket5),
      from: currentPosition,
      to: currentPosition + remainingAmount,
      rate: 36,
      description: "Over Rs. 2,500,000: 36%"
    });
  }

  // Calculate monthly tax
  const monthlyTax = totalTax / 12;
  
  const result = {
    total: Math.round(monthlyTax),
    details,
    annual: Math.round(totalTax),
    taxFreeAmount: 1800000,
    isProposed: false
  };
  
  // Store result in cache
  taxCalculationCache.set(cacheKey, result);
  
  return result;
};

// Current official foreign remittance tax calculation (150k threshold)
export const calculateForeignRemittanceTax = (amount, threshold = 150000) => {
  // Check if calculation already exists in cache
  const cacheKey = `foreign_${amount}_${threshold}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }
  
  // Convert monthly amount to annual
  const annualAmount = amount * 12;
  
  // Tax-free threshold is Rs. 1,800,000
  if (annualAmount <= 1800000) {
    const result = { 
      total: 0, 
      details: [{
        tax: 0, 
        from: 0, 
        to: annualAmount, 
        rate: 0,
        description: "Tax-free threshold"
      }],
      annual: 0,
      taxFreeAmount: 1800000,
      isForeignRemittance: true,
      isProposed: false
    };
    taxCalculationCache.set(cacheKey, result);
    return result;
  }
  
  const taxableAmount = annualAmount - 1800000;
  let totalTax = 0;
  let details = [{ 
    tax: 0, 
    from: 0, 
    to: 1800000, 
    rate: 0, 
    description: "Tax-free threshold"
  }];
  let remainingAmount = taxableAmount;
  let currentPosition = 1800000;
  
  // Bracket 1: First Rs. 1,000,000 after tax-free amount at 6%
  if (remainingAmount > 0) {
    const bracket1Amount = Math.min(remainingAmount, 1000000);
    const taxBracket1 = bracket1Amount * 0.06;
    totalTax += taxBracket1;
    
    details.push({
      tax: Math.round(taxBracket1),
      from: currentPosition,
      to: currentPosition + bracket1Amount,
      rate: 6,
      description: "Up to Rs. 1,000,000: 6%"
    });
    
    currentPosition += bracket1Amount;
    remainingAmount -= bracket1Amount;
  }
  
  // Bracket 2: Any amount over that at 15%
  if (remainingAmount > 0) {
    const taxBracket2 = remainingAmount * 0.15;
    totalTax += taxBracket2;
    
    details.push({
      tax: Math.round(taxBracket2),
      from: currentPosition,
      to: currentPosition + remainingAmount,
      rate: 15,
      description: "Over Rs. 1,000,000: 15%"
    });
  }

  // Calculate monthly tax
  const monthlyTax = totalTax / 12;
  
  const result = {
    total: Math.round(monthlyTax),
    details,
    annual: Math.round(totalTax),
    taxFreeAmount: 1800000,
    isForeignRemittance: true,
    isProposed: false
  };
  
  // Store result in cache
  taxCalculationCache.set(cacheKey, result);
  
  return result;
};

// Newly Proposed Budget 2027 Tax Calculation (Announced Nov 12, 2026)
// Annual Tax-free: Rs. 1,950,000 (Monthly Rs. 162,500)
// First Rs. 850,000 @ 6%
// Next Rs. 600,000 @ 12%
// Next Rs. 600,000 @ 18%
// Next Rs. 600,000 @ 24%
// Next Rs. 600,000 @ 30%
// Over Rs. 5,200,000 @ 36%
export const calculateProposedTax = (amount, threshold = 162500) => {
  const cacheKey = `proposed_${amount}_${threshold}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }

  const annualAmount = amount * 12;
  const annualThreshold = 1950000; // Rs. 162,500 * 12

  if (annualAmount <= annualThreshold) {
    const result = {
      total: 0,
      details: [{
        tax: 0,
        from: 0,
        to: annualAmount,
        rate: 0,
        description: "Tax-free threshold (Proposed Budget 2027)"
      }],
      annual: 0,
      taxFreeAmount: annualThreshold,
      isProposed: true
    };
    taxCalculationCache.set(cacheKey, result);
    return result;
  }

  const taxableAmount = annualAmount - annualThreshold;
  let totalTax = 0;
  let details = [{
    tax: 0,
    from: 0,
    to: annualThreshold,
    rate: 0,
    description: "Tax-free threshold (Proposed Budget 2027)"
  }];
  let remainingAmount = taxableAmount;
  let currentPosition = annualThreshold;

  // Bracket 1: First Rs. 850,000 at 6% (Monthly equivalent: Rs. 162,500.01 - Rs. 233,333.33)
  if (remainingAmount > 0) {
    const bracket1Amount = Math.min(remainingAmount, 850000);
    const taxBracket1 = bracket1Amount * 0.06;
    totalTax += taxBracket1;

    details.push({
      tax: Math.round(taxBracket1),
      from: currentPosition,
      to: currentPosition + bracket1Amount,
      rate: 6,
      description: "First Rs. 850,000: 6% (Rs. 162,500 - Rs. 233,333/mo)"
    });

    currentPosition += bracket1Amount;
    remainingAmount -= bracket1Amount;
  }

  // Bracket 2: Next Rs. 600,000 at 12% (Monthly equivalent: Rs. 233,333.34 - Rs. 283,333.33)
  if (remainingAmount > 0) {
    const bracket2Amount = Math.min(remainingAmount, 600000);
    const taxBracket2 = bracket2Amount * 0.12;
    totalTax += taxBracket2;

    details.push({
      tax: Math.round(taxBracket2),
      from: currentPosition,
      to: currentPosition + bracket2Amount,
      rate: 12,
      description: "Next Rs. 600,000: 12% (Rs. 233,333 - Rs. 283,333/mo)"
    });

    currentPosition += bracket2Amount;
    remainingAmount -= bracket2Amount;
  }

  // Bracket 3: Next Rs. 600,000 at 18% (Monthly equivalent: Rs. 283,333.34 - Rs. 333,333.33)
  if (remainingAmount > 0) {
    const bracket3Amount = Math.min(remainingAmount, 600000);
    const taxBracket3 = bracket3Amount * 0.18;
    totalTax += taxBracket3;

    details.push({
      tax: Math.round(taxBracket3),
      from: currentPosition,
      to: currentPosition + bracket3Amount,
      rate: 18,
      description: "Next Rs. 600,000: 18% (Rs. 283,333 - Rs. 333,333/mo)"
    });

    currentPosition += bracket3Amount;
    remainingAmount -= bracket3Amount;
  }

  // Bracket 4: Next Rs. 600,000 at 24% (Monthly equivalent: Rs. 333,333.34 - Rs. 383,333.33)
  if (remainingAmount > 0) {
    const bracket4Amount = Math.min(remainingAmount, 600000);
    const taxBracket4 = bracket4Amount * 0.24;
    totalTax += taxBracket4;

    details.push({
      tax: Math.round(taxBracket4),
      from: currentPosition,
      to: currentPosition + bracket4Amount,
      rate: 24,
      description: "Next Rs. 600,000: 24% (Rs. 333,333 - Rs. 383,333/mo)"
    });

    currentPosition += bracket4Amount;
    remainingAmount -= bracket4Amount;
  }

  // Bracket 5: Next Rs. 600,000 at 30% (Monthly equivalent: Rs. 383,333.34 - Rs. 433,333.33)
  if (remainingAmount > 0) {
    const bracket5Amount = Math.min(remainingAmount, 600000);
    const taxBracket5 = bracket5Amount * 0.30;
    totalTax += taxBracket5;

    details.push({
      tax: Math.round(taxBracket5),
      from: currentPosition,
      to: currentPosition + bracket5Amount,
      rate: 30,
      description: "Next Rs. 600,000: 30% (Rs. 383,333 - Rs. 433,333/mo)"
    });

    currentPosition += bracket5Amount;
    remainingAmount -= bracket5Amount;
  }

  // Bracket 6: Balance over Rs. 5,200,000 at 36% (Monthly equivalent: Above Rs. 433,333.33)
  if (remainingAmount > 0) {
    const taxBracket6 = remainingAmount * 0.36;
    totalTax += taxBracket6;

    details.push({
      tax: Math.round(taxBracket6),
      from: currentPosition,
      to: currentPosition + remainingAmount,
      rate: 36,
      description: "Over Rs. 5,200,000: 36% (Above Rs. 433,333/mo)"
    });
  }

  const monthlyTax = totalTax / 12;

  const result = {
    total: Math.round(monthlyTax),
    details,
    annual: Math.round(totalTax),
    taxFreeAmount: annualThreshold,
    isProposed: true
  };

  taxCalculationCache.set(cacheKey, result);
  return result;
};

// Newly Proposed Foreign Remittance Tax Calculation (Budget 2027)
export const calculateProposedForeignRemittanceTax = (amount, threshold = 162500) => {
  const cacheKey = `proposed_foreign_${amount}_${threshold}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }

  const annualAmount = amount * 12;
  const annualThreshold = 1950000;

  if (annualAmount <= annualThreshold) {
    const result = {
      total: 0,
      details: [{
        tax: 0,
        from: 0,
        to: annualAmount,
        rate: 0,
        description: "Tax-free threshold (Proposed Budget 2027)"
      }],
      annual: 0,
      taxFreeAmount: annualThreshold,
      isForeignRemittance: true,
      isProposed: true
    };
    taxCalculationCache.set(cacheKey, result);
    return result;
  }

  const taxableAmount = annualAmount - annualThreshold;
  let totalTax = 0;
  let details = [{
    tax: 0,
    from: 0,
    to: annualThreshold,
    rate: 0,
    description: "Tax-free threshold (Proposed Budget 2027)"
  }];
  let remainingAmount = taxableAmount;
  let currentPosition = annualThreshold;

  // Bracket 1: First Rs. 850,000 at 6%
  if (remainingAmount > 0) {
    const bracket1Amount = Math.min(remainingAmount, 850000);
    const taxBracket1 = bracket1Amount * 0.06;
    totalTax += taxBracket1;

    details.push({
      tax: Math.round(taxBracket1),
      from: currentPosition,
      to: currentPosition + bracket1Amount,
      rate: 6,
      description: "First Rs. 850,000: 6% (Rs. 162,500 - Rs. 233,333/mo)"
    });

    currentPosition += bracket1Amount;
    remainingAmount -= bracket1Amount;
  }

  // Bracket 2: Any amount over that at 15%
  if (remainingAmount > 0) {
    const taxBracket2 = remainingAmount * 0.15;
    totalTax += taxBracket2;

    details.push({
      tax: Math.round(taxBracket2),
      from: currentPosition,
      to: currentPosition + remainingAmount,
      rate: 15,
      description: "Over Rs. 850,000: 15%"
    });
  }

  const monthlyTax = totalTax / 12;

  const result = {
    total: Math.round(monthlyTax),
    details,
    annual: Math.round(totalTax),
    taxFreeAmount: annualThreshold,
    isForeignRemittance: true,
    isProposed: true
  };

  taxCalculationCache.set(cacheKey, result);
  return result;
};

// Bonus tax calculation supporting both official and proposed calculations
export const calculateBonusTax = (monthlySalary, bonusAmount, isForeignRemittance = false, isProposed = false) => {
  const cacheKey = `bonus_${monthlySalary}_${bonusAmount}_${isForeignRemittance}_${isProposed}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }
  
  const annualSalary = monthlySalary * 12;
  const totalAnnualIncome = annualSalary + bonusAmount;
  
  let totalAnnualTax;
  let salaryOnlyTax;

  if (isProposed) {
    if (isForeignRemittance) {
      totalAnnualTax = calculateProposedForeignRemittanceTax(totalAnnualIncome / 12, 162500).annual;
      salaryOnlyTax = calculateProposedForeignRemittanceTax(monthlySalary, 162500).annual;
    } else {
      totalAnnualTax = calculateProposedTax(totalAnnualIncome / 12, 162500).annual;
      salaryOnlyTax = calculateProposedTax(monthlySalary, 162500).annual;
    }
  } else {
    if (isForeignRemittance) {
      totalAnnualTax = calculateForeignRemittanceTax(totalAnnualIncome / 12, 150000).annual;
      salaryOnlyTax = calculateForeignRemittanceTax(monthlySalary, 150000).annual;
    } else {
      totalAnnualTax = calculateNewTax(totalAnnualIncome / 12, 150000).annual;
      salaryOnlyTax = calculateNewTax(monthlySalary, 150000).annual;
    }
  }
  
  const bonusTax = totalAnnualTax - salaryOnlyTax;
  const effectiveTaxRate = bonusAmount > 0 ? (bonusTax / bonusAmount) * 100 : 0;
  
  const result = {
    bonusTax: Math.round(bonusTax),
    totalAnnualIncome,
    totalAnnualTax: Math.round(totalAnnualTax),
    salaryOnlyTax: Math.round(salaryOnlyTax),
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    bonusAmount,
    isProposed
  };
  
  taxCalculationCache.set(cacheKey, result);
  return result;
};
