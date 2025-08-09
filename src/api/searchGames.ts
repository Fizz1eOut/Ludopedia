import { fetchData } from '@/modules/http';
 
export interface Game {
  id: number;
  name: string;
}

export const searchGames = async (
  query: string = '',
  limit: number = 20
): Promise<Game[]> => {
  if (!query.trim()) {
    return [];
  }

  const baseUrl = import.meta.env.VITE_PROXY_URL;

  const escapedQuery = query.replace(/"/g, '\\"');
    
  const searchBody = `
    search "${escapedQuery}";
    fields name, cover.url, rating;
    limit ${limit};
  `.trim();

  const headers = {
    'Content-Type': 'text/plain',
    'Accept': 'application/json',
  };

  try {
    const response = await fetchData<Game[]>(baseUrl, {
      method: 'POST',
      headers,
      body: searchBody,
    });

    return response;

  } catch (error) {
    console.error('Error while searching for games:', error);

    if (error instanceof Error) {
      throw new Error(`Could not find games: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while searching for games');
    }
  }
};
