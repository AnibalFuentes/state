import { Play, Pause, Square } from 'lucide-react';
import { MusicPlayer } from '../context/MusicPlayer';

interface PlayerControlsProps {
  player: MusicPlayer;
  onAction: (action: () => string) => void;
}

export function PlayerControls({ player, onAction }: PlayerControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => onAction(() => player.play())}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        aria-label="Reproducir"
      >
        <Play size={28} fill="white" />
      </button>
      <button
        onClick={() => onAction(() => player.pause())}
        className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        aria-label="Pausar"
      >
        <Pause size={28} />
      </button>
      <button
        onClick={() => onAction(() => player.stop())}
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
        aria-label="Detener"
      >
        <Square size={28} />
      </button>
    </div>
  );
}
