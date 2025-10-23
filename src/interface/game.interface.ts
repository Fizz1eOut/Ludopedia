export interface BaseEntity {
  id?: number
  name: string
}

export interface GameCover {
  id?: number
  url: string
}

export interface GameVideo {
  id?: number
  video_id: string
}

export interface GameScreenshots {
  id?: number
  url: string
}

export type GameGenre = BaseEntity;
export type GameCompany = BaseEntity;
export type GamePlatform = BaseEntity;
export type GameModes = BaseEntity;

export interface InvolvedCompany {
  id: number
  company: GameCompany
  developer: boolean
  publisher: boolean
}

export interface GameResponse {
  id: number;
  name: string;
  cover?: GameCover;
  first_release_date?: number;
  game_modes?: readonly GameModes[];
  genres?: readonly GameGenre[];
  involved_companies?: readonly InvolvedCompany[];
  platforms?: readonly GamePlatform[];
  videos?: readonly GameVideo[];
  screenshots?: readonly GameScreenshots[];
  rating?: number;
  aggregated_rating?: number;
  summary?: string;
}

