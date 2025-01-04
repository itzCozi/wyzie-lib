import { SearchSubtitlesParams, SubtitleData, QueryParams } from "./types";

async function constructUrl({
  tmdb_id,
  imdb_id,
  season,
  episode,
  language,
  format,
  hi,
}: SearchSubtitlesParams): Promise<URL> {
  const url = new URL("https://sub.wyzie.ru/search");
  const queryParams: QueryParams = {
    id: String(tmdb_id || imdb_id),
    season,
    episode,
    language,
    format,
    hi,
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value);
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
    throw new Error(`Error fetching subtitles: ${error}`);
  }
}

export async function parseToVTT(
  params: SearchSubtitlesParams,
  subtitleIndex: number,
): Promise<string> {
  try {
    params.format = "srt";
    // Fetch subtitles with srt parameters bc it has to be srt or this dont work
    const subtitles: SubtitleData[] = await searchSubtitles(params);

    if (subtitles.length === 0) {
      throw new Error("No subtitles found");
    }

    if (subtitleIndex < 0 || subtitleIndex >= subtitles.length) {
      throw new Error(`Subtitle index ${subtitleIndex} is out of bounds`);
    }

    const subtitleUrl = subtitles[subtitleIndex].url;
    const response = await fetch(subtitleUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtitle content: ${response.status}`);
    }
    const content = await response.text();
    const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
    let vtt = "WEBVTT\n\n";
    const blocks = normalizedContent.split(/\n\n+/);

    for (const block of blocks) {
      if (!block.trim()) continue;

      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length < 2) continue;

      const timestampIndex = lines.findIndex((line) =>
        // eslint-disable-next-line no-useless-escape
        /^\d{1,2}:\d{2}(?::\d{2})?[,\.]\d{3}(?:\.|,)?\s*-->\s*\d{1,2}:\d{2}(?::\d{2})?[,\.]\d{3}(?:\.|,)?$/.test(
          line,
        ),
      );

      if (timestampIndex === -1) continue;

      const textLines = lines
        .slice(timestampIndex + 1)
        .filter((line) => !/^\d+$/.test(line))
        .filter((line) => line.length > 0);

      if (textLines.length === 0) continue;

      let timestampLine = lines[timestampIndex];
      timestampLine = timestampLine
        .replace(/[,.](?=\s*-->)/, "")
        .replace(/[,.]$/, "")
        .replace(/,(\d{3})/g, ".$1");

      vtt += `${timestampLine}\n${textLines.join("\n")}\n\n`;
    }

    const cleanedVtt = vtt.replace(/\n{3,}/g, "\n\n").trim() + "\n\n";

    return cleanedVtt;
  } catch (error) {
    console.error("Error in parseToVTT:", error);
    throw error;
  }
}
