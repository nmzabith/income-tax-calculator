// Use memoization for tax calculations to improve performance
const taxCalculationCache = new Map();

export const calculateOldTax = (amount, threshold) => {
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

// Update the new tax calculation based on the official amendment from March 20, 2025
export const calculateNewTax = (amount, threshold = 150000) => {
  // Check if calculation already exists in cache
  const cacheKey = `new_${amount}_${threshold}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }
  
  // Convert monthly amount to annual
  const annualAmount = amount * 12;
  
  // New tax-free threshold is Rs. 1,800,000
  if (annualAmount <= 1800000) {
    const result = { 
      total: 0, 
      details: [{
        tax: 0,
        from: 0,
        to: annualAmount,
        rate: 0
      }],
      annual: 0,
      taxFreeAmount: annualAmount
    };
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
  
  // Apply the tax brackets according to the amendment
  
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
    taxFreeAmount: 1800000
  };
  
  // Store result in cache
  taxCalculationCache.set(cacheKey, result);
  
  return result;
};

// Add new function for foreign remittance tax calculation
export const calculateForeignRemittanceTax = (amount, threshold = 150000) => {
  // Check if calculation already exists in cache
  const cacheKey = `foreign_${amount}_${threshold}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }
  
  // Convert monthly amount to annual
  const annualAmount = amount * 12;
  
  // Tax-free threshold is Rs. 1,800,000 (same as regular tax)
  if (annualAmount <= 1800000) {
    const result = { 
      total: 0, 
      details: [{
        tax: 0,
        from: 0,
        to: annualAmount,
        rate: 0
      }],
      annual: 0,
      taxFreeAmount: 1800000
    };
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
  
  // Apply the tax brackets for foreign remittance
  
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
    isForeignRemittance: true
  };
  
  // Store result in cache
  taxCalculationCache.set(cacheKey, result);
  
  return result;
};

// Add new function for bonus tax calculation using cumulative method
export const calculateBonusTax = (monthlySalary, bonusAmount, isForeignRemittance = false) => {
  // Check if calculation already exists in cache
  const cacheKey = `bonus_${monthlySalary}_${bonusAmount}_${isForeignRemittance}`;
  if (taxCalculationCache.has(cacheKey)) {
    return taxCalculationCache.get(cacheKey);
  }
  
  // Calculate annual salary
  const annualSalary = monthlySalary * 12;
  
  // Calculate total annual income (salary + bonus)
  const totalAnnualIncome = annualSalary + bonusAmount;
  
  // Calculate tax on total annual income
  let totalAnnualTax;
  if (isForeignRemittance) {
    const result = calculateForeignRemittanceTax(totalAnnualIncome / 12, 150000);
    totalAnnualTax = result.annual;
  } else {
    const result = calculateNewTax(totalAnnualIncome / 12, 150000);
    totalAnnualTax = result.annual;
  }
  
  // Calculate tax on salary only
  let salaryOnlyTax;
  if (isForeignRemittance) {
    const result = calculateForeignRemittanceTax(monthlySalary, 150000);
    salaryOnlyTax = result.annual;
  } else {
    const result = calculateNewTax(monthlySalary, 150000);
    salaryOnlyTax = result.annual;
  }
  
  // Tax on bonus is the difference
  const bonusTax = totalAnnualTax - salaryOnlyTax;
  
  // Calculate effective tax rate on bonus
  const effectiveTaxRate = bonusAmount > 0 ? (bonusTax / bonusAmount) * 100 : 0;
  
  const result = {
    bonusTax: Math.round(bonusTax),
    totalAnnualIncome,
    totalAnnualTax: Math.round(totalAnnualTax),
    salaryOnlyTax: Math.round(salaryOnlyTax),
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    bonusAmount
  };
  
  // Store result in cache
  taxCalculationCache.set(cacheKey, result);
  
  return result;
};
