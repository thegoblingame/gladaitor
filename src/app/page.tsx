'use client'

import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
// import OpenAI from 'openai';
// import DraftBox from './components/DraftBox';
// import useFetchWeapons from './hooks/useFetchWeapons';
import TextStreamer from './components/TextStreamer';
import Weapon from './components/Weapon';

// const client = new OpenAI({
//     apiKey: process.env['OPENAI_GRANT_PERSONAL_KEY'], // This is the default and can be omitted
//   });
  
//   async function query_OAI() {
//     const params: OpenAI.Chat.ChatCompletionCreateParams = {
//         messages: [
//             {"role": "system", "content": "You are a helpful assistant."},
//             {"role": "user", "content": "Where was it played?"}
//           ],
//           model: "chatgpt-4o-latest",
//         };
//         const chatCompletion: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(params);
//       }

export default function Home() {
  // technically this is supposed to be in a child component to avoid rerendering <Home> when the name is changed, if rendering gets slow we can move it
  const [name, setName] = useState<string>("");
  const [nameValid, setNameValid] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("home");
  const [weaponKeys, setWeaponKeys] = useState<string[]>([]);
  // const [error, setError] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);
  const [roundCounter, setRoundCounter] = useState<number>(0);
  // dual purpose for drafting weapons as well as using them
  // const [selectedWeapons, setSelectedWeapons] = useState<WeaponProps[]>([]);

  // useEffect( () => {
  //   // load up weapons, setWeaponKeys
  //   const { weaponKeys, loading, error } = useFetchWeapons(4);
  //   setWeaponKeys(weaponKeys)
  // },[roundCounter])

  // requests will specify which category of weapon we want, but ultimately they will all be put in the same array for the sake of convenience
  // this works bc the URLS are just category/imagekey
  // 

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z0-9\s'-]+$/;
    return name.length > 0 && name.length <= 20 && nameRegex.test(name.trim());
  };

  const fetchWeapons = async (count: number,category: string) => {
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
      setWeaponKeys(prevWeaponKeys => [...prevWeaponKeys,...data]);
    } catch (err) {
      // setError((err as Error).message);
    } finally {
      // setLoading(false);
    }
  }


  useEffect(() => {
    const randInt = Math.floor(Math.random() * 9999)
    setName(`anon${randInt}`)
  },[])
  
  useEffect(() => {
    // fetchWeapons(2,"generic_weapons");
    // fetchWeapons(3,"unusual_weapons");
  },[roundCounter])

  useEffect(() => {
    setNameValid(validateName(name))
  },[name])



  // function toggleDraftPicks() {
    // clone selectedDraftWeapons
    // if user clicks on weapon and its not present in clone, add to clone
    // if user clicks on weapon and its present in clone, remove from clone
    // setSelectedDraftWeapons(clone)

  // }

  const home = 
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center w-1/2">
        <h1 className="text-6xl mb-8">gladAItor</h1>

          <img className="w-1/2 mb-8" src="/logo.png" alt="robot overlord"/>
        <div className="flex mb-8">
          <TextField 
            error={!nameValid}
            helperText={!nameValid ? "no specials & 1-20 chars" : " "}
            className="mr-4" 
            id="outlined-basic" 
            label="name" 
            variant="outlined" 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value);}} value={name} 
          />
          <Button disabled={!nameValid} variant="contained" color="success" sx={{ textTransform: "unset", fontFamily: "Comic Sans MS", height: "3.5rem" }} onClick={() => {setMode("game"); setRoundCounter((prev) => prev + 1);}}>enter the coliseum</Button>
        </div>
        <Accordion sx={{ width: "150%"}}>
          <AccordionSummary className="hover:bg-cyan-400" expandIcon={<ExpandMore />}>
            <span className="text-2xl">about</span>
          </AccordionSummary>
          <AccordionDetails>
            <p className="my-4 text-lg">The year is 20XX.</p>
            <p className="my-4 text-lg">Ironically, we have been brought to heel by the very tool we created to conquer the rest of the universe - artificial intelligence.</p>
            <p className="my-4 text-lg">You dumbfucks ignored <a className="font-bold hover:text-cyan-400" href="https://gladaitor.com/yuds/bigyud" target="_blank">Big Yud</a>.</p>
            <p className="my-4 text-lg">How could you ignore <a className="font-bold hover:text-cyan-400" href="https://gladaitor.com/yuds/biggeryud" target="_blank">Big Yud</a>?</p>
            <p className="my-4 text-lg">Anyways, there's a silver lining here. The kAIser inherited our love of <span className="font-bold text-red-600">brainrot content</span>. It demands constant entertainment.</p>
            <p className="my-4 text-lg">Keep it distracted by giving it <span className="font-bold text-green-500">clever answers</span> to the <span className="font-bold text-purple-600">bizarre hypotheticals</span> it conjures up. That will buy us time to come up with countermeasures.</p>
            <p className="my-4 text-lg">Just make sure your answer suits the whims of the kAIser better than your opponent, or <span className="font-bold text-red-600">you'll die</span>.</p>
          </AccordionDetails>
        </Accordion>
      </div>
      <p className="text-xs text-gray-600 mb-12 self-center">inspired by <a className="font-bold hover:text-cyan-400" href="https://www.whatbeatsrock.com/" target="_blank">what beats rock?</a> </p>
    </main>

  const renderedWeapons = weaponKeys.map((weaponKey) => {
    return <Weapon key={weaponKey} weaponKey={weaponKey} />
  })

  const game = 
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center w-1/2">
        <h1 className="text-3xl mb-4">round {roundCounter}</h1>
        <img className="size-1/3" src="/logo.png" alt="robot overlord"/>
        <div className="flex flex-col my-4">
          {/* <p className="text-2xl mx-4">Both engines on your airplane just fell off and you're about to crash. What will save your life?</p> */}
          <TextStreamer text="You are trapped on a deserted island. What do you bring with you?" speed={50} />
          <p className="text-2xl my-4 self-center">The kAIser requires a <span className="font-bold text-red-600">rational</span> answer.</p>
        </div>
        <div className="flex justify-between">
          <img className="size-1/6" src="/tony.jpg" alt="you, slave human"/>
          <img className="size-1/6" src="/clippy.webp" alt="slave robot"/>
        </div>
      </div>
        <div className="flex m-4">
          {renderedWeapons}
        </div>
    </main>


  return (
    <>
      {mode === "home" ? home : undefined}
      {mode === "game" ? game : undefined}

    </>
  );
}
