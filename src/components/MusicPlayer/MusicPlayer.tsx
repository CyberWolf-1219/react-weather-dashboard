import React from "react";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import Playlist from "../Playlist/Playlist";
import SpotifySearchPanel from "../SpotifySearchPanel/SpotifySearchPanel";

function MusicPlayer() {
  return (
    <div className="grow shrink basis-[65%] w-full h-full p-4 flex flex-col items-center justify-start gap-4  border-2 border-red-500 bg-white/30 rounded-lg">
      {/* TOP COMPONENTS WRAPPER */}
      <div className="w-full h-fit flex flex-row items-end justify-start gap-4">
        {/* AUDIO VISUALIZER */}
        <AudioVisualizer />
        {/* CONTROLLS */}
        <ControlsPanel />
      </div>
      {/* BOTTOM COMPONENTS WRAPPER */}
      <div className="w-full h-full flex flex-row items-start justify-center gap-4">
        {/* SPOTIFY SEARCH */}
        <SpotifySearchPanel />
        {/* PLAYLIST */}
        <Playlist />
      </div>
    </div>
  );
}

export default MusicPlayer;
