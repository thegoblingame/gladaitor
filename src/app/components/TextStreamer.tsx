"use client";

import React, { useEffect, useRef } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { useContext } from "react";
import { AudioContext } from "../utils/AudioProvider";
export interface TextStreamerProps {
  text: string;
  speed: number;
  size: "small" | "big";
}

const TextStreamer = ({ text, speed, size }: TextStreamerProps) => {
  const isMobile = useIsMobile();
  let textRef = useRef<HTMLParagraphElement>(null);
  let intervalRef = useRef<number | null>(null);

  const robotSounds = useContext(AudioContext);

  useEffect(() => {
    if (text) {
      revealText(text);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        robotSounds.pause();
        robotSounds.currentTime = 0;
      }
    };
  }, [text]);

  const revealText = (revealedText: string = " ") => {
    let index = 0;
    robotSounds.play();
    intervalRef.current = setInterval(() => {
      if (index + 1 >= revealedText.length) {
        robotSounds.pause();
        robotSounds.currentTime = 0;
        clearInterval(intervalRef.current);
      }
      if (textRef.current) {
        textRef.current.textContent += revealedText[index];
      }
      index++;
    }, speed) as unknown as number;
  };

  return (
    <p
      style={{ width: isMobile ? "95vw" : "50vw" }}
      id="streamingText"
      ref={textRef}
      className={`${
        size === "small" ? "sm:min-h-32" : "sm:min-h-52"
      } text-black mb-0 p-1 self-center border rounded border-red-600 w-full whitespace-pre-wrap min-h-16 text-lg sm:mb-4 sm:p-4 sm:text-2xl`}
    ></p>
  );
};

export default TextStreamer;
