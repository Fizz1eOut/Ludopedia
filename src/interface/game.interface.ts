export interface Game {
  id: number;
  name: string;
  cover?: {
    url: string;
  };
  rating?: number;
}

export interface GameSearchResponse {
  results: Game[];
}
