import React, { useContext, useState } from "react";

import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";
import Card from "../Card/Card";

function ControlsPanel() {
  // CONNECT PLAY BTN TO CONTEXT
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
        defaultValue={0.5}
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
        max={100}
        min={0}
        step={0.1}
        className="w-full h-fit"
      />
      {/* BUTTON CONTAINER */}
      <div className="w-fit h-fit mx-auto p-4 flex flex-row items-center justify-center gap-4">
        <button onClick={previous}>
          <GrFormPrevious size={`2rem`} color={`#000000`} />
        </button>
        <button onClick={playButtonClickHandler}>
          {audioFileContext.isPlaying ? (
            <BsPauseCircle size={`2rem`} color={`#000000`} />
          ) : (
            <BsPlayCircle size={`2rem`} color={`#000000`} />
          )}
        </button>
        <button onClick={next}>
          <GrFormNext size={`2rem`} color={`#000000`} />
        </button>
      </div>
    </Card>
  );
}

export default ControlsPanel;
