import axios from 'axios';
import { API_URL } from './apiUrl';

export const getAllVehicle = async () => {
  const { data } = await axios.get(`${API_URL}/vehicle`);
  return data;
};
