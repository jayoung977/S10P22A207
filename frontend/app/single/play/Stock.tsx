"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowUp, faArrowDown, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Stock({ index, data, isSelected, onClick }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const rate: number = (data.volatility / data.TodayEndPrice * 100);

  const bgColor = isSelected ? "small-10" : "yellow-200";
  const textColor = rate > 0 ? "small-3" : (rate < 0 ? "small-1" : rate == 0 && "textColor-1")
  return (
    <div
      className={`hover:cursor-pointer grid grid-cols-8 rounded-full bg-${bgColor} text-${textColor} hover:bg-small-10 hover:text-textColor-2 my-5 mx-1 py-1`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="col-span-1 text-center ml-1" style={{ fontSize: "13px" }}>
        {index + 1}.
      </div>
      <div className={`${!isHovered && "hidden"} col-span-7 flex items-center justify-center`}>
        <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#FFFFFF" }} />
      </div>
        {
          rate < 0 ? (
            <div className={`${isHovered && "hidden"} col-span-7 grid grid-cols-7 text-blue-500`}>
              <div className="col-span-4 flex items-end justify-end mr-1" style={{ fontSize: "13px" }}>
                <div className="">{parseFloat(rate.toFixed(1))}%({data.volatility})</div>
              </div>
              <div className="col-span-3 flex items-end justify-end mr-2" style={{ fontSize: "13px" }}>{data.TodayEndPrice}원</div>
            </div>
          ) : rate > 0 ? (
            <div className={`${isHovered && "hidden"} col-span-7 grid grid-cols-7 text-red-500`}>
             <div className="col-span-4 flex items-end justify-end mr-1" style={{ fontSize: "13px" }}>
                <div className="">{parseFloat(rate.toFixed(1))}%(+{data.volatility})</div>
              </div>
              <div className="col-span-3 flex items-end justify-end mr-2" style={{ fontSize: "13px" }}>{data.TodayEndPrice}원</div>
            </div>
          ) : (
            <div className={`${isHovered && "hidden"} col-span-7 grid grid-cols-7`}>
          <div className="col-span-4 flex items-end justify-end mr-1" style={{ fontSize: "13px" }}>
                <div className="">{parseFloat(rate.toFixed(1))}%({data.volatility})</div>
              </div>
              <div className="col-span-3 flex items-end justify-end mr-2" style={{ fontSize: "13px" }}>{data.TodayEndPrice}원</div>
            </div>
          )
        }
    </div>
  );
}
