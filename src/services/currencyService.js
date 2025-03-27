/**
 * Service to handle currency conversion using external API
 */

// Free Currency API base URL - you'll need to register for an API key
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
let cachedRate = null;
let lastFetchTime = null;

/**
 * Get the exchange rate from USD to LKR
 * Uses caching to avoid excessive API calls (cache valid for 1 hour)
 */
export const getUsdToLkrRate = async () => {
  // Check if we have a cached rate that's less than 1 hour old
  const now = new Date();
  if (cachedRate && lastFetchTime && (now.getTime() - lastFetchTime.getTime() < 3600000)) {
    return cachedRate;
  }
  
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    
    const data = await response.json();
    cachedRate = data.rates.LKR;
    lastFetchTime = now;
    
    return cachedRate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Fallback to a reasonable default if API fails
    return 325; // Example default rate (you may want to adjust this)
  }
};

/**
 * Convert USD amount to LKR
 */
export const convertUsdToLkr = async (usdAmount) => {
  const rate = await getUsdToLkrRate();
  return usdAmount * rate;
};
