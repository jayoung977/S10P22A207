"use client";
import React from "react";
import { Boxes } from "../public/src/components/ui/background-boxes";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-screen absolute w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
    </div>
  );
}
