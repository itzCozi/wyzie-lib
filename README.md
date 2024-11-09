# Wyzie Lib

Wyzie Lib is a package made for easily implementing [Wyzie Subs](https://subs.wyzie.ru) into your
project without all the fuss. [Read our source code!](https://github.com/itzcozi/wyzie-lib)

<sup>2.0 Out Now!</sup>

## Features

- **Simple**: Just one function for searching subtitles using Wyzie Subs API.
- **Fast**: This package was written in Vite with TypeScript, so it's fast and reliable.
- **Open-Source**: The API and package are open-source.

## Installation

**NPM**

```bash
npm install wyzie-lib
```

**PNPM**

```bash
pnpm install wyzie-lib
```

**Yarn**

```bash
yarn add wyzie-lib
```

## Usage

```ts
import { type SubtitleData, searchSubtitles } from "wyzie-lib";

// IMDB is faster then TMDB due to less API calls behind the scenes
const data: SubtitleData[] = await searchSubtitles({ tmdb_id: 286217 });
console.log(data[0]); // Prints the object of the first subtitle provided in the search
```

### Parameters

| Parameter               | Name              | Description                                                                               |
| ----------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| **tmdb_id** - _number_  | TmdbId            | The TMDB ID of the movie or TV show. _(tmdb_id or imdb_id is required)_                   |
| **imdb_id** - _number_  | ImdbId            | The IMDB ID of the movie or TV show. _(imdb_id or tmdb_id is required)_                   |
| **format** - _string_   | format            | The file format of the subtitles returned. _(srt, ass, vtt, txt, sub, mpl, webvtt, dfxp)_ |
| **season** - _number_   | season            | Disired season of subtites _(this requires episode parameter aswell)_                     |
| **episode** - _number_  | episode           | The episode of the given season.                                                          |
| **language** - _string_ | language          | The ISO 3166 code of the provided subtitles.                                              |
| **hi** - _boolean_      | isHearingImpaired | A boolean indicating if the subtitles are hearing impaired.                               |

### Types

- **SearchSubtitlesParams**: All valid parameters recognized by the API.
- **QueryParams**: All parameters (optional and required) available for the wyzie-subs API.
- **SubtitleData**: All returned values from the API with their respective types.

```ts
interface SearchSubtitlesParams {
  // Parameters for the searchSubtitles() function
  tmdb_id?: number; // Parsed automatically by the API to recognize if its TMDB or IMDB
  imdb_id?: number; // Parsed automatically by the API to recognize if its TMDB or IMDB
  season?: number;
  episode?: number; // Season is required if episode is provided
  language?: string; // ISO 3166 code
  format?: string; // Subtitle file format
  hi?: boolean; // If the subtitle is hearing impaired
}

interface QueryParams {
  // Parameters for the wyzie-subs API
  id: string; // (Required) The TMDB or IMDB ID of the movie or TV show
  season?: number; // The season of the TV show (Required if episode is provided)
  episode?: number; // The episode of the TV show (Required if season is provided)
  language?: string; // ISO 3166 code
  format?: string; // Subtitle file format
  hi?: boolean; // If the subtitle is hearing impaired
}

type SubtitleData = {
  // Data returned by the API
  id: string; // Unique ID of the subtitle from opensubtitles
  url: string; // Direct download link of the subtitle
  format: string; // Subtitle file format
  isHearingImpaired: boolean; // If the subtitle is hearing impaired
  flagUrl: string; // Flag of the language
  media: string; // Media name of the subtitle
  display: string; // Actual name of the language
  language: string; // ISO 3166 code
};
```

<hr />

<sup>
  Created by <a href="https://github.com/itzcozi" alt="github" title="itzCozi on Github">BadDeveloper</a> with 💙
</sup>
