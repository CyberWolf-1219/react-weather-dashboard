import React, { useRef, useEffect, useContext } from "react";
import Card from "../Card/Card";

import FrequencyVisualizer from "../../utility/canvasApi";
import { AudioFilesContext } from "../../contexts/AudioFilesContext";
("../../utility/canvasApi");

function AudioVisualizer() {
  const audioFileContext = useContext(AudioFilesContext);
  const canvas = useRef<HTMLCanvasElement>(null);
  const visualizer = useRef<FrequencyVisualizer>();

  useEffect(() => {
    visualizer.current = new FrequencyVisualizer(canvas.current!, 128);

    visualizer.current.calculateCircumference(1);
    visualizer.current.calculateRadius();

    let intervalID: number;
    if (audioFileContext.isPlaying) {
      intervalID = setInterval(() => {
        const dataArray = audioFileContext.getFrequencyData(512);
        visualizer.current!.draw(dataArray);
      }, 16);
    }

    return () => {
      visualizer.current = undefined;
      clearInterval(intervalID);
    };
  }, [audioFileContext.isPlaying]);

  return (
    <Card width="auto" height="full" classes="aspect-[1/1]">
      <canvas ref={canvas} className="w-full h-full"></canvas>
    </Card>
  );
}

export default AudioVisualizer;
