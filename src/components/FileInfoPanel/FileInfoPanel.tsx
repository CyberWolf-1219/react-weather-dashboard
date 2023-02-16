import React, { useContext } from "react";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";
import Card from "../Card/Card";

function FileInfoPanel() {
  const audioFileContext = useContext(AudioFilesContext);

  return (
    <Card width="full" height="full" classes="grow shrink basis-[50%]">
      <b className="block w-full h-fit max-w-[30ch] truncate overflow-hidden">
        {audioFileContext.currentTrack?.file.name}
      </b>
      <small className="block">
        {audioFileContext.currentTrack
          ? audioFileContext.currentTrackTime
          : null}
      </small>
    </Card>
  );
}

export default FileInfoPanel;
