import { fetchData } from '@/modules/http';
import type { GameResponse } from '@/interface/game.interface';

const baseUrl = import.meta.env.VITE_PROXY_URL;

interface GameFilters {
  genres?: number[];
  platforms?: number[];
  sort?: string;
  dateFrom?: number;
  dateTo?: number;
  limit?: number;
  minRating?: number;
  search?: string;
  offset?: number;
}

export const getFilteredGames = async (filters: GameFilters = {}): Promise<GameResponse[]> => {
  const {
    genres,
    platforms,
    sort = 'rating desc',
    dateFrom,
    dateTo,
    limit = 20,
    minRating,
    search,
    offset = 0,
  } = filters;

  const whereClauses: string[] = ['cover != null'];

  if (genres?.length) whereClauses.push(`genres = (${genres.join(',')})`);
  if (platforms?.length) whereClauses.push(`platforms = (${platforms.join(',')})`);
  if (dateFrom) whereClauses.push(`first_release_date >= ${dateFrom}`);
  if (dateTo) whereClauses.push(`first_release_date <= ${dateTo}`);
  if (minRating) whereClauses.push(`rating >= ${minRating}`);
  if (search) whereClauses.push(`name ~ *"${search}"*`);

  const whereClause = whereClauses.length ? `where ${whereClauses.join(' & ')};` : '';

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
    ${whereClause}
    sort ${sort};
    limit ${limit};
    offset ${offset};
  `.trim();

  return fetchData<GameResponse[]>(`${baseUrl}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Accept': 'application/json',
    },
    body: queryBody,
  });
};
