import React, { useState, useEffect, useRef } from "react";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import Playlist from "../Playlist/Playlist";
import FileInfoPanel from "../FileInfoPanel/FileInfoPanel";

function MusicPlayer() {
  return (
    <div className="grow shrink basis-[65%] w-full h-full p-4 flex flex-col items-center justify-start gap-4  bg-transparent rounded-lg">
      {/* TOP COMPONENTS WRAPPER */}
      <div className="w-full h-fit flex flex-row items-end justify-start gap-4">
        {/* AUDIO VISUALIZER */}
        <AudioVisualizer />
        <div className="w-full h-full flex flex-col items-center justify-start gap-4">
          {/* FILE INFO PANEL */}
          <FileInfoPanel />
          {/* CONTROLLS */}
          <ControlsPanel />
        </div>
      </div>
      {/* BOTTOM COMPONENTS WRAPPER */}
      <div className="w-full h-full flex flex-row items-start justify-center gap-4">
        {/* PLAYLIST */}
        <Playlist />
      </div>
    </div>
  );
}

export default MusicPlayer;
