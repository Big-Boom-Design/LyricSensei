import { SpotifyTrack } from "./schema";

export const demoTracks: SpotifyTrack[] = [
  {
    id: "demo-bohemian-rhapsody",
    name: "Bohemian Rhapsody",
    artists: ["Queen"],
    album: "A Night at the Opera",
    albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    duration: 354000,
  },
  {
    id: "demo-imagine",
    name: "Imagine",
    artists: ["John Lennon"],
    album: "Imagine",
    albumArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80",
    duration: 183000,
  },
  {
    id: "demo-hotel-california",
    name: "Hotel California",
    artists: ["Eagles"],
    album: "Hotel California",
    albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    duration: 391000,
  },
  {
    id: "demo-stairway-to-heaven",
    name: "Stairway to Heaven",
    artists: ["Led Zeppelin"],
    album: "Led Zeppelin IV",
    albumArt: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&q=80",
    duration: 482000,
  },
  {
    id: "demo-yesterday",
    name: "Yesterday",
    artists: ["The Beatles"],
    album: "Help!",
    albumArt: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80",
    duration: 125000,
  }
];

export function searchDemoTracks(query: string): SpotifyTrack[] {
  const lowerQuery = query.toLowerCase();
  return demoTracks.filter(
    track =>
      track.name.toLowerCase().includes(lowerQuery) ||
      track.artists.some(artist => artist.toLowerCase().includes(lowerQuery)) ||
      track.album.toLowerCase().includes(lowerQuery)
  );
}
