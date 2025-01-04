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

export async function parseToVTT(subtitleUrl: string): Promise<string> {
  try {
    const response = await fetch(subtitleUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtitle content: ${response.status}`);
    }

    const content = await response.text();
    const normalizedContent = content.replace(/\r\n|\r/g, "\n").trim();
    const blocks = normalizedContent.split(/\n\n+/);
    const timestampRegex = /^\d{1,2}:\d{2}:\d{2}[,.]\d{3}\s*-->\s*\d{1,2}:\d{2}:\d{2}[,.]\d{3}$/;

    // Check for valid SRT format
    const hasValidSRTFormat = blocks.some((block) => {
      const lines = block.split("\n").map((line) => line.trim());
      return lines.some((line) => timestampRegex.test(line));
    });
    if (!hasValidSRTFormat) {
      throw new Error("Invalid subtitle format: not SRT");
    }

    const vttLines: string[] = ["WEBVTT", ""];

    for (const block of blocks) {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      if (lines.length < 2) continue;
      const timestampIndex = lines.findIndex((line) => timestampRegex.test(line));
      if (timestampIndex === -1) continue;
      const textLines = lines.slice(timestampIndex + 1).filter((line) => !/^\d+$/.test(line));
      if (textLines.length === 0) continue;
      let timestampLine = lines[timestampIndex];
      timestampLine = timestampLine
        .replace(/[,.](?=\s*-->)/, "")
        .replace(/[,.]$/, "")
        .replace(/,(\d{3})/g, ".$1");
      vttLines.push(`${timestampLine}\n${textLines.join("\n")}\n`);
    }

    return (
      vttLines
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim() + "\n\n"
    );
  } catch (error) {
    console.error("Error in parseToVTT:", error);
    throw error;
  }
}
