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
  isPlaying: false,
  currentTrackLength: "0:00",
  currentTrackTime: "0:00",
};

const AudioFilesContext = createContext(initialValue);

interface IAudioFileContext {
  children: ReactNode | ReactNode[];
}

function AudioFilesContextProvider(props: IAudioFileContext) {
  const [trackFiles, setTrackFiles] = useState<Array<File>>([]);

  const [currentTrack, setCurrentTrack] = useState<{
    index: number;
    file: File;
  }>();
  const [currentTrackLength, setCurrentTrackLength] = useState("0:00");
  const [currentTrackTime, setCurrentTrackTime] = useState("0:00");
  const currentTrackStartTime = useRef(0);

  const audioCtx = useRef<AudioContext>();
  const audioSourceNode = useRef<AudioBufferSourceNode>();
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
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext();
    }

    audioSourceNode.current?.disconnect();
    audioSourceNode.current = audioCtx.current.createBufferSource();
    audioSourceNode.current.connect(audioCtx.current.destination);

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
