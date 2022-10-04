import axios from 'axios';
import { API_URL } from './apiUrl';

export const getOnePerson = async (id) => {
  const { data } = await axios.get(`${API_URL}/people/${id}`);
  return data;
};
