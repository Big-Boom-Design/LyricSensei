import NowPlayingCard from '../NowPlayingCard';

export default function NowPlayingCardExample() {
  const mockTrack = {
    id: '1',
    name: 'Blinding Lights',
    artists: ['The Weeknd'],
    album: 'After Hours',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    duration: 200000,
    currentPosition: 80000,
    isPlaying: true
  };

  return (
    <div className="max-w-sm">
      <NowPlayingCard 
        track={mockTrack}
        onPlayPause={() => console.log('Play/Pause clicked')}
        onNext={() => console.log('Next clicked')}
        onPrevious={() => console.log('Previous clicked')}
      />
    </div>
  );
}
