import axios from 'axios';
import { API_URL } from './apiUrl';

export const getAllFilms = async () => {
  const { data } = await axios.get(`${API_URL}/films`);
  return data;
};
