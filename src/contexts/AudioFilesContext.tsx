import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  ReactNode,
} from "react";

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
  seekTo: (time: number) => void;
  isPlaying: boolean;
  trackCurrentTime: number;
  currentTrackLength: number;
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
  seekTo: (time: number) => {},
  isPlaying: false,
  currentTrackLength: 0,
  trackCurrentTime: 0,
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
  const [currentTrackLength, setCurrentTrackLength] = useState(0);
  const [trackCurrentTime, setTrackCurrentTime] = useState(0);
  const currentTrackAudioBuffer = useRef<AudioBuffer>();

  const audioCtx = useRef<AudioContext>();
  const audioSourceNode = useRef<AudioBufferSourceNode>();
  const audioGainNode = useRef<GainNode>();

  const [isPlaying, setIsPlaying] = useState(false);

  // FOR TIME UPDATES ON FILE INFO PANEL
  useEffect(() => {
    const intetrvalId = setInterval(() => {
      if (isPlaying) {
        setTrackCurrentTime((prevVal) => (prevVal += 1));
      }
    }, 1000);

    return () => {
      clearInterval(intetrvalId);
    };
  }, [isPlaying]);

  // FOR INITIAL SETUP
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
        currentTrackAudioBuffer.current = decodedAudioBuffer; // STORE CURRENT TRACK'S BUFFER FOR SEEKING THE TRACK
        audioSourceNode.current!.buffer = decodedAudioBuffer as AudioBuffer; // SET CURRENT TRACK BUFFER AS SOURCES NODE BUFFER
        setCurrentTrackLength(Math.floor(decodedAudioBuffer!.duration));
        audioSourceNode.current!.start(0, 0);
        setIsPlaying(true);
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

  function seek(seekTo: number) {
    console.log(seekTo);
    // DISCONNECT CURRENT SOURCE NODE
    audioSourceNode.current!.disconnect();
    // CREATE NEW BUFFERSOURCENODE
    audioSourceNode.current = audioCtx.current!.createBufferSource();
    // ADD CURRENT TRACK BUFFER TO SOURCE NODE
    audioSourceNode.current!.buffer = currentTrackAudioBuffer.current!;
    // CONNECTE SOURCE NODE TO AUDIO GAIN NODE
    audioSourceNode.current.connect(audioGainNode.current!);
    // START TRACK AT SPECIFIED TIME
    audioSourceNode.current!.start(0, seekTo);
    // SET TIME ON CURRENT TIME DISPLAY
    setTrackCurrentTime(seekTo);
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
        seekTo: seek,
        isPlaying: isPlaying,
        currentTrackLength: currentTrackLength,
        trackCurrentTime: trackCurrentTime,
      }}
    >
      {props.children}
    </AudioFilesContext.Provider>
  );
}

export { AudioFilesContext };
export default AudioFilesContextProvider;
