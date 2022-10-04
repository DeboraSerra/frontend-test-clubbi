import axios from 'axios';
import { API_URL } from './apiUrl';

export const getAllSpecies = async () => {
  const { data } = await axios.get(`${API_URL}/species`);
  return data;
};
