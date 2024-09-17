import { SearchSubtitlesParams, SubtitleData } from "@/types";

async function constructUrl({
  tmdb_id,
  imdb_id,
  season,
  episode,
  language,
  type,
}: SearchSubtitlesParams): Promise<URL> {
  const url = new URL("https://subs.wyzie.ru/search");
  const queryParams: Record<string, any> = {
    id: tmdb_id || imdb_id,
    season,
    episode,
    language,
    type,
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  return url;
}

async function fetchSubtitles(url: URL): Promise<SubtitleData[]> {
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function searchSubtitles(params: SearchSubtitlesParams): Promise<SubtitleData[]> {
  try {
    const url = await constructUrl(params);
    return await fetchSubtitles(url);
  } catch (error) {
    console.error("Error fetching subtitles:", error);
    throw error;
  }
}
