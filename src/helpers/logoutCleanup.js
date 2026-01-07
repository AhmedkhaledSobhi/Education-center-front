
/**
 * Delete a cookie by name
 */
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const clearAllCookies = () => {
  // OTP verification cookies
  deleteCookie("otpSent");
  deleteCookie("resendTimer");
  deleteCookie("verificationType");
  deleteCookie("verificationValue");
};

/**
 * Full application logout cleanup.
 * Clears ALL storage, cookies, and in-memory caches.
 * Use for: User logout, Main API 401, AI Accountant 401
 */
export const performLogoutCleanup = () => {

  // Clear all storage
  localStorage.clear();
  sessionStorage.clear();

  // Clear all cookies
  clearAllCookies();
};