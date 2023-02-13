import React from "react";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

function Dashboard() {
  return (
    <div
      className={`absolute inset-0 top-[50%] translate-y-[-50%] z-[10] w-[90%] h-[90%] mx-auto flex flex-row items-center justify-items-stretch gap-4 bg-white/10 backdrop-blur-sm rounded-md`}
    >
      {/* WEATHER PANEL */}
      <WeatherDisplay />
      {/* MUSIC PLAYER */}
      <MusicPlayer />
    </div>
  );
}

export default Dashboard;
