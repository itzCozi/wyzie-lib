import { SearchSubtitlesParams, SubtitleData, QueryParams } from "./types";
import { searchSubtitles, parseToVTT } from "./funcs";

// Named exports 😏
export { searchSubtitles, parseToVTT };
export type { SubtitleData, SearchSubtitlesParams, QueryParams };

// const data: SubtitleData[] = await searchSubtitles({ tmdb_id: 286217, format: "srt" });
// console.log(data[0].id);
// const vttContent = await parseToVTT(data[0].url); // Use the first subtitle URL
// console.log(vttContent);
