import SearchResultCard from '../SearchResultCard';

export default function SearchResultCardExample() {
  const mockTracks = [
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
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mockTracks.map(track => (
        <SearchResultCard 
          key={track.id} 
          track={track}
          onClick={() => console.log('Clicked:', track.name)}
        />
      ))}
    </div>
  );
}
