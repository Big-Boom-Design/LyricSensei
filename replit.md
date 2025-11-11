# LyricSense - Spotify Lyrics & Meanings App

## Overview
LyricSense is a web application that connects to Spotify to display currently playing tracks, show lyrics, and provide AI-powered explanations of song meanings and individual lyric lines.

## Features
- **Spotify Integration**: Connect your Spotify account to see currently playing tracks
- **Search Functionality**: Search for any song in Spotify's catalog
- **Lyrics Display**: View song lyrics with interactive line-by-line exploration
- **AI-Powered Meanings**: Get overall song interpretations and explanations of specific lyrics using GPT-5
- **Dark Mode**: Toggle between light and dark themes

## Architecture

### Frontend (React + TypeScript)
- **Pages**: 
  - `Home.tsx`: Main app with tabs for "Now Playing" and "Search"
- **Components**:
  - `NowPlayingCard`: Displays current track with album art and playback controls
  - `LyricsDisplay`: Interactive lyrics with click-to-reveal meanings
  - `SongMeaningPanel`: AI-generated overall song analysis
  - `SearchBar`: Search input with real-time query
  - `SearchResultCard`: Grid cards for search results
  - `ThemeToggle`: Dark/light mode switcher
- **State Management**: React Query for server state, React useState for UI state

### Backend (Express + TypeScript)
- **Routes**:
  - `GET /api/spotify/current-track`: Fetch currently playing track
  - `GET /api/spotify/search?q=query`: Search Spotify catalog
  - `GET /api/lyrics/:trackId`: Get lyrics and AI-generated song meaning
  - `POST /api/lyrics/explain`: Generate meaning for specific lyric line
  
- **Services**:
  - `spotify.ts`: Spotify SDK client with automatic token refresh
  - `openai.ts`: OpenAI integration for AI-powered meanings (uses Replit AI Integrations)
  - `lyrics.ts`: Lyrics fetching (currently placeholder - see Production Notes)

### Integrations
- **Spotify**: Connected via Replit Connectors with OAuth
- **OpenAI**: Uses Replit AI Integrations (GPT-5) - no API key required, billed to Replit credits

## Production Notes

### Lyrics Implementation
**IMPORTANT**: The current lyrics implementation uses placeholder data. For production use, you need to integrate with a licensed lyrics API service:

Recommended providers:
- [Musixmatch API](https://developer.musixmatch.com/) - Largest lyrics database
- [Genius API](https://docs.genius.com/) - Good for annotations and meanings
- [LyricFind API](https://www.lyricfind.com/developer) - Licensed lyrics

To integrate:
1. Sign up for a lyrics API service
2. Update `server/lyrics.ts` to call the API
3. Handle rate limiting and caching appropriately
4. Ensure compliance with lyrics licensing terms

### Spotify Connection
Users need to authorize Spotify in their Replit settings. The app automatically:
- Manages OAuth token refresh
- Handles expired tokens
- Polls for currently playing track every 5 seconds

## Recent Changes
- **2025-01-11**: Initial implementation
  - Spotify integration for current track and search
  - AI-powered song meanings using GPT-5
  - Interactive lyrics display with line-by-line explanations
  - Placeholder lyrics (to be replaced with licensed API)

## Development
```bash
npm run dev  # Starts both frontend (Vite) and backend (Express)
```

## Tech Stack
- React 18 with TypeScript
- Tailwind CSS + Shadcn UI components
- Express.js backend
- Spotify Web API SDK
- OpenAI SDK (via Replit AI Integrations)
- React Query for data fetching
