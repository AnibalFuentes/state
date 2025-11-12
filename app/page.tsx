"use client";

import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { PlayerDisplay } from "../components/PlayerDisplay";
import { PlayerControls } from "../components/PlayerControls";
import { TrackSelector } from "../components/TrackSelector";
import { ActionLog } from "../components/ActionLog";

export default function MusicPlayerPage() {
  const { player, logs, handleAction, changeTrack, clearLogs } =
    useMusicPlayer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Patrón de Diseño: State
          </h1>
          <p className="text-blue-200">
            Arquitectura Limpia y Separación de Responsabilidades
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <PlayerDisplay player={player} />
          <PlayerControls player={player} onAction={handleAction} />
          <TrackSelector
            currentTrack={player.getCurrentTrack()}
            onTrackChange={changeTrack}
          />
        </div>

        <ActionLog logs={logs} onClear={clearLogs} />
      </div>
    </div>
  );
}
