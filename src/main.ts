import { SearchSubtitlesParams, SubtitleData, QueryParams, ConfigurationOptions, TmdbSearchResult, TvDetails, SeasonDetails, SeasonSummary, EpisodeDetails } from "./types";
import { searchSubtitles, parseToVTT, configure, searchTmdb, getTvDetails, getSeasonDetails } from "./funcs";

// Named exports 😏
export { searchSubtitles, parseToVTT, configure, searchTmdb, getTvDetails, getSeasonDetails };
export type { SubtitleData, SearchSubtitlesParams, QueryParams, ConfigurationOptions, TmdbSearchResult, TvDetails, SeasonDetails, SeasonSummary, EpisodeDetails };

// You can test code here and see what it logs in the console of ur browser.