import React, { useEffect, useRef } from "react";

const bg_videos = [
  { lg: "/Nature.mp4", sm: "MOBILE-Nature.mp4" },
  { lg: "/Mount-Fuji.mp4", ms: "/MOBILE-Mount-Fuji.mp4" },
  { lg: "/Raining-Outside.mp4", sm: "/MOBILE-Raining-Outside.mp4" },
];

const video = bg_videos[Math.floor(Math.random() * 3)].lg;

function Background() {
  return (
    <div className={`absolute inset-0 z-[5] w-screen h-screen`}>
      <video
        autoPlay={true}
        muted={true}
        controls={false}
        loop={true}
        className={`w-full h-full object-cover`}
      >
        <source src={video} type="video/mp4" />
      </video>
      {/* OVERLAY */}
      <div
        className={`absolute z-[5] inset-0 w-full h-full backdrop-blur-[0.5px]`}
      ></div>
    </div>
  );
}

export default Background;
