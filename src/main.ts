import { SearchSubtitlesParams, SubtitleData, QueryParams, ConfigurationOptions } from "./types";
import { searchSubtitles, parseToVTT, configure } from "./funcs";

// Named exports 😏
export { searchSubtitles, parseToVTT, configure };
export type { SubtitleData, SearchSubtitlesParams, QueryParams, ConfigurationOptions };

// You can test code here and see what it logs in the console of ur browser.