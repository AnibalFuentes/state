import { Music } from 'lucide-react';
import { MusicPlayer } from '../context/MusicPlayer';

interface PlayerDisplayProps {
  player: MusicPlayer;
}

export function PlayerDisplay({ player }: PlayerDisplayProps) {
  return (
    <>
      <div className="flex items-center justify-center mb-6">
        <div className={`w-4 h-4 rounded-full ${player.getColor()} mr-3 animate-pulse`}></div>
        <h2 className="text-2xl font-bold text-gray-800">
          Estado: {player.getStatus()}
        </h2>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-center">
          <Music className="text-purple-600 mr-3" size={32} />
          <p className="text-xl font-semibold text-gray-800">
            {player.getCurrentTrack()}
          </p>
        </div>
      </div>
    </>
  );
}