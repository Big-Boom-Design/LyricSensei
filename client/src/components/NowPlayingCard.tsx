import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { SpotifyTrack } from "@shared/schema";

interface NowPlayingCardProps {
  track: SpotifyTrack;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function NowPlayingCard({ 
  track, 
  onPlayPause,
  onNext,
  onPrevious 
}: NowPlayingCardProps) {
  const progress = track.currentPosition && track.duration 
    ? (track.currentPosition / track.duration) * 100 
    : 0;

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="relative aspect-square w-full rounded-md overflow-hidden">
        <img 
          src={track.albumArt} 
          alt={track.album}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold leading-tight" data-testid="text-track-name">
          {track.name}
        </h2>
        <p className="text-muted-foreground" data-testid="text-artist-name">
          {track.artists.join(", ")}
        </p>
        <p className="text-sm text-muted-foreground" data-testid="text-album-name">
          {track.album}
        </p>
      </div>

      <div className="space-y-2">
        <Progress value={progress} data-testid="progress-playback" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span data-testid="text-current-time">
            {formatTime(track.currentPosition || 0)}
          </span>
          <span data-testid="text-duration">
            {formatTime(track.duration)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button 
          size="icon" 
          variant="ghost"
          onClick={onPrevious}
          data-testid="button-previous"
        >
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button 
          size="icon"
          onClick={onPlayPause}
          data-testid="button-play-pause"
        >
          {track.isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <Button 
          size="icon" 
          variant="ghost"
          onClick={onNext}
          data-testid="button-next"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Progress value={70} className="flex-1" />
      </div>
    </Card>
  );
}
