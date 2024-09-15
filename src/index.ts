import { SearchSubtitlesParams, Params } from '@/types';

export async function searchSubtitles({
  tmdb_id,
  imdb_id,
  season,
  episode,
  language,
  format
}: SearchSubtitlesParams): Promise<any> {
  const params: Params = {
      id: tmdb_id || imdb_id,
      season,
      episode,
      language,
      format
  };

  const url = new URL('https://subs.wyzie.ru/search');
  Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
          url.searchParams.append(key, String(params[key]));
      }
  });

  try {
      const response = await fetch(url.toString());
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching subtitles:', error);
      throw error;
  }
}

console.log(searchSubtitles({ tmdb_id: 286217, language: 'en' }));