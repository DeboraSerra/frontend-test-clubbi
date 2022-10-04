import axios from 'axios';
import { API_URL } from './apiUrl';

export const getAllLocations = async () => {
  const { data } = await axios.get(`${API_URL}/locations`);
  return data;
};
