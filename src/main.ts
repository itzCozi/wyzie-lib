import { SearchSubtitlesParams, SubtitleData, QueryParams, ConfigurationOptions, TmdbSearchResult, TvDetails, SeasonDetails, SeasonSummary, EpisodeDetails } from "./types";
import { searchSubtitles, parseToVTT, configure, searchTmdb, getTvDetails, getSeasonDetails } from "./funcs";


export { searchSubtitles, parseToVTT, configure, searchTmdb, getTvDetails, getSeasonDetails };
export type { SubtitleData, SearchSubtitlesParams, QueryParams, ConfigurationOptions, TmdbSearchResult, TvDetails, SeasonDetails, SeasonSummary, EpisodeDetails };

