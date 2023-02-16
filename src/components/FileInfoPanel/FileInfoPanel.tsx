import React, { useContext } from "react";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";
import Card from "../Card/Card";
import numberToTime from "../../utility/numberToTime";

function FileInfoPanel() {
  const audioFileContext = useContext(AudioFilesContext);

  return (
    <Card width="full" height="full" classes="grow shrink basis-[50%]">
      <b className="block w-full h-fit max-w-[30ch] truncate overflow-hidden">
        {audioFileContext.currentTrack?.file.name ?? "No Track Selected"}
      </b>
      <small className="block">
        <span>{numberToTime(audioFileContext.trackCurrentTime)}</span>
        <span> / </span>
        <span>{numberToTime(audioFileContext.currentTrackLength)}</span>
      </small>
    </Card>
  );
}

export default FileInfoPanel;
