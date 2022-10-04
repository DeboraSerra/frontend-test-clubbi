import axios from 'axios';
import { API_URL } from './apiUrl';

export const getOneVehicle = async (id) => {
  const { data } = await axios.get(`${API_URL}/vehicle/${id}`);
  return data;
};
