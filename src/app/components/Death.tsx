import { Button } from "@mui/material";
import { useEffect } from "react";

export interface DeathProps {
  setMode: (mode: "home" | "game" | "death") => void;
}

const deathSound = new Audio("sounds/death_sound.mp3");

export default function Death({ setMode }: DeathProps) {
  useEffect(() => {
    deathSound.play();
    return () => {
      console.log("end");
      deathSound.pause();
      deathSound.currentTime = 0;
    };
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between relative">
      <img
        className=""
        src="/images/you_died.jpg"
        height="100%"
        width="100%"
        alt="why didn't you listen to yud?"
      />
      <div className="absolute top-2/3">
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
