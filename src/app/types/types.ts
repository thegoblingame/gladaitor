export interface DeathRecap {
  killedBy: string;
  roundOfDeath: number;
}
// timestamp handled by backend
export interface LeaderboardEntry extends DeathRecap {
  id: string;
  name: string;
}
