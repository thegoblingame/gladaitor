import React, { useState, useEffect, useRef } from 'react';

export interface TextStreamerProps {
    text: string,
    speed: number
  }

const TextStreamer = ({ text, speed}: TextStreamerProps) => {
  const sounds = ['a', 'chi', 'e', 'fu', 'ha', 'he', 'hi', 'ho', 'i', 'ka', 'ke', 'ki', 'ko', 'ku', 'ma', 'me', 'mi', 'mo', 'mu', 'na', 'ne', 'ni', 'no', 'nu', 'o', 're', 'ri', 'ro', 'ru', 'sa', 'se', 'shi', 'so', 'su', 'ta', 'te', 'to', 'tsu', 'u', 'wa', 'ya', 'yo', 'yu'];
  let textRef = useRef<HTMLParagraphElement>(null);
  let intervalRef = useRef<number | null>(null);
  useEffect(() => {
      revealText(text);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    },[text])

  const revealText = (revealedText: string) => {
    let index = 0;
    intervalRef.current = setInterval(() => {
        const audio = new Audio(`sounds/${sounds[Math.floor(Math.random() * sounds.length)]}.wav`);

        if (index % 5 === 0) {
          audio.play();
        }
        if (index + 1 >= revealedText.length) {
          clearInterval(intervalRef.current);
        }
        if (textRef.current) {
          textRef.current.textContent += revealedText[index]
        };
        index++;
      }, speed) as unknown as number;;
  }
    
  return <p id="streamingText" ref={textRef} className="text-2xl mx-4"></p>;
};

export default TextStreamer;