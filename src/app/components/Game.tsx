"use client";

import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import hypotheticals from "../utils/hypotheticals.json";
import Weapon from "./Weapon";
import { AggregatorOutput, promptAggregator } from "../utils/promptAggregator";
import TextStreamer from "./TextStreamer";
import useIsMobile from "../hooks/useIsMobile";
import { DeathRecap } from "../types/types";
import { trimKey } from "../utils/helperFunctions";

export interface GameProps {
  setMode: (mode: "home" | "game" | "death") => void;
  setDeathRecap: (recap: DeathRecap) => void;
}

export interface GPTResponse {
  explanation: string;
  winner: "player" | "enemy";
}

export default function Game({ setMode, setDeathRecap }: GameProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [humanWeaponKeys, setHumanWeaponKeys] = useState<string[]>([]);
  const [humanAnswer, setHumanAnswer] = useState<string>("");
  const [enemyWeaponKeys, setEnemyWeaponKeys] = useState<string[]>([]);
  const [enemyAnswer, setEnemyAnswer] = useState<string>("");
  const [roundCounter, setRoundCounter] = useState<number>(1);
  const [roundOver, setRoundOver] = useState<boolean>(false);
  const [overlordMood, setOverlordMood] = useState<string>("logical");
  const [shuffledHypotheticalIndexes, setShuffledHypotheticalIndexes] =
    useState<number[]>([]);
  const [currentHypothetical, setCurrentHypothetical] = useState<string>("");
  const [currentVerdict, setCurrentVerdict] = useState<GPTResponse | undefined>(
    undefined
  );
  const [playerHP, setPlayerHP] = useState<number>(100);
  const isMobile = useIsMobile();

  const smallTheme = createTheme({
    components: {
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "0px",
          },
        },
      },
    },
  });

  const bigTheme = createTheme({
    components: {
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "0px",
          },
          title: {
            fontSize: "24px",
          },
        },
      },
    },
  });

  const lossPenalty = 50;
  const winBonus = 10;
  const rerollCost = 5;
  const moods = ["logical", "humorous", "weird", "cheerful", "cynical"];
  const enemies = [
    "clippy.png",
    "jeeves.png",
    "netscape.png",
    "nokia.png",
    "msn.png",
    "rover.png",
    "aol.png",
    "limewire.png",
    "napster.png",
    "akinator.png",
  ];

  const getEnemyFilename = (round: number) => {
    return enemies[(round - 1) % enemies.length];
  };

  const trimResponse = (response: string, regex: RegExp) => {
    return response?.replaceAll(regex, "");
  };

  const preselectHypotheticals = () => {
    // some ts issue about how older browsers cant do this, fuck em
    // @ts-ignore
    const shuffledIndexes = [...Array(hypotheticals.length).keys()];
    for (let i = shuffledIndexes.length - 1; i >= 0; i--) {
      let randomInt = Math.floor(Math.random() * (i + 1));
      [shuffledIndexes[i], shuffledIndexes[randomInt]] = [
        shuffledIndexes[randomInt],
        shuffledIndexes[i],
      ];
    }
    setShuffledHypotheticalIndexes(shuffledIndexes);
  };

  // requests will specify which category of weapon we want, but ultimately they will all be put in the same array for the sake of convenience
  // this works bc the URLS are just category/imagekey
  const fetchWeapons = async (count: number, category: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://r2-worker.gnb225.workers.dev?count=${count}&category=${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weapons");
      }
      const data = await response.json();
      if (
        !Array.isArray(data) ||
        !data.every((item) => typeof item === "string")
      ) {
        throw new Error(
          "data is either not an array or has items in the array that are not strings"
        );
      }
      return data;
    } catch (err) {
      // setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeaponsWrapper = async (player: string) => {
    Promise.all([
      fetchWeapons(3, "generic_weapons"),
      fetchWeapons(3, "unusual_weapons"),
    ]).then((responses) => {
      if (responses[0] && responses[1]) {
        if (player === "human") {
          setHumanWeaponKeys([...responses[0], ...responses[1]]);
        }
        if (player === "enemy") {
          setEnemyWeaponKeys([...responses[0], ...responses[1]]);
        }
      }
    });
  };

  const submitAnswers = (playerAnswer: string) => {
    // this function looks a bit weird because it takes playeranswer as an argument but just calculates the enemy answer with rng
    const trimmedPlayerAnswer = trimKey(playerAnswer);
    let enemyAnswer =
      enemyWeaponKeys[Math.floor(Math.random() * enemyWeaponKeys.length)];
    let trimmedEnemyAnswer = trimKey(enemyAnswer);
    while (trimmedPlayerAnswer === trimmedEnemyAnswer) {
      enemyAnswer =
        enemyWeaponKeys[Math.floor(Math.random() * enemyWeaponKeys.length)];
      trimmedEnemyAnswer = trimKey(enemyAnswer);
    }
    setHumanAnswer(playerAnswer);
    setEnemyAnswer(enemyAnswer);
    const prompt = promptAggregator({
      mood: overlordMood,
      hypothetical: currentHypothetical,
      playerAnswer: trimmedPlayerAnswer,
      enemyAnswer: trimmedEnemyAnswer,
    });
    fetchVerdict(prompt);
  };

  const fetchVerdict = async (prompt: AggregatorOutput) => {
    setLoading(true);
    try {
      const response = await fetch(`https://oai-worker.gnb225.workers.dev`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch weapons");
      }
      const data: GPTResponse = await response.json();
      setCurrentVerdict(data);
      setRoundOver(true);
      // return data;
    } catch (err) {
      // setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const reroll = () => {
    if (playerHP > rerollCost && !roundOver) {
      setPlayerHP((prevHP) => prevHP - rerollCost);
      fetchWeaponsWrapper("human");
    }
  };

  useEffect(() => {
    preselectHypotheticals();
  }, []);

  useEffect(() => {
    if (shuffledHypotheticalIndexes.length > 0) {
      setCurrentHypothetical(
        hypotheticals[shuffledHypotheticalIndexes[roundCounter - 1]]?.text
      );
    }
  }, [shuffledHypotheticalIndexes]);

  useEffect(() => {
    setRoundOver(false);
    // set the weapons for player and enemy respectively
    // fetchWeaponsWrapper("human");
    // fetchWeaponsWrapper("enemy");
    setCurrentHypothetical(
      hypotheticals[
        shuffledHypotheticalIndexes[
          (roundCounter - 1) % shuffledHypotheticalIndexes.length
        ]
      ]?.text
    );
    const randomMood = Math.floor(Math.random() * moods.length);
    setOverlordMood(moods[randomMood]);
  }, [roundCounter]);

  useEffect(() => {
    if (currentVerdict && currentVerdict.winner === "player") {
      setPlayerHP((prevHP) => Math.min(prevHP + winBonus, 100));
    } else if (currentVerdict && currentVerdict.winner === "enemy") {
      setPlayerHP((prevHP) => prevHP - lossPenalty);
    }
    // set the weapons for player and enemy respectively. doing it here so it preloads for the next round
    fetchWeaponsWrapper("human");
    fetchWeaponsWrapper("enemy");
  }, [currentVerdict]);
  const renderedWeapons = humanWeaponKeys.map((weaponKey: string) => {
    return (
      <Weapon
        key={weaponKey}
        weaponKey={weaponKey}
        headerColor="text-black"
        onClick={() => submitAnswers(weaponKey)}
        size={isMobile ? "small" : "large"}
      />
    );
  });

  const healthBar = (
    <>
      <Box
        sx={{
          width: "100%",
          height: "1.5rem",
          overflow: "hidden",
          borderWidth: "2px",
          borderColor: "black",
        }}
      >
        <Box
          sx={{
            width: `${Math.max(playerHP, 0)}%`,
            backgroundColor:
              playerHP > 50 ? "rgb(34 197 94)" : "rgb(220 38 38)",
            height: "100%",
          }}
        />
      </Box>
    </>
  );

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-black sm:text-3xl sm:mb-4">
          round {roundCounter}
        </h1>
        {isMobile ? (
          <div
            className="flex justify-between w-screen mx-2"
            style={{ width: "95vw" }}
          >
            <div className="flex flex-col">
              <div className="text-black text-xl">HP: {playerHP}/100</div>
              {healthBar}
            </div>
            <img
              className="mr-12 absolute left-2/4"
              src="/images/logo.png"
              height={100}
              width={100}
              alt="robot overlord"
              style={{ transform: "translateX(-50%)" }}
            />
            <ThemeProvider theme={smallTheme}>
              <Card
                className={`border-2 border-black mb-2 rounded-lg grow flex flex-col items-center ${
                  playerHP > 5 && !roundOver
                    ? "hover:scale-110 hover:bg-cyan-400"
                    : "opacity-50"
                }`}
                sx={{
                  boxShadow: "5px 5px black",
                  flex: "1 1 0%",
                  maxWidth: "5rem",
                  maxHeight: "7rem",
                }}
                onClick={() => reroll()}
              >
                <CardHeader
                  className="text-center p-0 text-md"
                  title={`reroll (-${rerollCost}HP)`}
                />
                <CardMedia
                  component="img"
                  style={{ width: "2rem", height: "2rem" }}
                  image="/images/reroll.png"
                  alt="reroll choices"
                />
              </Card>
            </ThemeProvider>
          </div>
        ) : (
          <img
            src="/images/logo.png"
            height={250}
            width={250}
            alt="robot overlord"
          />
        )}
        {!roundOver ? (
          <TextStreamer text={currentHypothetical} speed={12.5} size="small" />
        ) : undefined}
        {loading ? (
          <CircularProgress className="my-8" size={200} />
        ) : !roundOver ? (
          <>
            <div className="flex mb-2 sm:flex-col sm:w-1/2">
              <p className="text-lg text-black self-center sm:text-2xl">
                {/* DRY this, brother */}
                The kAIser demands a
                {overlordMood === moods[0] ? (
                  <span className="font-bold mx-2 text-cyan-400">
                    {moods[0]}
                  </span>
                ) : undefined}
                {overlordMood === moods[1] ? (
                  <span className="font-bold mx-2 text-orange-300">
                    {moods[1]}
                  </span>
                ) : undefined}
                {overlordMood === moods[2] ? (
                  <span className="font-bold mx-2 text-fuchsia-500">
                    {moods[2]}
                  </span>
                ) : undefined}
                {overlordMood === moods[3] ? (
                  <span className="font-bold mx-2 text-lime-400">
                    {moods[3]}
                  </span>
                ) : undefined}
                {overlordMood === moods[4] ? (
                  <span className="font-bold mx-2 text-sky-700">
                    {moods[4]}
                  </span>
                ) : undefined}
                answer.
              </p>
            </div>
            <div className="flex w-2/3">
              {isMobile ? undefined : (
                <>
                  <div className="flex flex-col">
                    <img
                      className="h-24 w-24"
                      src="/images/tony.jpg"
                      alt="you, slave human"
                    />
                    <div className="flex flex-col">
                      <div className="text-black">HP: {playerHP}/100</div>
                      {healthBar}
                    </div>
                  </div>
                  <span className="text-4xl mx-auto">VS</span>
                  <img
                    className="h-24 w-24 mr-4"
                    src={`/images/${getEnemyFilename(roundCounter)}`}
                    alt="slave robot enemy"
                  />
                  <ThemeProvider theme={bigTheme}>
                    <Card
                      className={`border-2 border-black rounded-lg grow flex flex-col items-center ${
                        playerHP > 5
                          ? "hover:scale-110 hover:bg-cyan-400"
                          : "opacity-50"
                      }`}
                      sx={{
                        boxShadow: "5px 5px black",
                        flex: "1 1 0%",
                        maxWidth: isMobile ? "4rem" : "8rem",
                        maxHeight: isMobile ? "5rem" : "9rem",
                      }}
                      onClick={() => reroll()}
                    >
                      <CardHeader
                        className="text-center p-0 text-md"
                        // sx={isMobile ? { fontSize: "8px" } : { fontSize: "16px" }}
                        title={`reroll (-${rerollCost}HP)`}
                      />
                      <CardMedia
                        component="img"
                        style={
                          isMobile
                            ? { width: "2rem", height: "2rem" }
                            : { width: "4rem", height: "4rem" }
                        }
                        image="/images/reroll.png"
                        alt="reroll choices"
                      />
                    </Card>
                  </ThemeProvider>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center sm:m-4">
              {renderedWeapons}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col mb-4 sm:w-2/3">
              <TextStreamer
                // because text streamer takes whatever text it is given and immediately starts reading it out, it's more convenient to just initialize current verdict to undefined and have a conditional statement in text streamer that handles when current verdict is undefined
                // @ts-ignore
                text={trimResponse(currentVerdict.explanation, /\\/g)}
                speed={12.5}
                size="big"
              />
              {isMobile ? (
                <div className="flex justify-center mb-2">
                  <Weapon
                    key={humanAnswer}
                    weaponKey={humanAnswer}
                    headerColor={
                      currentVerdict?.winner === "player"
                        ? "text-green-500"
                        : "text-red-600"
                    }
                    size="small"
                    verdictIndicator={
                      currentVerdict?.winner === "player" ? "✅" : "❌"
                    }
                  />
                  <span className="mx-4 text-4xl">VS</span>
                  <Weapon
                    key={enemyAnswer}
                    weaponKey={enemyAnswer}
                    headerColor={
                      currentVerdict?.winner === "enemy"
                        ? "text-green-500"
                        : "text-red-600"
                    }
                    size="small"
                    verdictIndicator={
                      currentVerdict?.winner === "enemy" ? "✅" : "❌"
                    }
                  />
                </div>
              ) : (
                <div
                  style={{ minWidth: "50vw" }}
                  className="flex justify-between self-center mb-4 w-full"
                >
                  <div className="flex flex-col">
                    <img
                      className="h-24 w-24"
                      src="/images/tony.jpg"
                      alt="you, slave human"
                    />
                    <div className="flex flex-col">
                      <div className="text-black">HP: {playerHP}/100</div>
                      {healthBar}
                    </div>
                  </div>
                  <Weapon
                    key={humanAnswer}
                    weaponKey={humanAnswer}
                    headerColor={
                      currentVerdict?.winner === "player"
                        ? "text-green-500"
                        : "text-red-600"
                    }
                    size="large"
                    verdictIndicator={
                      currentVerdict?.winner === "player" ? "✅" : "❌"
                    }
                  />
                  <span className="text-4xl">VS</span>
                  <Weapon
                    key={enemyAnswer}
                    weaponKey={enemyAnswer}
                    headerColor={
                      currentVerdict?.winner === "enemy"
                        ? "text-green-500"
                        : "text-red-600"
                    }
                    size="large"
                    verdictIndicator={
                      currentVerdict?.winner === "enemy" ? "✅" : "❌"
                    }
                  />
                  <img
                    className="h-24 w-24 self-start"
                    src={`/images/${getEnemyFilename(roundCounter)}`}
                    alt="slave robot enemy"
                  />
                </div>
              )}
              {playerHP > 0 ? (
                <Button
                  className="w-fit self-center"
                  variant="contained"
                  color="success"
                  sx={{
                    textTransform: "unset",
                    fontFamily: "Comic Sans MS",
                    height: "3.5rem",
                  }}
                  onClick={() =>
                    setRoundCounter((prevRoundCounter) => prevRoundCounter + 1)
                  }
                >
                  next round
                </Button>
              ) : (
                <Button
                  className="w-fit self-center"
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "unset",
                    fontFamily: "Comic Sans MS",
                    height: "3.5rem",
                  }}
                  onClick={() => {
                    setMode("death");
                    setDeathRecap({
                      killedBy: trimKey(enemyAnswer),
                      roundOfDeath: roundCounter,
                      id: crypto.randomUUID(),
                    });
                  }}
                >
                  accept death
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
