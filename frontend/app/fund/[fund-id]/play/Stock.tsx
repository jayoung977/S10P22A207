'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Stock ({ id, index, data, isSelected, onClick } :any) {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    const bgColor = isSelected ? 'small-1' : 'small-14';
    const textColor = isSelected ? 'textColor-2' : 'textColor-1'
    return (
        <div
            className={`row-span-1 grid grid-cols-8 items-center justify-center rounded-full bg-${bgColor} text-${textColor} hover:bg-small-1 hover:text-textColor-2 active:bg-small-11 active:text-textColor-2 m-1`}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <div className="col-span-1 flex items-center justify-center pl-2">{index + 1}.</div>
            <div className="col-span-3 flex items-center justify-center">{data.name}</div>
            {
                isHovered ? (
                    <div className="col-span-4 flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} size="sm" style={{ color: "#B197FC" }} />
                    </div>
                ) : (
                    // <div className="col-span-2 flex items-center justify-center">{data.riseRate}%</div>
                    <div className="col-span-4 flex items-center justify-center">{data.price}</div>
                )

            }
      </div>
    )
}