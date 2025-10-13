import { fetchData } from '@/modules/http';

const baseUrl = import.meta.env.VITE_PROXY_URL;

export interface Genre {
  id: number;
  name: string;
}

export const getGenres = async (): Promise<Genre[]> => {
  const queryBody = `
    fields id, name;
    sort name asc;
    limit 100;
  `.trim();

  const headers = {
    'Content-Type': 'text/plain',
    'Accept': 'application/json',
  };

  try {
    return await fetchData<Genre[]>(`${baseUrl}/genres`, {
      method: 'POST',
      headers,
      body: queryBody,
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres');
  }
};
