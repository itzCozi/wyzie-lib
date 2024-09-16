import { SearchSubtitlesParams, SubtitleData } from "@/types";

async function constructUrl(params: SearchSubtitlesParams): Promise<URL> {
  const { tmdb_id, imdb_id, season, episode, language, format } = params;
  const url = new URL("https://subs.wyzie.ru/search");
  const queryParams: Record<string, any> = {
    id: tmdb_id || imdb_id,
    season,
    episode,
    language,
    format,
  };

  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] !== undefined) {
      url.searchParams.append(key, String(queryParams[key]));
    }
  });

  return url;
}

async function fetchSubtitles(url: URL): Promise<SubtitleData[]> {
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function searchSubtitles(params: SearchSubtitlesParams): Promise<SubtitleData[]> {
  try {
    const url = await constructUrl(params);
    return await fetchSubtitles(url);
  } catch (error) {
    console.error("Error fetching subtitles:", error);
    throw error;
  }
}

export { searchSubtitles };

// const data: SubtitleData[] = await searchSubtitles({ tmdb_id: 286217, language: "en" });
// console.log(data[0].id);
