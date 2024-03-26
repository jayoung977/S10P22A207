"use client";
import { useState } from "react";
import SingleGameStore from "@/public/src/stores/single/SingleGameStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

// 증감률
function increaseDecreaseRate(today :number, yesterday :number) :number{
  const rate:number = ((yesterday-today) / yesterday) * 100
  return parseFloat(rate.toFixed(2));
}

export default function Stock({ index, data, isSelected, onClick }: any) {
  const { selectedStockIndex, turn, todayStockInfoListData } = SingleGameStore();
  // console.log(data?.stockChartList[300+turn]?.endPrice);
  // console.log(data?.stockChartList[300+turn-1]?.endPrice);
  // console.log(increaseDecreaseRate(data?.stockChartList[300+turn]?.endPrice, data?.stockChartList[300+turn-1]?.endPrice));
  const [rate, setRate] = useState<number>(0);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const bgColor = isSelected ? "small-1" : "small-14";
  const textColor = isSelected ? "textColor-2" : "textColor-1";
  return (
    <div
      className={`hover:cursor-pointer grid grid-cols-8 rounded-full bg-${bgColor} text-${textColor} hover:bg-small-1 hover:text-textColor-2 active:bg-small-11 active:text-textColor-2 my-5 mx-1 py-1`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="col-span-2 text-center ml-1">
        종목{index + 1}
      </div>
      <div className={`${!isHovered && "hidden"} col-span-6 flex items-center justify-center`}>
        <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#FFFFFF" }} />
      </div>
      <div className={`${isHovered && "hidden"} col-span-6 grid grid-cols-7`}>
        <div className="col-span-3 text-center">{data.profitMargin.toFixed(2)}%</div>
        <div className="col-span-4 text-center">{data.TodayEndPrice}</div>
      </div>

      {/* <div className={`${isHovered && "hidden"} col-span-4 grid grid-cols-4 items-center`}>
        <div className="col-span-2">
          {
            rate > 0 ? (
              <span className="text-red-500">
                <FontAwesomeIcon icon={faArrowUp} size="sm" /> +{rate}%
              </span>
            ) : rate < 0 ? (
              <span className="text-red-500">
                <FontAwesomeIcon icon={faArrowDown} size="sm" /> {rate}%
              </span>
            ) : (
              <span>{rate}%</span>
            )
          } 
        </div>
        <div className="col-span-2">{data?.stockChartList[300+turn]?.endPrice}</div>
      </div> */}
    </div>
  );
}
