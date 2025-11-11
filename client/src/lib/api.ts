import { SpotifyTrack, LyricLine, SongMeaning } from "@shared/schema";

export async function getCurrentTrack(isDemoMode: boolean = false): Promise<{ playing: boolean; track?: SpotifyTrack }> {
  const endpoint = isDemoMode ? '/api/demo/current-track' : '/api/spotify/current-track';
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Failed to fetch current track');
  return response.json();
}

export async function searchTracks(query: string, isDemoMode: boolean = false): Promise<{ tracks: SpotifyTrack[] }> {
  const endpoint = isDemoMode ? '/api/demo/search' : '/api/spotify/search';
  const response = await fetch(`${endpoint}?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search tracks');
  return response.json();
}

export async function getLyricsAndMeaning(trackId: string, isDemoMode: boolean = false): Promise<{
  lyrics: LyricLine[];
  meaning: SongMeaning;
}> {
  const endpoint = isDemoMode ? '/api/demo/lyrics' : '/api/lyrics';
  const response = await fetch(`${endpoint}/${trackId}`);
  if (!response.ok) throw new Error('Failed to fetch lyrics');
  return response.json();
}

export async function explainLyric(
  lyricLine: string,
  songName: string,
  artistName: string,
  fullLyrics: string
): Promise<{ explanation: string }> {
  const response = await fetch('/api/lyrics/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lyricLine, songName, artistName, fullLyrics })
  });
  if (!response.ok) throw new Error('Failed to explain lyric');
  return response.json();
}
