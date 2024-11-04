import React, { useEffect, useRef } from "react";

export interface TextStreamerProps {
  text: string;
  speed: number;
  size: "small" | "big";
}

const TextStreamer = ({ text, speed, size }: TextStreamerProps) => {
  const sounds = [
    "a",
    "chi",
    "e",
    "fu",
    "ha",
    "he",
    "hi",
    "ho",
    "i",
    "ka",
    "ke",
    "ki",
    "ko",
    "ku",
    "ma",
    "me",
    "mi",
    "mo",
    "mu",
    "na",
    "ne",
    "ni",
    "no",
    "nu",
    "o",
    "re",
    "ri",
    "ro",
    "ru",
    "sa",
    "se",
    "shi",
    "so",
    "su",
    "ta",
    "te",
    "to",
    "tsu",
    "u",
    "wa",
    "ya",
    "yo",
    "yu",
  ];
  let textRef = useRef<HTMLParagraphElement>(null);
  let intervalRef = useRef<number | null>(null);
  useEffect(() => {
    revealText(text);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  const revealText = (revealedText: string = " ") => {
    let index = 0;
    intervalRef.current = setInterval(() => {
      const audio = new Audio(
        `sounds/${sounds[Math.floor(Math.random() * sounds.length)]}.wav`
      );
      // jank way of only playing audio 1 out of every 10 intervals
      if (index % 10 === 0) {
        audio.play();
      }
      if (index + 1 >= revealedText.length) {
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
      style={{ width: "50vw" }}
      id="streamingText"
      ref={textRef}
      className={`${
        size === "small" ? "min-h-32" : "min-h-52"
      } text-2xl mb-4 p-4 self-center border rounded border-red-600 w-full whitespace-pre-wrap`}
    ></p>
  );
};

export default TextStreamer;
