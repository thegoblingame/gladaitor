"use client";

import { useState } from "react";
import Game from "./components/Game";
import Death from "./components/Death";
import Home from "./components/Home";
import { AudioProvider } from "./utils/AudioProvider.js";
import { DeathRecap } from "./types/types";
export default function App() {
  const deathSound =
    typeof window !== "undefined"
      ? new Audio("sounds/death_sound.mp3")
      : undefined;
  // const [name, setName] = useState<string>("");
  // const [nameValid, setNameValid] = useState<boolean>(true);
  const [mode, setMode] = useState<"home" | "game" | "death">("home");
  const [deathRecap, setDeathRecap] = useState<DeathRecap | undefined>(
    undefined
  );
  const home = (
    <Home setMode={(mode: "home" | "game" | "death") => setMode(mode)} />
  );

  const game = (
    <Game
      setDeathRecap={(recap: DeathRecap) => setDeathRecap(recap)}
      setMode={(mode: "home" | "game" | "death") => setMode(mode)}
    />
  );

  const death = (
    <Death
      recap={deathRecap}
      deathSound={deathSound}
      setMode={(mode: "home" | "game" | "death") => setMode(mode)}
    />
  );

  return (
    <AudioProvider>
      {mode === "home" ? home : undefined}
      {mode === "game" ? game : undefined}
      {mode === "death" ? death : undefined}
    </AudioProvider>
  );
}
