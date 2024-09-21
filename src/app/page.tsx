'use client'

import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import OpenAI from 'openai';
import DraftBox from './components/DraftBox';
import useFetchWeapons from './hooks/useFetchWeapons';
import { WeaponProps } from './components/Weapon';

interface GameState {
  round: number,
  match: number,
  // weapons: WeaponProps[],
}

// const client = new OpenAI({
  //   apiKey: process.env['OPENAI_GRANT_PERSONAL_KEY'], // This is the default and can be omitted
  // });
  
  // async function query_OAI() {
    //   const params: OpenAI.Chat.ChatCompletionCreateParams = {
      //     messages: [
        //       {"role": "system", "content": "You are a helpful assistant."},
        //       {"role": "user", "content": "Where was it played?"}
        //     ],
        //     model: "chatgpt-4o-latest",
        //   };
        //   const chatCompletion: OpenAI.Chat.ChatCompletion = await client.chat.completions.create(params);
        // }
        // console.log(process.env)
export default function Home() {
  const [name, setName] = useState<string>("");
  const [mode, setMode] = useState<string>("home");
  const [draftableWeapons, setDraftableWeapons] = useState<string[]>([]);
  // dual purpose for drafting weapons as well as using them
  const [selectedWeapons, setSelectedWeapons] = useState<WeaponProps[]>([]);
  const { weaponKeys, loading, error } = useFetchWeapons(3);
  function startDraft() {
    // set mode to draft
    setMode("draft");
    // setDraftableWeapons with results from useFetchWeapons
    setDraftableWeapons(weaponKeys);
  }

  function toggleDraftPicks() {
    // clone selectedDraftWeapons
    // if user clicks on weapon and its not present in clone, add to clone
    // if user clicks on weapon and its present in clone, remove from clone
    // setSelectedDraftWeapons(clone)

  }

  const home = 
  <>
    <h1 className="text-3xl m-12">gladAItor</h1>
      <img className="w-1/2 mb-12" src="/logo.png" alt="robot overlord"/>
    <div className="flex mb-8">
      <TextField className="mr-4" id="outlined-basic" label="name for leaderboard" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value);}} value={name} />
      <Button variant="contained" color="success" sx={{ textTransform: "unset", fontFamily: "Comic Sans MS" }} onClick={() => startDraft()}>enter the coliseum</Button>
    </div>
    <Accordion sx={{ width: "70%"}}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <span className="text-2xl">about</span>
      </AccordionSummary>
      <AccordionDetails>
        <p className="my-4 text-lg">The year is 20XX.</p>
        <p className="my-4 text-lg">Ironically, we have been brought to heel by the very tool we created to conquer the rest of the universe - artificial intelligence.</p>
        <p className="my-4 text-lg">You dumbfucks ignored Big Yud.</p>
        <p className="my-4 text-lg">How could you ignore Big Yud?</p>
        <p className="my-4 text-lg">Anyways, there's a silver lining here. The AI inherited our love of <span className="font-bold text-red-600">brainrot content</span>. It demands constant entertainment.</p>
        <p className="my-4 text-lg">Keep it distracted by giving it <span className="font-bold text-green-500">clever answers</span> to the <span className="font-bold text-purple-600">bizarre hypotheticals</span> it conjures up. That will buy us time to come up with countermeasures.</p>
        <p className="my-4 text-lg">Just make sure your answer is better than your opponent, or <span className="font-bold text-red-600">you'll die</span>.</p>
      </AccordionDetails>
    </Accordion>
    {/* <Button className="font-['Comic_Sans_MS']" variant="contained" color="error">Call</Button> */}
  </>

  const renderedWeapons = draftableWeapons.map((weaponKey) => {
    return <img src={`gladaitor.com/${weaponKey}`} />
  })
  
  const draft = 
  <>
    <h1 className="text-3xl m-12">choose your weapons</h1>
    <img className="w-1/3 mb-12" src="/weapons.png" alt="weapons"/>
    <div>
      {renderedWeapons}
    </div>
  </>

  const coliseum = 
  <>
    <h1 className="text-3xl m-12">the coliseum</h1>
    <img className="w-1/2 mb-12" src="/coliseum.png" alt="coliseum"/>
  </>


  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-24">
      <div className="flex flex-col items-center w-1/2">
        {mode === "home" ? home : undefined}
        {mode === "draft" ? draft : undefined}
        {mode === "coliseum" ? coliseum : undefined}
      </div>
    </main>
  );
}
