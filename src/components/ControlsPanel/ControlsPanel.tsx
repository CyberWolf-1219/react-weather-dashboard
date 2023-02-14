import React, { useContext, useState } from "react";

import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";

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

  return (
    <div className="grow shrink basis-[50%] w-full h-fit p-4 bg-white rounded-lg text-black">
      <label htmlFor="volume_control">Volume:</label>
      <input
        type="range"
        name=""
        id=""
        min={0}
        max={100}
        step={1}
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
        <button>
          <GrFormPrevious size={`2rem`} color={`#000000`} />
        </button>
        <button onClick={playButtonClickHandler}>
          {audioFileContext.isPlaying ? (
            <BsPauseCircle size={`2rem`} color={`#000000`} />
          ) : (
            <BsPlayCircle size={`2rem`} color={`#000000`} />
          )}
        </button>
        <button>
          <GrFormNext size={`2rem`} color={`#000000`} />
        </button>
      </div>
    </div>
  );
}

export default ControlsPanel;
