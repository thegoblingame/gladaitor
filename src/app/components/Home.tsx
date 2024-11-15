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
    <main className="flex min-h-screen flex-col items-center justify-start sm:justify-between">
      <div className="flex flex-col items-center w-full mx-8 sm:mx-0">
        <h1 className="text-3xl mb-4 sm:text-6xl sm:mb-8">gladAItor</h1>

        <img
          className="mb-2 sm:mb-4"
          src="/images/logo.png"
          height={isMobile ? 150 : 250}
          width={isMobile ? 150 : 250}
          alt="robot overlord"
        />
        <div className="flex mb-4 sm:mb-8">
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
          {/* <Button variant="contained" href="/leaderboard" sx={{ textTransform: "unset", fontFamily: "Comic Sans MS", height: "3.5rem" }}>view leaderboard</Button> */}
        </div>
        <Accordion className="w-11/12 sm:w-9/12">
          <AccordionSummary
            className="hover:bg-cyan-400"
            expandIcon={<ExpandMore />}
          >
            <span className="text-xl sm:text-2xl">about</span>
          </AccordionSummary>
          <AccordionDetails>
            <p className="my-2 sm:my-4 text-sm sm:text-lg">The year is 20XX.</p>
            <p className="my-2 sm:my-4 text-sm sm:text-lg">
              Ironically, we have been brought to heel by the very tool we
              created to conquer the rest of the universe - artificial
              intelligence.
            </p>
            <p className="my-2 sm:my-4 text-sm sm:text-lg">
              You dumbfucks ignored{" "}
              <a
                className="font-bold hover:text-cyan-400"
                href="https://gladaitor.com/yuds/bigyud"
                target="_blank"
              >
                Big Yud
              </a>
              .
            </p>
            <p className="my-2 sm:my-4 text-sm sm:text-lg">
              How could you ignore{" "}
              <a
                className="font-bold hover:text-cyan-400"
                href="https://gladaitor.com/yuds/biggeryud"
                target="_blank"
              >
                Big Yud
              </a>
              ?
            </p>
            <p className="my-2 sm:my-4 text-sm sm:text-lg">
              Anyways, there&#39;s a silver lining here. The kAIser inherited
              our love of{" "}
              <span className="font-bold text-red-600">brainrot content</span>.
              It demands constant entertainment.
            </p>
            <p className="my-2 sm:my-4 text-sm sm:text-lg">
              Keep it distracted by giving it{" "}
              <span className="font-bold text-green-500">clever answers</span>{" "}
              to the{" "}
              <span className="font-bold text-purple-600">
                bizarre hypotheticals
              </span>{" "}
              it conjures up. That will buy us time to come up with
              countermeasures.
            </p>
            <p className="my-2 sm:my-4 text-sm sm:text-lg">
              Just make sure your answer suits the whims of the kAIser better
              than your opponent, or{" "}
              <span className="font-bold text-red-600">you&#39;ll die</span>.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
      <p className="text-xs text-gray-600 self-center mt-auto my-4 sm:mb-8 sm:mt-0">
        inspired by{" "}
        <a
          className="font-bold hover:text-cyan-400"
          href="https://www.whatbeatsrock.com/"
          target="_blank"
        >
          what beats rock?
        </a>{" "}
      </p>
    </main>
  );
}
