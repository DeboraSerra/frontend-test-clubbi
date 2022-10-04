import axios from 'axios';
import { API_URL } from './apiUrl';

export const getOneSpecies = async (id) => {
  const { data } = await axios.get(`${API_URL}/species/${id}`);
  return data;
};
