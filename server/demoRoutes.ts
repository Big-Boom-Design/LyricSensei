import type { Express } from "express";
import { demoTracks, searchDemoTracks } from "@shared/demoData";
import { fetchLyrics, getLyricsAsText } from "./lyrics";
import { generateSongMeaning } from "./openai";

export function registerDemoRoutes(app: Express) {
  app.get("/api/demo/current-track", async (req, res) => {
    const randomTrack = demoTracks[Math.floor(Math.random() * demoTracks.length)];
    res.json({
      playing: true,
      track: {
        ...randomTrack,
        currentPosition: 45000,
        isPlaying: true
      }
    });
  });

  app.get("/api/demo/search", async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter required' });
    }

    const tracks = searchDemoTracks(query);
    res.json({ tracks });
  });

  app.get("/api/demo/lyrics/:trackId", async (req, res) => {
    try {
      const trackId = req.params.trackId;
      const track = demoTracks.find(t => t.id === trackId);
      
      if (!track) {
        return res.status(404).json({ error: 'Track not found' });
      }

      const lyrics = await fetchLyrics(track.name, track.artists[0]);
      const lyricsText = getLyricsAsText(lyrics);
      const meaning = await generateSongMeaning(track.name, track.artists[0], lyricsText);

      res.json({
        lyrics,
        meaning
      });
    } catch (error: any) {
      console.error('Error fetching demo lyrics:', error);
      res.status(500).json({ error: error.message });
    }
  });
}
