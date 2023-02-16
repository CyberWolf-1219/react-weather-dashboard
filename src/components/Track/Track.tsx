import React, { useContext } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";
import Card from "../Card/Card";

interface ITrack {
  index: number;
  trackName: string;
  artist?: string;
  length: number;
}

function Track(props: ITrack) {
  const audioFileContext = useContext(AudioFilesContext);

  function play(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const fileToPlay = audioFileContext.trackFiles![props.index];
    const currentFile = { index: props.index, file: fileToPlay };
    audioFileContext.setCurrentFile!(currentFile);
  }

  return (
    <Card width="full" height="fit" classes="bg-white/5 text-white">
      <div className="flex flex-row items-center justify-between">
        <span className="grow shrink basis-[90%] flex flex-col">
          <b className="w-full max-w-[40ch] h-fit min-h-[30px] overflow-hidden truncate">
            {props.trackName}
          </b>
          <div className="flex flex-row items-center justify-start gap-4">
            <span>
              <small>Artist: {props.artist ?? "Unknown"}</small>
            </span>
            <span className="">
              <small>Size: {props.length}B</small>
            </span>
          </div>
        </span>
        <span className="grow shrink basis-[10%]">
          <button
            onClick={play}
            className="w-fit h-fit p-2 rounded-full bg-white/30 backdrop-blur-sm shadow-[0px_0px_8px_1px] shadow-white/50"
          >
            <BsPlayCircle size={`2.5rem`} color="black" />
          </button>
        </span>
      </div>
      <hr className="w-full h-auto border-[1.5px] " />
    </Card>
  );
}

export default Track;
