import LyricsDisplay from '../LyricsDisplay';

export default function LyricsDisplayExample() {
  const mockLyrics = [
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
    }
  ];

  return (
    <div className="p-8 bg-background">
      <LyricsDisplay 
        lyrics={mockLyrics}
        currentLineId="2"
        onLineClick={(line) => console.log('Clicked line:', line.text)}
      />
    </div>
  );
}
