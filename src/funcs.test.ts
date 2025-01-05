import { describe, it, expect } from 'vitest';
import { parseToVTT, searchSubtitles, SubtitleData } from './main';

describe('Parse to VTT', () => {
	it('Should Parse Subtitles to VTT', () => {
        let subtitle: undefined | SubtitleData;
        searchSubtitles({ tmdb_id: 2190, season: 1, episode: 1, language: 'en', format: 'srt' }).then((data) => {
            subtitle = data[0];
            parseToVTT(subtitle.url).then((vttContent) => {
                expect(vttContent).toContain('Kick ass.'); // Valid line from episode, I also just think its funny to have that as a testcase
            });
        });
	});
});

describe('Search Subtitles', () => {
    it('Should Search Subtitles', () => {
        searchSubtitles({tmdb_id: 2190, season: 1, episode: 1, language: 'en', format: 'srt'}).then((data) => {
            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeGreaterThan(0);
            data.forEach(item => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('url');
                expect(item).toHaveProperty('format');
            });
        });
    });
})