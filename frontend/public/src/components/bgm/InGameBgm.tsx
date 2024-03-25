"use client";

import React, { useRef, useEffect, useState } from "react";
import bgm from "../../../../static/sounds/yellow.mp3";
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// Prod. 브금공방
// Back in my days -
// https://www.youtube.com/watch?v=l42cvwj9OpI
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

export default function InGameBgm() {
  const audioRef = useRef<HTMLAudioElement>(null);
  // 음소거 상태 관리를 위한 state 추가
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0.0 : 0.1; // 음소거 상태에 따라 볼륨 조절
      audioRef.current.loop = true;
    }
  }, [isMuted]); // 의존성 배열에 isMuted 추가

  // 음소거 상태를 토글하는 함수
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} autoPlay>
        <source src={bgm} type="audio/mpeg" />
      </audio>
      {/* 음소거 버튼 추가 */}
      <button
        className="fixed right-4 top-4"
        onClick={toggleMute}
        style={{ zIndex: "9999" }}
      >
        {!isMuted ? (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 6.037c0-1.724-1.978-2.665-3.28-1.562L5.638 7.933H4c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
            <path
              fillRule="evenodd"
              d="M14.786 7.658a.988.988 0 0 1 1.414-.014A6.135 6.135 0 0 1 18 12c0 1.662-.655 3.17-1.715 4.27a.989.989 0 0 1-1.414.014 1.029 1.029 0 0 1-.014-1.437A4.085 4.085 0 0 0 16 12a4.085 4.085 0 0 0-1.2-2.904 1.029 1.029 0 0 1-.014-1.438Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M17.657 4.811a.988.988 0 0 1 1.414 0A10.224 10.224 0 0 1 22 12c0 2.807-1.12 5.35-2.929 7.189a.988.988 0 0 1-1.414 0 1.029 1.029 0 0 1 0-1.438A8.173 8.173 0 0 0 20 12a8.173 8.173 0 0 0-2.343-5.751 1.029 1.029 0 0 1 0-1.438Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 6.037c0-1.724-1.978-2.665-3.28-1.562L7.638 7.933H6c-1.105 0-2 .91-2 2.034v4.066c0 1.123.895 2.034 2 2.034h1.638l4.082 3.458c1.302 1.104 3.28.162 3.28-1.562V6.037Z" />
          </svg>
        )}
      </button>
    </>
  );
}
