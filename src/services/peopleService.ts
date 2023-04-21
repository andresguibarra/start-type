import type { People } from '@/components/models/people.model';
import axios from 'axios';

export const fetchPeople = async (url: string): Promise<People> => {
  try {
    const response = await axios.get<People>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
};
