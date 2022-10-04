import axios from 'axios';
import { API_URL } from './apiUrl';

export const getOneLocation = async (id) => {
  const { data } = await axios.get(`${API_URL}/locations/${id}`);
  return data;
};
