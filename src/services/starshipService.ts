import type { Ship } from '@/components/models/ship.model';
import type { ShipWord } from '@/components/models/ship-word.model';
import axios from 'axios';

export const fetchShips = async (url: string) => {
  try {
    const response = await axios.get(url);
    const results = response.data.results;
    const shipsList: ShipWord[] = results.map((ship: Ship) => ({
      word: ship.name,
      ship: ship,
      progress: Array(ship.name.length).fill(null),
      isMatching: false,
      completed: false,
    }));

    return {
      shipsList: shipsList.sort((a: any, b: any) => a.word.length - b.word.length),
      nextPage: response.data.next,
    };
  } catch (error) {
    console.error('Error fetching starships:', error);
    return {
      shipsList: [],
      nextPage: null,
    };
  }
};
