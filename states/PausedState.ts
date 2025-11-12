import { MusicPlayerContext, PlayerState } from '@/types/PayerState.interface';
import { PlayingState } from './PlayingState';
import { StoppedState } from './StoppedState';

export class PausedState implements PlayerState {
  play(context: MusicPlayerContext): string {
    context.setState(new PlayingState());
    return `▶️ Continuando: ${context.getCurrentTrack()}`;
  }

  pause(context: MusicPlayerContext): string {
    return "⚠️ Ya está en pausa.";
  }

  stop(context: MusicPlayerContext): string {
    context.setState(new StoppedState());
    return `⏹️ Detenido: ${context.getCurrentTrack()}`;
  }

  getStateName(): string {
    return "Pausado";
  }

  getColor(): string {
    return "bg-yellow-500";
  }
}