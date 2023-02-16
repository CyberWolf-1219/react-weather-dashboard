import React, { useContext, useState, useEffect } from "react";

import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";
import Card from "../Card/Card";

function ControlsPanel() {
  const audioFileContext = useContext(AudioFilesContext);

  function playButtonClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (audioFileContext.isPlaying) {
      audioFileContext.pause();
    } else {
      audioFileContext.play();
    }
  }

  function next(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    audioFileContext.next();
  }
  function previous(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    audioFileContext.previous();
  }

  function volumeSlider(e: React.ChangeEvent<HTMLInputElement>) {
    audioFileContext.setVolume(parseFloat(e.currentTarget.value));
  }

  function seek(e: React.FormEvent<HTMLInputElement>) {
    console.log(e.currentTarget.value);
    audioFileContext.seekTo(parseFloat(e.currentTarget.value));
  }

  return (
    <Card width="full" height="fit" classes="grow shrink basis-[50%]">
      <label htmlFor="volume_control">Volume:</label>
      <input
        type="range"
        name=""
        id=""
        min={0}
        max={2}
        step={0.01}
        defaultValue={1}
        onChange={(e) => {
          volumeSlider(e);
        }}
        className="w-full h-fit"
      />
      <label htmlFor="seek_control">Time:</label>
      <input
        type="range"
        name=""
        id=""
        max={audioFileContext.currentTrackLength}
        min={0}
        step={1}
        value={audioFileContext.trackCurrentTime}
        onInput={(e) => {
          seek(e);
        }}
        className="w-full h-fit"
      />
      {/* BUTTON CONTAINER */}
      <div className="w-fit h-fit mx-auto p-4 flex flex-row items-center justify-center gap-4">
        {/* PREVIOUS */}
        <button
          onClick={previous}
          className="w-fit h-fit p-2 rounded-full bg-white/30 backdrop-blur-sm shadow-[0px_0px_8px_1px] shadow-white/50 hover:scale-105 transition-transform"
        >
          <GrFormPrevious size={`2rem`} color={"#ffffff"} />
        </button>
        {/* PLAY PAUSE */}
        <button
          onClick={playButtonClickHandler}
          className="w-fit h-fit p-2 rounded-full bg-white/30 backdrop-blur-sm shadow-[0px_0px_8px_1px] shadow-white/50 hover:scale-105 transition-transform"
        >
          {audioFileContext.isPlaying ? (
            <BsPauseCircle size={`2rem`} color={"#ffffff"} />
          ) : (
            <BsPlayCircle size={`2rem`} color={"#ffffff"} />
          )}
        </button>
        {/* NEXT */}
        <button
          onClick={next}
          className="w-fit h-fit p-2 rounded-full bg-white/30 backdrop-blur-sm shadow-[0px_0px_8px_1px] shadow-white/50 hover:scale-105 transition-transform"
        >
          <GrFormNext size={`2rem`} color={"#ffffff"} />
        </button>
      </div>
    </Card>
  );
}

export default ControlsPanel;
