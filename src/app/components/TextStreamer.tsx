import React, { useState, useEffect } from 'react';

export interface TextStreamerProps {
    text: string,
    speed: number
  }

const TextStreamer = ({ text, speed}: TextStreamerProps) => {
    useEffect(() => {
        revealText(text);
      },[])

    const revealText = (revealedText: string) => {
        let index = 0;
        let target = document.getElementById("streamingText");
        
        const intervalId = setInterval(() => {
          if (index + 1 >= revealedText.length) {
            clearInterval(intervalId);
          }
          if (target) {
            target.innerText += revealedText[index]
          };
          console.log(index,revealedText[index]);

          index++;
        }, speed);
    }

  return <p id="streamingText" className="text-2xl mx-4"></p>;
};

export default TextStreamer;