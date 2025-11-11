import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import NowPlayingCard from "@/components/NowPlayingCard";
import LyricsDisplay from "@/components/LyricsDisplay";
import SongMeaningPanel from "@/components/SongMeaningPanel";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import ThemeToggle from "@/components/ThemeToggle";
import { SpotifyTrack, LyricLine, SongMeaning } from "@shared/schema";
import { Music, Search as SearchIcon, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiSpotify } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { getCurrentTrack, searchTracks, getLyricsAndMeaning, explainLyric } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";

export default function Home() {
  const [activeTab, setActiveTab] = useState("now-playing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);

  // Query for current track
  const { data: currentTrackData, error: currentTrackError } = useQuery({
    queryKey: ['/api/spotify/current-track'],
    queryFn: getCurrentTrack,
    refetchInterval: 5000, // Poll every 5 seconds
  });

  // Query for search results
  const { data: searchData, isLoading: isSearching } = useQuery({
    queryKey: ['/api/spotify/search', searchQuery],
    queryFn: () => searchTracks(searchQuery),
    enabled: !!searchQuery,
  });

  // Determine which track to show lyrics for
  const trackToShow = selectedTrack || (currentTrackData?.playing ? currentTrackData.track : null);

  // Query for lyrics and meaning
  const { data: lyricsData, isLoading: isLoadingLyrics } = useQuery({
    queryKey: ['/api/lyrics', trackToShow?.id],
    queryFn: () => getLyricsAndMeaning(trackToShow!.id),
    enabled: !!trackToShow,
  });

  // Mutation for explaining individual lyrics
  const explainMutation = useMutation({
    mutationFn: (params: { lyricLine: string; songName: string; artistName: string; fullLyrics: string }) =>
      explainLyric(params.lyricLine, params.songName, params.artistName, params.fullLyrics),
  });

  const handleLineClick = (line: LyricLine) => {
    if (!line.meaning && trackToShow && lyricsData) {
      const fullLyrics = lyricsData.lyrics.map(l => l.text).join('\n');
      explainMutation.mutate({
        lyricLine: line.text,
        songName: trackToShow.name,
        artistName: trackToShow.artists[0],
        fullLyrics
      });
    }
  };

  const handleTrackSelect = (track: SpotifyTrack) => {
    setSelectedTrack(track);
    setActiveTab('now-playing');
  };

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
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentTrackError && (
          <Alert className="mb-6" data-testid="alert-error">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to connect to Spotify. Make sure you've authorized the Spotify connection.
            </AlertDescription>
          </Alert>
        )}

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
            {!trackToShow && !currentTrackError && (
              <div className="text-center py-16 space-y-4">
                <SiSpotify className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold" data-testid="text-no-playback">
                    No Track Playing
                  </h3>
                  <p className="text-muted-foreground">
                    Start playing a song on Spotify or search for one
                  </p>
                </div>
              </div>
            )}

            {trackToShow && (
              <div className="grid lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-8">
                {/* Sidebar - Now Playing Card */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <NowPlayingCard 
                    track={trackToShow}
                    onPlayPause={() => console.log('Play/Pause')}
                    onNext={() => console.log('Next')}
                    onPrevious={() => console.log('Previous')}
                  />
                </div>

                {/* Main Content - Lyrics and Meaning */}
                <div className="space-y-8">
                  {isLoadingLyrics ? (
                    <div className="space-y-4">
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-64 w-full" />
                    </div>
                  ) : lyricsData ? (
                    <>
                      <SongMeaningPanel meaning={lyricsData.meaning} />
                      
                      <div className="rounded-lg border bg-card p-8">
                        <h2 className="text-2xl font-bold mb-8 text-center" data-testid="text-lyrics-title">
                          Lyrics
                        </h2>
                        <LyricsDisplay 
                          lyrics={lyricsData.lyrics}
                          onLineClick={handleLineClick}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={setSearchQuery} />
            </div>

            {isSearching ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : searchQuery && searchData ? (
              <div>
                <h2 className="text-xl font-semibold mb-4" data-testid="text-search-results">
                  Search Results for "{searchQuery}"
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {searchData.tracks.map(track => (
                    <SearchResultCard 
                      key={track.id} 
                      track={track}
                      onClick={() => handleTrackSelect(track)}
                    />
                  ))}
                </div>
              </div>
            ) : !searchQuery ? (
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
            ) : null}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
