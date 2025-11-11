import { SpotifyTrack, LyricLine, SongMeaning } from "@shared/schema";

export async function getCurrentTrack(): Promise<{ playing: boolean; track?: SpotifyTrack }> {
  const response = await fetch('/api/spotify/current-track');
  if (!response.ok) throw new Error('Failed to fetch current track');
  return response.json();
}

export async function searchTracks(query: string): Promise<{ tracks: SpotifyTrack[] }> {
  const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search tracks');
  return response.json();
}

export async function getLyricsAndMeaning(trackId: string): Promise<{
  lyrics: LyricLine[];
  meaning: SongMeaning;
}> {
  const response = await fetch(`/api/lyrics/${trackId}`);
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
