import { TRACKS } from '../constants/tracks';

interface TrackSelectorProps {
  currentTrack: string;
  onTrackChange: (track: string) => void;
}

export function TrackSelector({ currentTrack, onTrackChange }: TrackSelectorProps) {
  return (
    <div className="border-t pt-4">
      <p className="text-sm font-semibold text-gray-600 mb-3">
        Selecciona una canción:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {TRACKS.map((track) => (
          <button
            key={track}
            onClick={() => onTrackChange(track)}
            className={`p-3 rounded-lg text-left transition ${
              currentTrack === track
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {track}
          </button>
        ))}
      </div>
    </div>
  );
}
