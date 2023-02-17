import React, { useState, useRef, useEffect, createContext } from "react";
import { IAudioFileContext, IInitialValue } from "../Declarations/interfaces";

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
  getFrequencyData: (fftSize: number) => {
    return new Uint8Array();
  },
};

const AudioFilesContext = createContext(initialValue);

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
  const audioAnalyzerNode = useRef<AnalyserNode>();

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

    // CREATE AUDIO GAIN NODE AND CONNECT TO AUDIO DESTINATION
    if (!audioGainNode.current) {
      audioGainNode.current = audioCtx.current.createGain();
      audioGainNode.current.connect(audioCtx.current.destination);
    }

    //  CREATE AUDIO ANALYZER NODE AND CONNECT TO GAIN NODE
    if (!audioAnalyzerNode.current) {
      audioAnalyzerNode.current = audioCtx.current.createAnalyser();
      audioAnalyzerNode.current.connect(audioGainNode.current!);
    }

    // CREATING AUDIO SOURCE NODE AND CONNECTING TO AUDIO ANALYZER NODE
    audioSourceNode.current?.disconnect();
    audioSourceNode.current = audioCtx.current.createBufferSource();
    audioSourceNode.current.addEventListener("ended", (e: Event) => {
      console.log("TRACK ENDED...");
      audioSourceNode.current!.stop();
      setIsPlaying(false);
      setTrackCurrentTime(0);
      setCurrentTrackLength(0);
      next();
    });
    audioSourceNode.current.connect(audioAnalyzerNode.current!);

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
        setTrackCurrentTime(0);
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
    setIsPlaying(false);
    // DISCONNECT CURRENT SOURCE NODE
    audioSourceNode.current!.disconnect();
    // CREATE NEW BUFFERSOURCENODE
    audioSourceNode.current = audioCtx.current!.createBufferSource();
    // ADD FILE END EVENT LISTENER
    audioSourceNode.current.addEventListener("ended", (e: Event) => {
      console.log("TRACK ENDED...");
      audioSourceNode.current!.stop();
      setIsPlaying(false);
      setTrackCurrentTime(0);
      setCurrentTrackLength(0);
      next();
    });
    // ADD CURRENT TRACK BUFFER TO SOURCE NODE
    audioSourceNode.current!.buffer = currentTrackAudioBuffer.current!;
    // CONNECTE SOURCE NODE TO AUDIO GAIN NODE
    audioSourceNode.current.connect(audioAnalyzerNode.current!);
    // START TRACK AT SPECIFIED TIME
    audioSourceNode.current!.start(0, seekTo);
    // SET TIME ON CURRENT TIME DISPLAY
    setTrackCurrentTime(seekTo);
    setIsPlaying(true);
  }

  function getFrequencyData(fftSize: number) {
    audioAnalyzerNode.current!.fftSize = fftSize;
    const dataArray = new Uint8Array(
      audioAnalyzerNode.current!.frequencyBinCount
    );
    audioAnalyzerNode.current?.getByteFrequencyData(dataArray);
    return dataArray;
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
        getFrequencyData: getFrequencyData,
      }}
    >
      {props.children}
    </AudioFilesContext.Provider>
  );
}

export { AudioFilesContext };
export default AudioFilesContextProvider;
