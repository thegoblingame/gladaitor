"use client";

import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { DeathRecap } from "../types/types";
import { trimKey } from "../utils/helperFunctions";

export interface DeathProps {
  setMode: (mode: "home" | "game" | "death") => void;
  deathSound?: HTMLAudioElement;
  recap: DeathRecap | undefined;
}

export default function Death({ setMode, deathSound, recap }: DeathProps) {
  const [name, setName] = useState<string>("");
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [scoreMessage, setScoreMessage] = useState<string>(
    "checking if you got a high score"
  );
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const isMobile = useIsMobile();

  const checkScore = async () => {
    try {
      const response = await fetch(
        new Request(
          `https://kv-worker.gnb225.workers.dev/checkscore?score=${recap?.roundOfDeath}`
        )
      );
      if (!response.ok) {
        throw new Error("Failed to check if high score");
      }
      // can't send booleans unless it's inside of JSON so we will just do text
      const isHighScore = await response.text();
      setCanSubmit(isHighScore === "true" ? true : false);
      isHighScore === "true"
        ? undefined
        : setScoreMessage("not a high score. you suck");
    } catch (err) {
      console.log(err);
    }
  };

  const submitScore = async () => {
    // send req with stuff from recap
    const requestData = { ...recap, name };
    try {
      const response = await fetch(
        new Request("https://kv-worker.gnb225.workers.dev", {
          method: "POST",
          body: JSON.stringify(requestData),
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
      if (!response.ok) {
        throw new Error("Failed to submit score");
      }
      const message = await response.text();
      setScoreMessage(message);
      setCanSubmit(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    deathSound?.play().catch((err) => {
      console.log(err);
    });
    return () => {
      deathSound?.pause();
      if (deathSound) {
        deathSound.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    checkScore();
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
          on <span className="text-cyan-400">round {recap?.roundOfDeath}</span>{" "}
          to{" "}
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
              fontSize: isMobile ? "1.5rem" : "2rem",
              height: isMobile ? "3.5rem" : "5rem",
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
              fontSize: isMobile ? "1.5rem" : "2rem",
              height: isMobile ? "3.5rem" : "5rem",
            }}
          >
            play again
          </Button>
        </div>
        {canSubmit ? (
          <div className="flex justify-center mx-2 mt-2 sm:mx-0 sm:mt-4">
            <TextField
              error={!nameValid}
              helperText={!nameValid ? "no specials & 1-20 chars" : " "}
              className="mr-2"
              sx={{
                "& .MuiInputBase-input": {
                  backgroundColor: "white",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "1rem",
                  fontWeight: "700",
                },
              }}
              id="outlined-basic"
              label="name"
              variant="outlined"
              color="secondary"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
                if (/^[a-zA-Z0-9 _-]{1,20}$/.test(event.target.value)) {
                  setNameValid(true);
                } else {
                  setNameValid(false);
                }
              }}
              value={name}
            />
            <Button
              // for testing
              // onClick={() => submitScore()}
              onClick={recap ? () => submitScore() : undefined}
              variant="contained"
              disabled={!nameValid || !Boolean(name.length)}
              sx={{
                textTransform: "unset",
                fontFamily: "Comic Sans MS",
                fontSize: isMobile ? "1rem" : "2rem",
                height: isMobile ? "3.5rem" : "5rem",
                backgroundColor: "primary.main",
                "&.Mui-disabled": {
                  backgroundColor: "rgb(156 163 175)",
                },
              }}
            >
              submit high score
            </Button>
          </div>
        ) : (
          <div className="mt-4 text-cyan-400 text-2xl text-center sm:text-4xl sm:mt-8">
            {scoreMessage}
          </div>
        )}
      </div>
    </div>
  );
}
