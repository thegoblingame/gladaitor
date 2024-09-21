import { Card,CardHeader, CardMedia } from '@mui/material';
import { Weapon as WeaponInterface } from '../hooks/useFetchWeapons';

export interface WeaponProps extends WeaponInterface {
  cost?: number;
  createdBy?: string;
  onClick?: (key: string) => void;
}
  
export default function Weapon({ onClick, key, image, contentType, etag, cost, createdBy}: WeaponProps) {
  return (
    <Card onClick={() => onClick?.(key)}>
      <CardHeader
        title={key}
      />
      <CardMedia
        component="img"
        height="194"
        // image={image}
        alt={`Picture of ${key}`}
      />
    </Card>
  )
}
