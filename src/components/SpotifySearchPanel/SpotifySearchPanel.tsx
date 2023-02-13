import React from "react";

function SpotifySearchPanel() {
  return (
    <div className="grow shrink basis-[50%] w-auto h-full border-2 border-white bg-white/50 rounded-lg ">
      <input
        type="text"
        placeholder="Search for the songs you want..."
        className="w-full h-fit px-3 py-2 bg-white/30 text-black/80 font-semibold outline-none border-b-2 border-white placeholder:text-gray-500"
      />
    </div>
  );
}

export default SpotifySearchPanel;
