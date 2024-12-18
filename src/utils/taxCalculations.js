export const calculateOldTax = (amount, threshold) => {
  if (amount <= threshold) {
    return { total: 0, details: [] };
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

  return {
    total: Math.round(taxableAmount),
    details
  };
};

export const calculateNewTax = (amount, threshold) => {
  if (amount <= threshold) {
    return { total: 0, details: [] };
  }

  let details = [{ tax: 0, from: 0, to: threshold }];
  let incomeAmount = amount - threshold;
  let rate = 6;
  let slot = 41666.6666667;
  let sixPercentSlot = 83333.33333334;
  let taxableAmount = 0;
  let currentPosition = threshold;

  // First 6% bracket handling
  if (incomeAmount > sixPercentSlot) {
    const exactTax = (sixPercentSlot * rate) / 100;
    taxableAmount += exactTax;
    details.push({
      tax: Math.round(exactTax),
      from: Math.round(currentPosition),
      to: Math.round(currentPosition + sixPercentSlot),
      rate
    });
    currentPosition += sixPercentSlot;
    incomeAmount -= sixPercentSlot;
    rate = 18;
  } else {
    const exactTax = (incomeAmount * rate) / 100;
    taxableAmount += exactTax;
    details.push({
      tax: Math.round(exactTax),
      from: Math.round(currentPosition),
      to: Math.round(currentPosition + incomeAmount),
      rate
    });
    return {
      total: Math.round(taxableAmount),
      details
    };
  }

  // Handle remaining brackets
  while (incomeAmount > 0) {
    if (rate >= 36) {
      // Calculate entire remaining amount at 36%
      const finalTax = (incomeAmount * 36) / 100;
      taxableAmount += finalTax;
      details.push({
        tax: Math.round(finalTax),
        from: Math.round(currentPosition),
        to: Math.round(amount),
        rate: 36
      });
      break;
    }

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
      rate += 6;
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

  return {
    total: Math.round(taxableAmount),
    details
  };
};
