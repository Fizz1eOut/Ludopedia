import { fetchData } from '@/modules/http';
import type { GameResponse } from '@/interface/game.interface';

export const getPopularGames = async (limit: number = 10): Promise<GameResponse[]> => {
  const baseUrl = import.meta.env.VITE_PROXY_URL;

  const queryBody = `
    fields
      name,
      cover.url,
      rating,
      aggregated_rating,
      first_release_date,
      genres.name,
      platforms.name,
      involved_companies.company.name,
      involved_companies.developer,
      involved_companies.publisher,
      summary,
      videos.video_id;
    sort rating desc;
    where rating != null & cover != null;
    limit ${limit};
  `.trim();

  const headers = {
    'Content-Type': 'text/plain',
    'Accept': 'application/json',
  };

  try {
    const response = await fetchData<GameResponse[]>(baseUrl, {
      method: 'POST',
      headers,
      body: queryBody,
    });

    return response;
  } catch (error) {
    console.error('Error while fetching popular games:', error);

    if (error instanceof Error) {
      throw new Error(`Could not get popular games: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching popular games');
    }
  }
};
