import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import numberToTime from "../utility/numberToTime";

interface IInitialValue {
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
  isPlaying: boolean;
  currentTrackTime: string;
  currentTrackLength: string;
}

const initialValue: IInitialValue = {
  trackFiles: [],
  currentTrack: undefined,
  setAudioFiles: undefined,
  setCurrentFile: undefined,
  play: () => {},
  pause: () => {},
  next: () => {},
  previous: () => {},
  setVolume: (level: number) => {},
  isPlaying: false,
  currentTrackLength: "0:00",
  currentTrackTime: "0:00",
};

const AudioFilesContext = createContext(initialValue);

interface IAudioFileContext {
  children: ReactNode | ReactNode[];
}
// =============================================================================
function AudioFilesContextProvider(props: IAudioFileContext) {
  const [trackFiles, setTrackFiles] = useState<Array<File>>([]);

  const [currentTrack, setCurrentTrack] = useState<{
    index: number;
    file: File;
  }>();
  const [currentTrackLength, setCurrentTrackLength] = useState("0:00:00");
  const [currentTrackTime, setCurrentTrackTime] = useState("0:00:00");
  const currentTrackStartTime = useRef(0);

  const audioCtx = useRef<AudioContext>();
  const audioSourceNode = useRef<AudioBufferSourceNode>();
  const audioGainNode = useRef<GainNode>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const intetrvalId = setInterval(() => {
      if (isPlaying) {
        setCurrentTrackTime(numberToTime(currentTrackStartTime.current));
        currentTrackStartTime.current += 1;
      }
    }, 1000);

    return () => {
      clearInterval(intetrvalId);
    };
  }, [isPlaying]);

  useEffect(() => {
    // CREATE AUDIO CONTEXT
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext();
    }
    // CREATE AUDIO GAIN NODE AND CONNECT TO AUIO DESTINATION
    if (!audioGainNode.current) {
      audioGainNode.current = audioCtx.current.createGain();
      audioGainNode.current.connect(audioCtx.current.destination);
    }

    // CREATING AUDIO SOURCE NODE AND CONNECTING TO AUDIO GAIN NODE
    audioSourceNode.current?.disconnect();
    audioSourceNode.current = audioCtx.current.createBufferSource();
    audioSourceNode.current.connect(audioGainNode.current);

    // CONVERTING CURRENT TRACK FILE TO ARRAYBUFFER > AUDIOBUFFER & SETTING AUDIOBUFFER AS AUDIOSOURCENODE BUFFER
    currentTrack?.file
      .arrayBuffer()
      .then((arrayBuffer: ArrayBuffer) => {
        console.log(`FILE ARRAYBUFFER: `, arrayBuffer);
        return audioCtx.current!.decodeAudioData(arrayBuffer);
      })
      .then((decodedAudioBuffer: AudioBuffer | undefined) => {
        audioSourceNode.current!.buffer = decodedAudioBuffer as AudioBuffer;
        setCurrentTrackLength(decodedAudioBuffer!.duration.toPrecision(3));
        audioSourceNode.current!.start(audioCtx.current?.currentTime);
        setIsPlaying(true);
        currentTrackStartTime.current = 0;
      });
  }, [currentTrack]);

  function play() {
    audioCtx.current?.resume();
    setIsPlaying(true);
  }

  function pause() {
    audioCtx.current?.suspend();
    setIsPlaying(false);
  }

  function next() {
    setIsPlaying(false);
    const nextTrackIndex =
      currentTrack!.index == trackFiles.length - 1
        ? 0
        : currentTrack!.index + 1;

    const nextTrack = trackFiles[nextTrackIndex];
    setCurrentTrack({ index: nextTrackIndex, file: nextTrack });
  }

  function previous() {
    setIsPlaying(false);
    const nextTrackIndex =
      currentTrack!.index == 0
        ? trackFiles.length - 1
        : currentTrack!.index - 1;

    const nextTrack = trackFiles[nextTrackIndex];
    setCurrentTrack({ index: nextTrackIndex, file: nextTrack });
  }

  function setVolume(level: number) {
    audioGainNode.current!.gain.value = level;
  }

  return (
    <AudioFilesContext.Provider
      value={{
        trackFiles: trackFiles,
        currentTrack: currentTrack,
        setAudioFiles: setTrackFiles,
        setCurrentFile: setCurrentTrack,
        play: play,
        pause: pause,
        next: next,
        previous: previous,
        setVolume: setVolume,
        isPlaying: isPlaying,
        currentTrackLength: currentTrackLength,
        currentTrackTime: currentTrackTime,
      }}
    >
      {props.children}
    </AudioFilesContext.Provider>
  );
}

export { AudioFilesContext };
export default AudioFilesContextProvider;
