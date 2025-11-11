import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SongMeaning } from "@shared/schema";
import { Lightbulb } from "lucide-react";

interface SongMeaningPanelProps {
  meaning: SongMeaning;
}

export default function SongMeaningPanel({ meaning }: SongMeaningPanelProps) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-primary/10 p-2 shrink-0">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="font-semibold text-lg" data-testid="text-meaning-title">
            Song Meaning
          </h3>
          <p className="text-base leading-normal text-foreground/80" data-testid="text-meaning-overview">
            {meaning.overview}
          </p>
        </div>
      </div>

      {meaning.context && (
        <div className="space-y-2 pt-2">
          <h4 className="font-medium text-sm text-muted-foreground">Context</h4>
          <p className="text-sm leading-normal text-foreground/70" data-testid="text-meaning-context">
            {meaning.context}
          </p>
        </div>
      )}

      <div className="space-y-2 pt-2">
        <h4 className="font-medium text-sm text-muted-foreground">Key Themes</h4>
        <div className="flex flex-wrap gap-2" data-testid="container-themes">
          {meaning.themes.map((theme, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              data-testid={`badge-theme-${index}`}
            >
              {theme}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
