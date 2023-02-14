import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  ReactNode,
} from "react";

interface IInitialValue {
  trackFiles: Array<File> | undefined;
  currentTrack: File | undefined;
  setAudioFiles: React.Dispatch<React.SetStateAction<Array<File>>> | undefined;
  setCurrentFile:
    | React.Dispatch<React.SetStateAction<File | undefined>>
    | undefined;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
}

const initialValue: IInitialValue = {
  trackFiles: [],
  currentTrack: undefined,
  setAudioFiles: undefined,
  setCurrentFile: undefined,
  play: () => {},
  pause: () => {},
  isPlaying: false,
};

const AudioFilesContext = createContext(initialValue);

interface IAudioFileContext {
  children: ReactNode | ReactNode[];
}

function AudioFilesContextProvider(props: IAudioFileContext) {
  const [trackFiles, setTrackFiles] = useState<Array<File>>([]);
  const [currentTrack, setCurrentTrack] = useState<File>();
  const audioBuffer = useRef<AudioBuffer>();
  const audioCtx = useRef<AudioContext>();
  const audioSourceNode = useRef<AudioBufferSourceNode>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext();
      console.log(audioCtx);
    }

    audioSourceNode.current?.disconnect();
    audioSourceNode.current = audioCtx.current.createBufferSource();
    audioSourceNode.current.connect(audioCtx.current.destination);

    currentTrack
      ?.arrayBuffer()
      .then((arrayBuffer: ArrayBuffer) => {
        console.log(`FILE ARRAYBUFFER: `, arrayBuffer);
        return audioCtx.current!.decodeAudioData(arrayBuffer);
      })
      .then((decodedAudioBuffer: AudioBuffer | undefined) => {
        console.log("FILE AUDIO BUFFER: ", audioBuffer);
        audioBuffer.current = decodedAudioBuffer;
        audioSourceNode.current!.buffer = audioBuffer?.current as AudioBuffer;
        audioSourceNode.current!.start(audioCtx.current?.currentTime);
      });
  }, [currentTrack]);

  function play() {
    audioCtx.current?.resume();
    setIsPlaying(true);
    console.log(`PLAYING AUDIO FILE`);
  }
  function pause() {
    audioCtx.current?.suspend();
    setIsPlaying(false);
    console.log(`PAUSING AUDIO FILE`);
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
        isPlaying: isPlaying,
      }}
    >
      {props.children}
    </AudioFilesContext.Provider>
  );
}

export { AudioFilesContext };
export default AudioFilesContextProvider;
