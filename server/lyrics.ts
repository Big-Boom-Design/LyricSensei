// PRODUCTION NOTE: This file contains a placeholder implementation.
// To get real lyrics, you need to integrate with a licensed lyrics API.
//
// Recommended services (choose one):
// 1. Musixmatch API (https://developer.musixmatch.com/) - Most comprehensive
// 2. Genius API (https://docs.genius.com/) - Good for annotations
// 3. LyricFind API (https://www.lyricfind.com/developer) - Enterprise option
//
// To integrate Musixmatch (recommended):
// 1. Sign up at https://developer.musixmatch.com/
// 2. Get your API key
// 3. Add MUSIXMATCH_API_KEY to your secrets
// 4. Replace fetchLyrics implementation below with Musixmatch API calls
//
// Example Musixmatch integration:
// const response = await fetch(
//   `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${trackName}&q_artist=${artistName}&apikey=${process.env.MUSIXMATCH_API_KEY}`
// );

interface LyricLine {
  id: string;
  text: string;
  timestamp?: number;
}

export async function fetchLyrics(
  trackName: string,
  artistName: string
): Promise<LyricLine[]> {
  // TODO: Replace with real lyrics API integration
  // For now, returning sample lyrics that acknowledge this is a demo
  
  const demoNotice = [
    `[Demo Mode - Placeholder Lyrics]`,
    ``,
    `To see real lyrics for "${trackName}" by ${artistName},`,
    `integrate with a licensed lyrics API service.`,
    ``,
    `Recommended: Musixmatch API`,
    `Visit: https://developer.musixmatch.com/`,
    ``,
    `Once integrated, you'll see:`,
    `- Actual song lyrics synchronized with playback`,
    `- Line-by-line timestamps`,
    `- Click any line to get AI-powered explanations`,
    ``,
    `Sample verse structure:`,
    `Verse 1 begins with an opening thought`,
    `Building emotion line by line`,
    `Creating a narrative that connects`,
    ``,
    `Chorus brings the main message`,
    `Repeating the central theme`,
    `Making it memorable and catchy`,
    ``,
    `Bridge provides a shift in perspective`,
    `Adding depth to the story`,
    `Before returning to the chorus`,
  ];

  return demoNotice.map((text, index) => ({
    id: `line-${index}`,
    text,
    timestamp: index * 3000
  })).filter(line => line.text.trim() !== '');
}

// Helper to extract plain text from lyrics for AI analysis
export function getLyricsAsText(lyrics: LyricLine[]): string {
  return lyrics.map(line => line.text).join('\n');
}
