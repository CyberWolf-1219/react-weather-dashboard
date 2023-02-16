import React from "react";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import audioFilesContextProvider from "../../contexts/AudioFilesContext";

function Dashboard() {
  return (
    <div
      className={`absolute inset-0 top-[50%] translate-y-[-50%] z-[10] w-[95%] h-[95%] mx-auto flex flex-row items-center justify-items-stretch gap-4 rounded-md`}
    >
      {/* WEATHER PANEL */}
      <WeatherDisplay />
      {/* MUSIC PLAYER */}
      <MusicPlayer />
    </div>
  );
}

export default Dashboard;
