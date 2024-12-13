// AudioContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

export const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [robotSounds, setRobotSounds] = useState();

  useEffect(() => {
    const yap = new Audio(`sounds/10secondsyap64.mp3`);
    yap.load();

    setRobotSounds(yap);
  }, []);

  return (
    <AudioContext.Provider value={robotSounds}>
      {children}
    </AudioContext.Provider>
  );
};
