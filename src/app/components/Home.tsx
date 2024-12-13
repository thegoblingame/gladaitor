"use client";

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import useIsMobile from "../hooks/useIsMobile";

export interface HomeProps {
  setMode: (mode: "home" | "game" | "death") => void;
}

export default function Home({ setMode }: HomeProps) {
  const isMobile = useIsMobile();
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-start sm:justify-between sm:min-h-screen">
      <div className="flex flex-col items-center w-full mx-8 sm:mx-0">
        <h1 className="text-3xl text-black mb-4 sm:text-6xl sm:mb-8">
          gladAItor
        </h1>

        <img
          src="/images/logo.png"
          height={isMobile ? 150 : 250}
          width={isMobile ? 150 : 250}
          alt="robot overlord"
        />
        <Button
          variant="contained"
          color="success"
          sx={{
            textTransform: "unset",
            fontFamily: "Comic Sans MS",
            fontSize: "20px",
            height: "3.5rem",
          }}
          onClick={() => {
            setMode("game");
          }}
        >
          enter the coliseum
        </Button>
        <Button
          variant="contained"
          href="/leaderboard"
          sx={{
            textTransform: "unset",
            fontFamily: "Comic Sans MS",
            fontSize: "20px",
            height: "3.5rem",
            margin: ".5rem",
          }}
        >
          view leaderboard
        </Button>
        <Accordion className="w-11/12 sm:w-9/12">
          <AccordionSummary
            className="hover:bg-cyan-400"
            expandIcon={<ExpandMore />}
          >
            <span className="text-xl sm:text-4xl">how to play</span>
          </AccordionSummary>
          <AccordionDetails>
            <p className="my-2 sm:my-4 text-md sm:text-2xl">
              You are a gladAItor, fighting in the digital coliseum for the
              entertainment of the kAIser.
            </p>
            <p className="my-2 sm:my-4 text-md sm:text-2xl">
              Each round, you are given a prompt, the kAIser&#39;s current mood,
              and 6 randomly provided answers. Pick whichever answer satisfies
              the prompt and his mood best. You may reroll your answers at the
              cost of 5 HP.
            </p>
            <p className="my-2 sm:my-4 text-md sm:text-2xl">
              Your answer will be judged against a random answer selected by
              your robot opponent. A winning answer earns you 10 HP, but a
              losing answer costs you 50 HP.
            </p>
            <p className="my-2 sm:my-4 text-md sm:text-2xl">
              Survive as long as you can.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>

      <p className="text-xs text-gray-600 self-center mt-auto sm:mb-8 sm:mt-0">
        created by{" "}
        <a
          className="font-bold hover:text-sky-600"
          href="https://x.com/thegoblingame"
          target="_blank"
        >
          the goblin game
        </a>{" "}
        | inspired by{" "}
        <a
          className="font-bold hover:text-sky-600"
          href="https://www.whatbeatsrock.com/"
          target="_blank"
        >
          what beats rock?
        </a>{" "}
      </p>
    </main>
  );
}
