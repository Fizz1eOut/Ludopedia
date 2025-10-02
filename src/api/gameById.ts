import { fetchData } from '@/modules/http';
import type { GameResponse } from '@/interface/game.interface';

const baseUrl = import.meta.env.VITE_PROXY_URL;

export const getGameById = async (gameId: string | number): Promise<GameResponse | null> => {
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
      videos.video_id,
      game_modes.name;
    where id = ${gameId};
    limit 1;
  `.trim();

  const headers = {
    'Content-Type': 'text/plain',
    'Accept': 'application/json',
  };

  const result = await fetchData<GameResponse[]>(`${baseUrl}/games`, {
    method: 'POST',
    headers,
    body: queryBody,
  });

  return result.length > 0 ? result[0] : null;
};
