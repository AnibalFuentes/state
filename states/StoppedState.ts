import { MusicPlayerContext, PlayerState } from '@/types/PayerState.interface';
import { PlayingState } from './PlayingState';

export class StoppedState implements PlayerState {
  play(context: MusicPlayerContext): string {
    context.setState(new PlayingState());
    return `▶️ Reproduciendo: ${context.getCurrentTrack()}`;
  }

  pause(context: MusicPlayerContext): string {
    return "⚠️ No se puede pausar. El reproductor está detenido.";
  }

  stop(context: MusicPlayerContext): string {
    return "⚠️ El reproductor ya está detenido.";
  }

  getStateName(): string {
    return "Detenido";
  }

  getColor(): string {
    return "bg-gray-500";
  }
}