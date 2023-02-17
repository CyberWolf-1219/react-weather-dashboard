import { ReactNode } from "react";

export interface IAudioFileContext {
  children: ReactNode | ReactNode[];
}

export interface IInitialValue {
  trackFiles: Array<File> | undefined;
  currentTrack: { index: number; file: File } | undefined;
  setAudioFiles: React.Dispatch<React.SetStateAction<Array<File>>> | undefined;
  setCurrentFile:
    | React.Dispatch<
        React.SetStateAction<{ index: number; file: File } | undefined>
      >
    | undefined;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (level: number) => void;
  seekTo: (time: number) => void;
  isPlaying: boolean;
  trackCurrentTime: number;
  currentTrackLength: number;
  getFrequencyData: (fftSize: number) => Uint8Array;
}
