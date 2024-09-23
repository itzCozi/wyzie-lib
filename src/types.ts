export interface SearchSubtitlesParams {
  tmdb_id?: number;
  imdb_id?: number;
  season?: number;
  episode?: number;
  language?: string;
  type?: string;
}

export type SubtitleData = {
  id: string;
  url: string;
  type: string;
  isHearingImpaired: boolean;
  flagUrl: string;
  display: string;
  language: string;
};

export interface QueryParams {
  id: string;
  season?: number;
  episode?: number;
  language?: string;
  type?: string;
}
