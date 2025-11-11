import { Card } from "@/components/ui/card";
import { SpotifyTrack } from "@shared/schema";

interface SearchResultCardProps {
  track: SpotifyTrack;
  onClick?: () => void;
}

export default function SearchResultCard({ track, onClick }: SearchResultCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all"
      onClick={onClick}
      data-testid={`card-track-${track.id}`}
    >
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={track.albumArt} 
          alt={track.album}
          className="w-full h-full object-cover"
          data-testid={`img-album-art-${track.id}`}
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-semibold leading-tight truncate" data-testid={`text-track-name-${track.id}`}>
          {track.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate" data-testid={`text-artist-${track.id}`}>
          {track.artists.join(", ")}
        </p>
      </div>
    </Card>
  );
}
