import { Button, Card,CardActions,CardHeader, CardMedia } from '@mui/material';
import { Weapon as WeaponInterface } from '../hooks/useFetchWeapons';
import { useEffect, useState } from 'react';

export interface WeaponProps {
  weaponKey: string;
  cost?: number;
  createdBy?: string;
  onClick?: (key: string) => void;
}
  
export default function Weapon({ onClick, weaponKey, cost, createdBy}: WeaponProps) {
  // const [fontSize, setFontSize] = useState<string>("normal")
  // useEffect(() => {

  // },[])
  return (
    <Card className="border-2 border-black rounded-lg pb-1 mx-4 grow flex flex-col items-center hover:scale-110 hover:bg-cyan-400" key={weaponKey} onClick={() => onClick?.(weaponKey)} sx={{boxShadow: "5px 5px black", flex: "1 1 0%", maxWidth: "200px"}}>
      <CardHeader
        title={weaponKey.replace(/_/g," ")}
      />
      <CardMedia
        component="img"
        style={{ width: 200, height: 200, objectFit: "cover" }}
        image={`https://gladaitor.com/unusual_weapons/krillin`}
        alt={`Picture of ${weaponKey}`}
      />
    </Card>
  )
}
