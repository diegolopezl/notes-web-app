import axios from "axios";

let refreshTimeoutId;

const setRefreshInterval = (callback, interval) => {
  refreshTimeoutId = setInterval(callback, interval);
};

const clearRefreshInterval = () => {
  if (refreshTimeoutId) {
    clearInterval(refreshTimeoutId);
  }
};

export const setAccessToken = (token) => {
  localStorage.setItem("token", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("token");
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/refresh-token",
      { refreshToken },
      { withCredentials: true } // Make sure to include this for cookies to work
    );

    const newAccessToken = response.data.accessToken;
    return newAccessToken;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
};

export { setRefreshInterval, clearRefreshInterval, refreshAccessToken };
