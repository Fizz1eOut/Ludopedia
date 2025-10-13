import { fetchData } from '@/modules/http';

const baseUrl = import.meta.env.VITE_PROXY_URL;

export interface Platform {
  id: number;
  name: string;
}

export const getPlatforms = async (): Promise<Platform[]> => {
  const queryBody = `
    fields id, name;
    sort name asc;
    limit 200;
  `.trim();

  const headers = {
    'Content-Type': 'text/plain',
    'Accept': 'application/json',
  };

  try {
    return await fetchData<Platform[]>(`${baseUrl}/platforms`, {
      method: 'POST',
      headers,
      body: queryBody,
    });
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw new Error('Failed to fetch platforms');
  }
};
