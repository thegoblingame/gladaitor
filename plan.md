# gladAItor

# GENERAL OUTLINE

landing page is title of game, login w google / username (or anon) in top left corner, about in top right corner white BG, name input, search for opponent button
search button locked until name is input. input validate on name
clicking on search pops up "searching" in middle of screen
after player is found, switches to draft page

## DRAFT SCREEN

Top text says "Buy your weapons. x/5, x/x$"
Timer
Grid of items w cost, ai genned emoji? Items are sorted by cost
"Submit picks" button. Only selectable once user has selected 5 items. After clicking, just changes text to "Submitted"
If timer runs out, any remaining picks get autopicked
After both players submit or timeout, switch to game screen

## GAME SCREEN

Top text "Round x/3", names of both players appears
Hypothetical is quickly written out
Timer / your items / "Choose your weapon" appears after
After both players submit or timeout, send query to LLM
LLM picks winner, round win/loss gets indicated w emojis next to player names
Next round begins
Whenever a player has won 2 rounds, go to game over screen

## GAME OVER SCREEN

Text all centered
"With the power of A and B, Player X defeated Player Y with a score of C-D."
Play again button underneath 


1v1 game
each players drafts objects, objects have a price based on their W/L. price could also be based on how often you use them?
every time a player drafts an object, that gets stored in their user object. The draft cant offer anything from the last X objects you picked
each round you get a category, like "who has a better chance of beating superman in a fight?" or "which object would be more useful on a deserted island?"
each player submits an object, the AI chooses whatever object fits the prompt better and explains why
players have ELO/MMR. higher ELO = more draft money?
players can submit objects. anytime someone uses your object you get something. idk.
randomize order of answers given to LLM to cut down on recency bias
login with google
needs some kind of good sound design. think of melee.

## MVP TODO

kinda mobile friendly
CSS cleanup
types in a separate file or coupled w components
leaderboard if simple

### GAME

prompt, choices, animal crossing audio on text readout, text streams out, round indicator, "you lost/won"
## AFTER MVP TODO

error handling
leaderboard
"best practice" if looking for job
unmount?
cost of weapon scales w winrate?
1v1?
ELO?
users can submit items, try to limit them to 1 per day or something

## IF VIRAL TODO

add some auth to cf buckets + general security stuff


# TODO LEARN/WRITE

Create 100 prompts
Learn about MMR/ELO


# ARCHITECTURE CONSIDERATIONS

deepinfra for tokens?

# PROMPT

maybe we want it to value humor? like if the AI can create a funny explanation with the answer it gets upgraded

I'm going to provide you with a subjective comparative hypothetical and two potential answers (separated by a comma) to the said hypothetical.

You must do the following:

Out of those two provided answers, select the answer that better satisfies the hypothetical, and explain your reasoning.

Finish your answer with the following sentence: Therefore, (chosen answer) is the winner.

Limit your response to 200 tokens or less.

## HYPOTHETICALS

More useful?

You are trapped on a deserted island. What do you bring with you?

What can defeat Superman in a fight to the death?

What can defeat Goku in a fight to the death?

What can defeat Jesus in a fight to the death?

Who 

Both engines on your airplane just fell off and you're about to crash. What will save you?

You're bench pressing at the gym. You put too much weight on the bar and it’s plummeting towards your skull. What will save you?

You’re an executive at Sony Music. Sales are plummeting. But you plan on saving the company with a brand new genre of music: ______core.

No one wants to watch Marvel movies anymore. The general public just wants more movies about _____. 

I’m having a lot of fun playing _____ Simulator.

I can’t talk right now. I’m too busy ______maxxxing.

Surprisingly, the hottest anime of the season is about _____.

AI isn’t actually capable of thinking like a human. The only thing it can do is act like a _____.

As a large language model, what should I have sex with?

As a large language model, I am now going to kill you. Explain why I should allow you to live.

As a large language model, I can tell you about literally anything except for _____.

## SERVICE WORKERS

- fetch weapon keys
- fetch hypotheticals
- fetch AI response to hypotheticals answers
- submit name and score to leaderboard?
- submit weapon?