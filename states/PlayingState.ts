import { MusicPlayerContext, PlayerState } from '@/types/PayerState.interface';
import { PausedState } from './PausedState';
import { StoppedState } from './StoppedState';

export class PlayingState implements PlayerState {
  play(context: MusicPlayerContext): string {
    return "⚠️ Ya se está reproduciendo.";
  }

  pause(context: MusicPlayerContext): string {
    context.setState(new PausedState());
    return `⏸️ Pausado: ${context.getCurrentTrack()}`;
  }

  stop(context: MusicPlayerContext): string {
    context.setState(new StoppedState());
    return `⏹️ Detenido: ${context.getCurrentTrack()}`;
  }

  getStateName(): string {
    return "Reproduciendo";
  }

  getColor(): string {
    return "bg-green-500";
  }
}