# Design Guidelines: Spotify Lyrics & Meanings App

## Design Approach
**Reference-Based Approach** drawing from Spotify's clean interface and Genius's lyrics annotation style. This music experience app requires visual richness with focus on album artwork, readable lyrics, and immersive user experience.

## Core Design Principles
- **Content-First**: Album artwork and lyrics dominate the interface
- **Readability**: Typography optimized for extended reading of lyrics
- **Focus**: Minimal UI chrome, maximum content visibility
- **Contextual Interactivity**: Meanings appear on-demand without cluttering

## Typography System

**Primary Font**: Inter or similar modern sans-serif via Google Fonts
- **Hero Text** (Song Titles): text-3xl to text-5xl, font-bold
- **Body Text** (Lyrics): text-lg to text-xl, font-normal, leading-relaxed (crucial for readability)
- **Metadata** (Artist, Album): text-sm to text-base, font-medium
- **Annotations** (Meanings): text-base, leading-normal
- **UI Elements**: text-sm, font-medium

**Line Height**: Generous spacing for lyrics (leading-8 to leading-10) to enable easy line selection

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20
- **Component padding**: p-4 to p-8
- **Section gaps**: gap-6 to gap-12
- **Margins**: m-4, m-6, m-8

**Layout Structure**:
```
Main Container: max-w-6xl mx-auto
Sidebar (Player): w-80 to w-96 fixed
Content Area: flex-1 with max-w-3xl for lyrics
```

## Component Library

### Now Playing Card
- Large album artwork (300x300px to 400x400px)
- Song title, artist, album metadata stacked below
- Playback controls (play/pause, next, previous)
- Progress bar with time indicators
- Compact card variant for header/minimized state

### Lyrics Display
- Center-aligned, single-column layout
- Each lyric line as interactive element with subtle hover indication
- Currently playing line highlighted with visual distinction (border-l-4, scale effect)
- Smooth auto-scroll following playback
- Generous vertical spacing between verses (space-y-6 to space-y-8)

### Meaning Panels
- **Inline Expansion**: Click lyric line to expand meaning below
- **Side Panel**: Alternative layout showing meaning alongside lyrics
- Include AI-generated interpretation
- Reference metadata (themes, literary devices, context)
- Collapse/expand animation (slide down, fade in)

### Search Interface
- Prominent search bar (h-12 to h-14)
- Autocomplete dropdown with album artwork thumbnails
- Recent searches persistence
- Search results grid with album covers

### Navigation
- Minimal header with logo and search
- Tab navigation: "Now Playing" | "Search" | "Library"
- Clean, icon-based navigation with labels

## Images

**Hero Section**: Full-bleed album artwork with gradient overlay
- Placement: Background of now-playing section
- Treatment: Blur effect (backdrop-blur-2xl) with opacity overlay
- Foreground: Song metadata and controls with blurred button backgrounds

**Album Artwork**: 
- Primary display: Large square in player card
- Secondary: Thumbnails in search results (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
- Loading: Skeleton state with aspect-square placeholder

## Interaction Patterns

### Lyric Selection
- Click any lyric line to reveal meaning below
- Visual feedback: Border accent, subtle scale transform
- Only one meaning visible at a time (accordion pattern)
- Smooth transitions using Tailwind transitions

### Auto-Scroll
- Lyrics scroll automatically to keep current line centered
- Smooth scroll behavior (scroll-smooth)
- User can manually scroll; auto-scroll pauses temporarily

### Search Flow
1. Enter search query
2. Grid of results with artwork, song title, artist
3. Click to view lyrics and meanings
4. Return to search or switch to now playing

## Accessibility
- Keyboard navigation for all interactive lyrics
- Focus states clearly visible (ring-2 focus-visible)
- ARIA labels for playback controls
- Consistent tab order through lyrics and meanings
- Sufficient contrast ratios for all text

## Responsive Behavior

**Mobile (base)**:
- Stack player above lyrics
- Full-width album artwork
- Compact controls
- Single-column lyrics (w-full)

**Tablet (md:)**:
- Side-by-side player and lyrics option
- Larger album artwork
- Two-column search results

**Desktop (lg:)**:
- Fixed sidebar player (w-80 to w-96)
- Wide lyrics column (max-w-3xl)
- Multi-column search results (grid-cols-3 to grid-cols-4)

## Special Considerations
- Lyrics text must be highly readable: large font size, generous line height, maximum contrast
- Album artwork drives visual identity of each view
- Minimize animations during lyric reading (no distracting motion)
- Quick meaning access without navigation away from lyrics
- Spotify playback state synchronization must feel seamless