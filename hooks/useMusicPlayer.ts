import { useState, useCallback } from 'react';
import { MusicPlayer } from '../context/MusicPlayer';
import { DEFAULT_TRACK } from '../constants/tracks';

export function useMusicPlayer() {
  const [player] = useState(() => new MusicPlayer(DEFAULT_TRACK));
  const [, forceUpdate] = useState({});
  const [logs, setLogs] = useState<string[]>([]);

  const handleAction = useCallback((action: () => string) => {
    const message = action();
    setLogs(prev => [...prev, message]);
    forceUpdate({});
  }, []);

  const changeTrack = useCallback((track: string) => {
    player.setTrack(track);
    setLogs(prev => [...prev, `🎵 Canción cambiada a: ${track}`]);
    forceUpdate({});
  }, [player]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    player,
    logs,
    handleAction,
    changeTrack,
    clearLogs
  };
}
