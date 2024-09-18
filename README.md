# Wyzie Lib

Wyzie Lib is a package made for easily implementing [Wyzie Subs](https://subs.wyzie.ru) into your project without all the fuss.

<sup>2.0 Out Now!</sup>

## Features
- **Simple**: Just one function for searching subtitles using Wyzie Subs API.
- **Fast**: This package was written in Vite with TypeScript, so it's fast and reliable.
- **Open-Source**: The API and package are open-source.
  
## Installation
### NPM
```bash
npm install wyzie-lib
```
### PNPM
```bash
pnpm install wyzie-lib
```
### Yarn
```bash
yarn add wyzie-lib
```

## Parameters
- **tmdb_id**: The TMDB ID of the movie or TV show. *(tmdb_id or imdb_id is required)*
- **imdb_id**: The IMDB ID of the movie or TV show. *(imdb_id or tmdb_id is required)*
- **type**: The file format of the subtitles returned. *(srt, ass, vtt, txt, sub, mpl, webvtt, dfxp)*
- **season**: Disired season of subtites *(this requires episode parameter aswell)*
- **episode**: The episode of the given season.
- **language**: The ISO 3166 code of the provided subtitles.
- **display**: The actual name of the language capitalized.
- **isHearingImpaired**: A boolean indicating if the subtitles are hearing impaired.

## Usage
```ts
import { type SubtitleData, searchSubtitles } from "wyzie-lib";

const data: SubtitleData[] = await searchSubtitles({ tmdb_id: 286217 });
console.log(data[0].id);
```

<hr />

<sup>
  Created by <a href="https://github.com/itzcozi" alt="github" title="itzCozi on Github">BadDeveloper</a> with 💙
</sup>
