"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "../../utils/cn";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setWidthPercentage(0);
    controls.start("hidden");
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    controls.start("visible");
  };

  const rotateDeg = (widthPercentage - 50) * 0.2;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      className={cn(
        "bg-black border border-white/[0.08] w-[40rem] rounded-lg p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-48 relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={controls}
          initial={false}
          variants={{
            visible: {
              opacity: widthPercentage > 0 ? 1 : 0,
              clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
              transition: {
                duration: isMouseOver ? 0 : 0.6,
                ease: "easeInOut",
              },
            },
            hidden: {
              clipPath: `inset(0 100% 0 0)`,
              transition: {
                duration: isMouseOver ? 0 : 0.6,
                ease: "easeInOut",
              },
            },
          }}
          className="absolute bg-black z-20 will-change-transform"
        >
          <p
            style={{
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
            }}
            className="text-base sm:text-[4rem] py-10 font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          >
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
            transition: { duration: isMouseOver ? 0 : 0.6, ease: "easeInOut" },
          }}
          className="h-48 w-[8px] bg-gradient-to-b from-purple-500 via-pink-500 to-transparent absolute z-50 will-change-transform"
        ></motion.div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="text-base sm:text-[4rem] py-10 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-500">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-sm", className)}>{children}</p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(200)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.4, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
