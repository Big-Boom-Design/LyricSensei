import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableSpotifyClient } from "./spotify";
import { fetchLyrics, getLyricsAsText } from "./lyrics";
import { generateSongMeaning, generateLyricMeaning } from "./openai";
import { registerDemoRoutes } from "./demoRoutes";
import type { TrackItem, Track } from "@spotify/web-api-ts-sdk";

// Type guard to narrow TrackItem to Track
function isTrack(item: TrackItem | null): item is Track {
  return item?.type === 'track';
}

export async function registerRoutes(app: Express): Promise<Server> {
  registerDemoRoutes(app);
  // Get currently playing track
  app.get("/api/spotify/current-track", async (req, res) => {
    try {
      const spotify = await getUncachableSpotifyClient();
      const playback = await spotify.player.getCurrentlyPlayingTrack();

      if (!playback || !playback.item) {
        return res.json({ playing: false });
      }

      const item = playback.item;
      if (!isTrack(item)) {
        return res.json({ playing: false });
      }

      res.json({
        playing: true,
        track: {
          id: item.id,
          name: item.name,
          artists: item.artists.map((a: any) => a.name),
          album: item.album.name,
          albumArt: item.album.images[0]?.url || '',
          duration: item.duration_ms,
          currentPosition: playback.progress_ms || 0,
          isPlaying: playback.is_playing
        }
      });
    } catch (error: any) {
      console.error('Error fetching current track:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Search for tracks
  app.get("/api/spotify/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: 'Query parameter required' });
      }

      const spotify = await getUncachableSpotifyClient();
      const results = await spotify.search(query, ['track'], undefined, 20);

      if (!results.tracks || !results.tracks.items) {
        return res.json({ tracks: [] });
      }

      const tracks = results.tracks.items.map((track: any) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((a: any) => a.name),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        duration: track.duration_ms
      }));

      res.json({ tracks });
    } catch (error: any) {
      console.error('Error searching tracks:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get lyrics and meaning for a track
  app.get("/api/lyrics/:trackId", async (req, res) => {
    try {
      const { trackId } = req.params;
      const spotify = await getUncachableSpotifyClient();
      
      const track = await spotify.tracks.get(trackId);
      const trackName = track.name;
      const artistName = track.artists[0]?.name || 'Unknown';

      // Fetch lyrics (placeholder implementation)
      const lyrics = await fetchLyrics(trackName, artistName);
      const lyricsText = getLyricsAsText(lyrics);

      // Generate overall song meaning
      const meaning = await generateSongMeaning(trackName, artistName, lyricsText);

      res.json({
        lyrics,
        meaning
      });
    } catch (error: any) {
      console.error('Error fetching lyrics:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Generate meaning for a specific lyric line
  app.post("/api/lyrics/explain", async (req, res) => {
    try {
      const { lyricLine, songName, artistName, fullLyrics } = req.body;
      
      if (!lyricLine || !songName || !artistName || !fullLyrics) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const explanation = await generateLyricMeaning(
        lyricLine,
        songName,
        artistName,
        fullLyrics
      );

      res.json({ explanation });
    } catch (error: any) {
      console.error('Error generating lyric meaning:', error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
