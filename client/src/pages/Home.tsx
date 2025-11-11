import { useState } from "react";
import NowPlayingCard from "@/components/NowPlayingCard";
import LyricsDisplay from "@/components/LyricsDisplay";
import SongMeaningPanel from "@/components/SongMeaningPanel";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import ThemeToggle from "@/components/ThemeToggle";
import { SpotifyTrack, LyricLine, SongMeaning } from "@shared/schema";
import { Music, Search as SearchIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiSpotify } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeTab, setActiveTab] = useState("now-playing");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real Spotify data
  const mockTrack: SpotifyTrack = {
    id: '1',
    name: 'Blinding Lights',
    artists: ['The Weeknd'],
    album: 'After Hours',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop',
    duration: 200000,
    currentPosition: 80000,
    isPlaying: true
  };

  const mockLyrics: LyricLine[] = [
    {
      id: '1',
      text: "I've been tryna call",
      meaning: "The opening line establishes a sense of desperation and longing, setting the emotional tone for the entire song."
    },
    {
      id: '2',
      text: "I've been on my own for long enough",
      meaning: "This reflects the protagonist's isolation and readiness to reconnect with someone after a period of solitude."
    },
    {
      id: '3',
      text: "Maybe you can show me how to love, maybe",
    },
    {
      id: '4',
      text: "I'm going through withdrawals",
      meaning: "A metaphor comparing emotional dependency to addiction, highlighting the intense craving for connection."
    },
    {
      id: '5',
      text: "You don't even have to do too much",
    },
    {
      id: '6',
      text: "You can turn me on with just a touch, baby",
      meaning: "Emphasizes the power of small gestures and the electric connection between two people."
    },
    {
      id: '7',
      text: "I look around and Sin City's cold and empty",
      meaning: "Las Vegas metaphorically represents a place of temptation that feels hollow without meaningful connection."
    },
    {
      id: '8',
      text: "No one's around to judge me",
    },
    {
      id: '9',
      text: "I can't see clearly when you're gone",
      meaning: "Love becomes a guiding force, without which life loses clarity and direction."
    }
  ];

  const mockMeaning: SongMeaning = {
    overview: "Blinding Lights explores themes of loneliness, longing, and the desperate need for connection. The song captures the protagonist's journey through emotional withdrawal and the search for love after a period of isolation in the neon-lit landscape of Las Vegas.",
    themes: ["Loneliness", "Redemption", "Love", "Desperation", "Urban Life", "Nostalgia"],
    context: "Released in 2019, this synthwave-inspired track became one of The Weeknd's most successful singles, blending 80s nostalgia with modern production. The song topped charts worldwide and became a cultural phenomenon."
  };

  const mockSearchResults: SpotifyTrack[] = [
    {
      id: '1',
      name: 'Blinding Lights',
      artists: ['The Weeknd'],
      album: 'After Hours',
      albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      duration: 200000
    },
    {
      id: '2',
      name: 'Levitating',
      artists: ['Dua Lipa'],
      album: 'Future Nostalgia',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      duration: 203000
    },
    {
      id: '3',
      name: 'drivers license',
      artists: ['Olivia Rodrigo'],
      album: 'SOUR',
      albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
      duration: 242000
    },
    {
      id: '4',
      name: 'Good 4 U',
      artists: ['Olivia Rodrigo'],
      album: 'SOUR',
      albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
      duration: 178000
    },
    {
      id: '5',
      name: 'Save Your Tears',
      artists: ['The Weeknd'],
      album: 'After Hours',
      albumArt: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
      duration: 215000
    },
    {
      id: '6',
      name: 'Peaches',
      artists: ['Justin Bieber', 'Daniel Caesar', 'Giveon'],
      album: 'Justice',
      albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
      duration: 198000
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold" data-testid="text-app-title">
              LyricSense
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" data-testid="button-connect-spotify">
              <SiSpotify className="h-4 w-4 mr-2" />
              Connect Spotify
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2" data-testid="tabs-navigation">
            <TabsTrigger value="now-playing" data-testid="tab-now-playing">
              Now Playing
            </TabsTrigger>
            <TabsTrigger value="search" data-testid="tab-search">
              Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="now-playing" className="space-y-8">
            <div className="grid lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-8">
              {/* Sidebar - Now Playing Card */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <NowPlayingCard 
                  track={mockTrack}
                  onPlayPause={() => console.log('Play/Pause')}
                  onNext={() => console.log('Next')}
                  onPrevious={() => console.log('Previous')}
                />
              </div>

              {/* Main Content - Lyrics and Meaning */}
              <div className="space-y-8">
                <SongMeaningPanel meaning={mockMeaning} />
                
                <div className="rounded-lg border bg-card p-8">
                  <h2 className="text-2xl font-bold mb-8 text-center" data-testid="text-lyrics-title">
                    Lyrics
                  </h2>
                  <LyricsDisplay 
                    lyrics={mockLyrics}
                    currentLineId="2"
                    onLineClick={(line) => console.log('Clicked:', line.text)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={setSearchQuery} />
            </div>

            {searchQuery ? (
              <div>
                <h2 className="text-xl font-semibold mb-4" data-testid="text-search-results">
                  Search Results for "{searchQuery}"
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {mockSearchResults.map(track => (
                    <SearchResultCard 
                      key={track.id} 
                      track={track}
                      onClick={() => {
                        console.log('Selected:', track.name);
                        setActiveTab('now-playing');
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold" data-testid="text-empty-state">
                    Search for Songs
                  </h3>
                  <p className="text-muted-foreground">
                    Find lyrics and meanings for any song
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
