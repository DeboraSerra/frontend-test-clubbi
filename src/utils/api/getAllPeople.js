import axios from 'axios';
import { API_URL } from './apiUrl';

export const getAllPeople = async () => {
  const { data } = await axios.get(`${API_URL}/people`);
  return data;
};
