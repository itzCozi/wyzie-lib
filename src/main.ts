import { SearchSubtitlesParams, SubtitleData, QueryParams } from "./types";
import { searchSubtitles, parseToVTT } from "./funcs";

// Named exports 😏
export { searchSubtitles, parseToVTT };
export type { SubtitleData, SearchSubtitlesParams, QueryParams };

// const params = { tmdb_id: 286217 };
// const data: SubtitleData[] = await searchSubtitles(params);
// console.log(data[0].id);

//const vttContent = await parseToVTT(params, 0); // Use the first subtitle URL
//console.log(vttContent);
