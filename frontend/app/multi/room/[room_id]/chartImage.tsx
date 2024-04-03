"use client";
import React from "react";
import StockImage from "@/public/src/assets/images/stockPixel2.png"
import Image from "next/image";

export function ChartImage() {
  return (
    <div className="relative row-span-9">
      <Image
          src={StockImage}
          alt="background-image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
    </div>
  );
}
