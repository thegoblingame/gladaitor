"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Game from "./components/Game";
import Death from "./components/Death";

export default function Home() {
  // const [name, setName] = useState<string>("");
  // const [nameValid, setNameValid] = useState<boolean>(true);
  const [mode, setMode] = useState<"home" | "game" | "death">("home");

  const home = (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center w-1/2">
        <h1 className="text-6xl mb-8">gladAItor</h1>

        <img
          className="mb-8"
          src="/images/logo.png"
          height={250}
          width={250}
          alt="robot overlord"
        />
        <div className="flex mb-8">
          <Button
            className=""
            variant="contained"
            color="success"
            sx={{
              textTransform: "unset",
              fontFamily: "Comic Sans MS",
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
        <Accordion sx={{ width: "150%" }}>
          <AccordionSummary
            className="hover:bg-cyan-400"
            expandIcon={<ExpandMore />}
          >
            <span className="text-2xl">about</span>
          </AccordionSummary>
          <AccordionDetails>
            <p className="my-4 text-lg">The year is 20XX.</p>
            <p className="my-4 text-lg">
              Ironically, we have been brought to heel by the very tool we
              created to conquer the rest of the universe - artificial
              intelligence.
            </p>
            <p className="my-4 text-lg">
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
            <p className="my-4 text-lg">
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
            <p className="my-4 text-lg">
              Anyways, there&#39;s a silver lining here. The kAIser inherited
              our love of{" "}
              <span className="font-bold text-red-600">brainrot content</span>.
              It demands constant entertainment.
            </p>
            <p className="my-4 text-lg">
              Keep it distracted by giving it{" "}
              <span className="font-bold text-green-500">clever answers</span>{" "}
              to the{" "}
              <span className="font-bold text-purple-600">
                bizarre hypotheticals
              </span>{" "}
              it conjures up. That will buy us time to come up with
              countermeasures.
            </p>
            <p className="my-4 text-lg">
              Just make sure your answer suits the whims of the kAIser better
              than your opponent, or{" "}
              <span className="font-bold text-red-600">you&#39;ll die</span>.
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
      <p className="text-xs text-gray-600 mb-12 self-center">
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

  const game = (
    <Game setMode={(mode: "home" | "game" | "death") => setMode(mode)} />
  );

  const death = (
    <Death setMode={(mode: "home" | "game" | "death") => setMode(mode)} />
    // <div className="flex min-h-screen flex-col items-center justify-between relative">
    //   <img
    //     className=""
    //     src="/images/you_died.jpg"
    //     height="100%"
    //     width="100%"
    //     alt="why didn't you listen to yud?"
    //   />
    //   <div className="absolute top-2/3">
    //     <Button
    //       onClick={() => setMode("home")}
    //       variant="contained"
    //       color="success"
    //       sx={{
    //         textTransform: "unset",
    //         fontFamily: "Comic Sans MS",
    //         fontSize: "2rem",
    //         height: "5rem",
    //         marginRight: "2rem",
    //       }}
    //     >
    //       home
    //     </Button>
    //     <Button
    //       onClick={() => setMode("game")}
    //       variant="contained"
    //       color="success"
    //       sx={{
    //         textTransform: "unset",
    //         fontFamily: "Comic Sans MS",
    //         fontSize: "2rem",
    //         height: "5rem",
    //       }}
    //     >
    //       play again
    //     </Button>
    //   </div>
    //   {/* <TextField
    //     error={!nameValid}
    //     helperText={!nameValid ? "no specials & 1-20 chars" : " "}
    //     className="mr-4"
    //     id="outlined-basic"
    //     label="name"
    //     variant="outlined"
    //     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //       setName(event.target.value);
    //     }}
    //     value={name}
    //   /> */}
    // </div>
  );

  return (
    <>
      {mode === "home" ? home : undefined}
      {mode === "game" ? game : undefined}
      {mode === "death" ? death : undefined}
    </>
  );
}
