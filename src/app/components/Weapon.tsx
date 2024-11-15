import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { trimKey } from "../utils/helperFunctions";

export interface WeaponProps {
  weaponKey: string;
  headerColor: string;
  size: "small" | "large";
  cost?: number;
  createdBy?: string;
  onClick?: (key: string) => void;
}

export default function Weapon({
  onClick,
  weaponKey,
  headerColor,
  size,
  cost,
  createdBy,
}: WeaponProps) {
  const smallTheme = createTheme({
    components: {
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "4px",
          },
          title: {
            fontSize: trimKey(weaponKey).length < 18 ? "1.25rem" : "1rem",
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            padding: "0 4px 4px 4px",
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
            padding: "8px",
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          root: {
            padding: "0 8px 8px 8px",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={size === "small" ? smallTheme : bigTheme}>
      <Card
        className={`border-2 border-black rounded-lg m-1 grow flex flex-col items-center ${
          onClick ? "hover:scale-110 hover:bg-cyan-400 sm:mx-4" : ""
        }`}
        key={weaponKey}
        onClick={() => onClick?.(weaponKey)}
        sx={{
          boxShadow: "5px 5px black",
          maxWidth: size === "small" ? "175px" : "180px",
          maxHeight: size === "small" ? "155px" : "240px",
        }}
      >
        <CardHeader className={`${headerColor}`} title={trimKey(weaponKey)} />
        <CardMedia
          component="img"
          style={{
            width: size === "small" ? 160 : 200,
            height: size === "small" ? 140 : 200,
            objectFit: "cover",
          }}
          image={`https://gladaitor.com/${weaponKey}`}
          alt={`Picture of ${weaponKey}`}
        />
      </Card>
    </ThemeProvider>
  );
}
