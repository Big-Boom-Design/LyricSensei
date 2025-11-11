import SongMeaningPanel from '../SongMeaningPanel';

export default function SongMeaningPanelExample() {
  const mockMeaning = {
    overview: "Blinding Lights explores themes of loneliness, longing, and the desperate need for connection. The song captures the protagonist's journey through emotional withdrawal and the search for love after a period of isolation.",
    themes: ["Loneliness", "Redemption", "Love", "Desperation", "Urban Life"],
    context: "Released in 2019, this synthwave-inspired track became one of The Weeknd's most successful singles, blending 80s nostalgia with modern production."
  };

  return (
    <div className="max-w-2xl">
      <SongMeaningPanel meaning={mockMeaning} />
    </div>
  );
}
