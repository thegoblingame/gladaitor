'use client'
import { Button } from "@mui/material";
import { useState } from "react";

export interface PlayerScore {
    name: string,
    roundsSurvived: number,
    defeatedBy: string
  }

export default function Leaderboard() {
    const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
    const fetchLeaderboard = async (count: number,category: string) => {
        // setLoading(true);
        try {
          const response = await fetch(`https://r2-worker.gnb225.workers.dev?count=${count}&${category}`);
          if (!response.ok) {  
            throw new Error('Failed to fetch weapons');
          }
          const data = await response.json();
          if (!Array.isArray(data) || !data.every(item => typeof item === 'string')) {
            throw new Error('data is either not an array or has items in the array that are not strings');
          }
        //   setLeaderboard()
        } catch (err) {
          // setError((err as Error).message);
        } finally {
          // setLoading(false);
        }
      }

    const players = playerScores.map((player: PlayerScore,index: number) => {
        return <>
            <h3 className="mr-8">{index + 1}</h3>
            <h3 className="ml-16 mr-48">{player.name}</h3>
            <h3 className="mr-8">{player.roundsSurvived}</h3>
            <h3 className="">{player.defeatedBy}</h3>
        </>
    })
    return (
        <div className="flex min-h-screen flex-col items-center">
            <div className="flex items-center mb-8">
              <Button className="mr-4 mt-2" variant="contained" href="/" sx={{ textTransform: "unset", fontFamily: "Comic Sans MS" }}> &lt;=== home</Button>
              <h1 className="text-6xl">Yud&#39;s Champions</h1>
            </div>
            <div className="flex">
                <h2 className="font-bold mr-8">Rank</h2>
                <h2 className="font-bold ml-16 mr-48">Gladiator</h2>
                <h2 className="font-bold mr-8">Rounds Survived</h2>
                <h2 className="font-bold">Defeated By</h2>
            </div>
            <div>
                {players}
            </div>
        </div>
    );
  }