"use client";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LeaderboardEntry } from "../types/types";

export default function Leaderboard() {
  const [playerScores, setPlayerScores] = useState<LeaderboardEntry[]>([]);
  const checkScore = async () => {
    try {
      const response = await fetch(
        new Request("https://kv-worker.gnb225.workers.dev/leaderboard")
      );
      if (!response.ok) {
        throw new Error("Failed to retrieve scores");
      }
      const scores = (await response.json()) as LeaderboardEntry[];
      setPlayerScores(scores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkScore();
  }, []);

  const players = playerScores.map(
    (player: LeaderboardEntry, index: number) => {
      return (
        <tr
          className={`h-8 sm:h-12 ${index % 2 === 0 ? "bg-cyan-100" : null}`}
          key={player.id}
        >
          <td className="text-xl text-center sm:text-3xl sm:w-32">
            {index + 1}
          </td>
          <td className="text-sm text-center sm:text-xl sm:w-96">
            {player.name}
          </td>
          <td className="text-sm text-center sm:text-xl sm:w-96">
            {player.roundOfDeath}
          </td>
          <td className="text-sm text-center sm:text-xl sm:w-80">
            {player.killedBy}
          </td>
        </tr>
      );
    }
  );
  return (
    <div className="flex text-black min-h-screen flex-col items-center">
      <div className="flex items-center sm:mb-4">
        <Button
          className="mr-4 mt-2"
          variant="contained"
          href="/"
          sx={{
            textTransform: "unset",
            fontFamily: "Comic Sans MS",
            fontSize: "20px",
            height: "3rem",
          }}
        >
          {" "}
          home
        </Button>
        <h1 className="text-3xl ml-4 sm:text-6xl">Yud&#39;s Champions</h1>
      </div>
      <table className="mx-2" border={1}>
        <thead>
          <tr>
            <th className="font-bold text-lg sm:text-2xl sm:w-32">Rank</th>
            <th className="font-bold text-lg sm:text-2xl sm:w-96">Gladiator</th>
            <th className="font-bold text-lg sm:text-2xl sm:w-96">
              Round of Death
            </th>
            <th className="font-bold text-lg sm:text-2xl sm:w-80 ">
              Defeated By
            </th>
          </tr>
        </thead>
        <tbody>{players}</tbody>
      </table>
    </div>
  );
}
