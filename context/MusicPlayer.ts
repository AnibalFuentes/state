import { MusicPlayerContext, PlayerState } from '@/types/PayerState.interface';
import { StoppedState } from '../states/StoppedState';

export class MusicPlayer implements MusicPlayerContext {
  private state: PlayerState;
  private currentTrack: string;

  constructor(track: string) {
    this.state = new StoppedState();
    this.currentTrack = track;
  }

  setState(state: PlayerState): void {
    this.state = state;
  }

  getCurrentTrack(): string {
    return this.currentTrack;
  }

  setTrack(track: string): void {
    this.currentTrack = track;
  }

  play(): string {
    return this.state.play(this);
  }

  pause(): string {
    return this.state.pause(this);
  }

  stop(): string {
    return this.state.stop(this);
  }

  getStatus(): string {
    return this.state.getStateName();
  }

  getColor(): string {
    return this.state.getColor();
  }
}