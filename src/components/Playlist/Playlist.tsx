import React, { useEffect, useRef, useState, useContext } from "react";
import Track from "../Track/Track";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";
import Card from "../Card/Card";

function Playlist() {
  const audioFileContext = useContext(AudioFilesContext);
  const fileInput = useRef<HTMLInputElement>(null);

  function onTrackSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFileCount = e.target.files!.length;
    const selectedFiles = e.target.files!;

    const newFiles: Array<File> = [];

    for (let i = 0; i < selectedFileCount; i++) {
      newFiles.push(selectedFiles[i]);
    }

    audioFileContext.setAudioFiles!([
      ...audioFileContext.trackFiles!,
      ...newFiles,
    ]);
  }

  return (
    <Card
      width="full"
      height="full"
      classes="grow shrink flex flex-col items-start justify-start"
    >
      <input
        ref={fileInput}
        type="file"
        name="audio_files"
        id="audio_file_input"
        accept="audio/*"
        multiple={true}
        onChange={(e) => {
          onTrackSelect(e);
        }}
        className="shrink grow basis-[8%] w-full max-h-[50px] h-fit p-2 border-b-2 border-gray-500 text-gray-500"
      />
      {/* TRACK CONTAINER */}
      <div className="shrink grow basis-[90%] w-full h-full max-h-[280px] overflow-y-scroll">
        {/* TRACK */}
        {audioFileContext.trackFiles?.map((track, index) => {
          return (
            <Track
              key={`track_${Math.random()}`}
              trackName={track.name}
              index={index}
              length={track.size}
            />
          );
        })}
      </div>
    </Card>
  );
}

export default Playlist;
