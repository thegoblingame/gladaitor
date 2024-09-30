import { TextField } from "@mui/material";
import { useState } from "react";

export interface PlayerNameProps {
  error: boolean
}
export default function PlayerName({error}: PlayerNameProps) {
  const [name, setName] = useState<string>("");
  // const [valid, setValid] = useState<boolean>(true);
  // const validateName = (name: string) => {
  //   const nameRegex = /^[a-zA-Z\s'-]+$/;
  //   return name.length > 0 && name.length <= 25 && nameRegex.test(name.trim());
  // };

  return (
    <TextField error={error} className="mr-4" id="outlined-basic" label="name" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value);}} value={name} />
  )
}
