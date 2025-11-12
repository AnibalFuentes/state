export interface MusicPlayerContext {
  setState(state: PlayerState): void;
  getCurrentTrack(): string;
}

export interface PlayerState {
  play(context: MusicPlayerContext): string;
  pause(context: MusicPlayerContext): string;
  stop(context: MusicPlayerContext): string;
  getStateName(): string;
  getColor(): string;
}