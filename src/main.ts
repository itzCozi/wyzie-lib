import { SearchSubtitlesParams, SubtitleData, QueryParams } from "@/types";
import { searchSubtitles } from "@/funcs";

// Named exports 😏
export { searchSubtitles };
export type { SubtitleData, SearchSubtitlesParams, QueryParams };

// const data: SubtitleData[] = await searchSubtitles({ tmdb_id: 286217 });
// console.log(data[0].id);
