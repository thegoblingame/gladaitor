import { useState, useEffect } from 'react';

// Define the type for the weapon object
export interface Weapon {
  key: string;
  image: string;
  contentType: string;
  etag: string;
}

// Define the hook's return type
interface UseFetchWeaponsResult {
  weaponKeys: string[];
  loading: boolean;
  error: string | null;
}

export default function useFetchWeapons(count: number): UseFetchWeaponsResult {
  const [weaponKeys, setWeaponKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    async function fetchWeapons() {
      try {
        const response = await fetch(`https://r2-worker.gnb225.workers.dev?count=${count}`);
        if (!response.ok) {  
          throw new Error('Failed to fetch weapons');
        }
        const data = await response.json();
        setWeaponKeys(data); // adjust based on your worker's response structure
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeapons();
  }, [count]);

  return { weaponKeys, loading, error };
}
