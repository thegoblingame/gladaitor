export interface DeathRecap {
  killedBy: string;
  roundOfDeath: number;
  id: string;
}
// timestamp handled by backend
export interface LeaderboardEntry extends DeathRecap {
  name: string;
}
