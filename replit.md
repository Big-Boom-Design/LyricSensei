# LyricSense - Spotify Lyrics & Meanings App

## Overview
LyricSense is a web application that connects to Spotify to display currently playing tracks, show lyrics, and provide AI-powered explanations of song meanings and individual lyric lines.

## Features
- **Spotify Integration**: Connect your Spotify account to see currently playing tracks
- **Demo Mode**: Auto-fallback demo mode with 5 classic tracks when Spotify OAuth is unavailable
- **Search Functionality**: Search for any song in Spotify's catalog (or demo tracks in demo mode)
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
- **Contexts**:
  - `DemoContext`: Manages demo mode state and auto-fallback behavior
- **State Management**: React Query for server state, DemoContext for mode switching, React useState for UI state

### Backend (Express + TypeScript)
- **Routes**:
  - `GET /api/spotify/current-track`: Fetch currently playing track
  - `GET /api/spotify/search?q=query`: Search Spotify catalog
  - `GET /api/demo/current-track`: Demo mode current track endpoint
  - `GET /api/demo/search?q=query`: Demo mode search endpoint
  - `GET /api/demo/lyrics/:trackId`: Demo mode lyrics with AI meanings
  - `GET /api/lyrics/:trackId`: Get lyrics and AI-generated song meaning
  - `POST /api/lyrics/explain`: Generate meaning for specific lyric line
  
- **Services**:
  - `spotify.ts`: Spotify SDK client with automatic token refresh
  - `openai.ts`: OpenAI integration for AI-powered meanings (uses Replit AI Integrations)
  - `lyrics.ts`: Lyrics fetching (currently placeholder - see Production Notes)
  - `demoRoutes.ts`: Demo mode endpoints mirroring Spotify functionality

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

### Demo Mode
**Auto-Fallback Behavior**: When Spotify OAuth fails (e.g., development mode restrictions, missing authorization), the app automatically enters demo mode:

**Demo Features:**
- 5 classic tracks available: "Bohemian Rhapsody", "Imagine", "Hotel California", "Stairway to Heaven", "Yesterday"
- Full search functionality across demo tracks
- Real AI-powered lyric explanations (uses actual GPT-5, not mock data)
- "Retry Spotify" button in banner to attempt Spotify reconnection
- Data provider abstraction allows seamless switching between Spotify and demo endpoints

**Technical Details:**
- Demo data defined in `shared/demoData.ts`
- Demo endpoints in `server/demoRoutes.ts` mirror Spotify API structure
- `DemoContext` manages mode state and triggers query invalidation
- Query keys change based on mode to prevent stale data
- No backend logic changes required; client switches endpoints automatically

**Future Enhancements (Architect Suggestions):**
- Add caching/throttling for OpenAI calls to avoid repeated requests
- Monitor error logging for demo routes
- Consider persisting demo mode choice in localStorage

### Spotify Connection
Users need to authorize Spotify in their Replit settings. The app automatically:
- Manages OAuth token refresh
- Handles expired tokens
- Polls for currently playing track every 5 seconds
- Falls back to demo mode on OAuth failures

## Recent Changes
- **2025-11-11**: Demo mode implementation
  - Auto-fallback demo mode when Spotify OAuth fails
  - DemoContext for managing mode state and data provider switching
  - Demo routes mirroring Spotify API endpoints
  - 5 classic tracks with real AI-powered lyric explanations
  - Demo mode banner with "Retry Spotify" button
  - End-to-end tested: search, track selection, AI explanations all working
  - Architect-approved implementation
  
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
