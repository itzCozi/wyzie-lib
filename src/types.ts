export interface SearchSubtitlesParams {
  tmdb_id?: number;
  imdb_id?: number;
  season?: number;
  episode?: number;
  language?: string;
  format?: string;
}

export interface Params {
  [key: string]: string | number | undefined;
  id?: number;
  season?: number;
  episode?: number;
  language?: string;
  format?: string;
}