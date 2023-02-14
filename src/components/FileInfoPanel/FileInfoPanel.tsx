import React, { useContext } from "react";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";

function FileInfoPanel() {
  const audioFileContext = useContext(AudioFilesContext);

  return (
    <div className="grow shrink basis-[50%] w-full h-full p-5 rounded-lg bg-white text-black">
      <b className="inline-block w-full h-fit max-w-[30ch] truncate overflow-hidden">
        {audioFileContext.currentTrack?.name}
      </b>
      <small>
        {audioFileContext.currentTrack
          ? `Size:${audioFileContext.currentTrack.size}`
          : null}
      </small>
    </div>
  );
}

export default FileInfoPanel;
