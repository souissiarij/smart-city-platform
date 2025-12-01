import axios from 'axios';

const API_URL = "http://localhost:4001"; 


export const getAQI = async (zone) => {
  try {
    const response = await axios.get(`${API_URL}/aqi/${zone}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching AQI:", error);
    throw error;
  }
};
