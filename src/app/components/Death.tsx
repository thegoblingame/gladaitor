"use client";

import { Button } from "@mui/material";
import { useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { DeathRecap } from "../types/types";
import { trimKey } from "../utils/helperFunctions";

export interface DeathProps {
  setMode: (mode: "home" | "game" | "death") => void;
  deathSound?: HTMLAudioElement;
  recap: DeathRecap | undefined;
}

export default function Death({ setMode, deathSound, recap }: DeathProps) {
  const isMobile = useIsMobile();
  useEffect(() => {
    deathSound?.play().catch((error) => {
      console.log(error);
    });
    return () => {
      deathSound?.pause();
      if (deathSound) {
        deathSound.currentTime = 0;
      }
    };
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between relative">
      <img
        className=""
        src={isMobile ? "/images/you_died_long.jpg" : "/images/you_died.jpg"}
        height="100%"
        width="100%"
        alt="why didn't you listen to yud?"
      />
      <div className="absolute" style={{ top: "55%" }}>
        <h1 className="font-bold text-center text-white text-3xl mb-4 sm:text-6xl sm:mb-8">
          you died on{" "}
          <span className="text-cyan-400">round {recap?.roundOfDeath}</span> to{" "}
          <span className="text-red-600">{trimKey(recap?.killedBy || "")}</span>
        </h1>
        <div className="flex justify-center">
          <Button
            onClick={() => setMode("home")}
            variant="contained"
            color="success"
            sx={{
              textTransform: "unset",
              fontFamily: "Comic Sans MS",
              fontSize: "2rem",
              height: "5rem",
              marginRight: "2rem",
            }}
          >
            home
          </Button>
          <Button
            onClick={() => setMode("game")}
            variant="contained"
            color="success"
            sx={{
              textTransform: "unset",
              fontFamily: "Comic Sans MS",
              fontSize: "2rem",
              height: "5rem",
            }}
          >
            play again
          </Button>
        </div>
      </div>
      {/* <TextField
        error={!nameValid}
        helperText={!nameValid ? "no specials & 1-20 chars" : " "}
        className="mr-4"
        id="outlined-basic"
        label="name"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
        value={name}
      /> */}
    </div>
  );
}
