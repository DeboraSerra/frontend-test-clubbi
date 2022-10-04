import axios from 'axios';
import { API_URL } from './apiUrl';

export const getOneFilm = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/films/${id}`);
  return data;
};
