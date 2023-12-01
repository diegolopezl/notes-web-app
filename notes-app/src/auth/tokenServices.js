import axios from "axios";
const TOKEN_KEY = "token";

export const setAccessToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.log("No refresh token provided.");
      return null;
    }

    const response = await axios.post("http://localhost:5000/refresh-token", {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;

    // Update the stored access token with the new one
    localStorage.setItem(TOKEN_KEY, newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh error:", error);
    // Handle the error as needed
    return null;
  }
};
