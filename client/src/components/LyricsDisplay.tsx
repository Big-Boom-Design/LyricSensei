import { useState } from "react";
import { LyricLine } from "@shared/schema";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LyricsDisplayProps {
  lyrics: LyricLine[];
  currentLineId?: string;
  onLineClick?: (line: LyricLine) => void;
}

export default function LyricsDisplay({ 
  lyrics, 
  currentLineId,
  onLineClick 
}: LyricsDisplayProps) {
  const [expandedLineId, setExpandedLineId] = useState<string | null>(null);

  const handleLineClick = (line: LyricLine) => {
    if (line.meaning) {
      setExpandedLineId(expandedLineId === line.id ? null : line.id);
    }
    onLineClick?.(line);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {lyrics.map((line) => {
        const isCurrent = line.id === currentLineId;
        const isExpanded = line.id === expandedLineId;
        const hasMeaning = !!line.meaning;

        return (
          <div 
            key={line.id} 
            className="space-y-2"
            data-testid={`lyric-line-${line.id}`}
          >
            <div
              className={`
                text-lg leading-relaxed transition-all cursor-pointer
                ${isCurrent ? 'text-foreground font-medium border-l-4 border-primary pl-4 scale-[1.02]' : 'text-foreground/80'}
                ${hasMeaning ? 'hover-elevate active-elevate-2 rounded-md p-3 -ml-3' : ''}
              `}
              onClick={() => handleLineClick(line)}
              data-testid={`button-lyric-${line.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span>{line.text}</span>
                {hasMeaning && (
                  <span className="text-muted-foreground shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                )}
              </div>
            </div>

            {isExpanded && line.meaning && (
              <div 
                className="bg-accent/50 rounded-md p-4 ml-0 text-base border border-accent-border animate-accordion-down"
                data-testid={`meaning-${line.id}`}
              >
                <p className="text-accent-foreground leading-normal">
                  {line.meaning}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
