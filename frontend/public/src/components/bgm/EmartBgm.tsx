"use client";
import React, { useRef, useEffect } from "react";
import bgm from "../../../../static/sounds/emart.mp3";

export default function EmartBgm() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      console.log("지금 재생중");
      audioRef.current.volume = 0.1; // 볼륨 조절 (0.0 ~ 1.0)
      audioRef.current.loop = true; // 반복 재생 여부
    }
  }, []);

  return (
    <audio ref={audioRef} autoPlay>
      <source src={bgm} type="audio/mpeg" />
    </audio>
  );
}
