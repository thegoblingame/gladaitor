// AudioContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

export const AudioContext = createContext([]);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [robotSounds, setRobotSounds] = useState([]);

  useEffect(() => {
    // check if we're in the browser environment
    const alphabet = [
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
    const sounds =
      typeof window !== "undefined"
        ? alphabet.map((sound) => {
            const audio = new Audio(`sounds/${sound}.mp3`);
            audio.load();
            return audio;
          })
        : [];

    setRobotSounds(sounds);
  }, []);

  return (
    <AudioContext.Provider value={robotSounds}>
      {children}
    </AudioContext.Provider>
  );
};
