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

## MVP

kinda mobile friendly
landing page w title visual rep and search button ✅
mechanism for pairing players
draft page w options. clicking on them selects/deselects them
game page, prompt is shown and options are shown. after both players finish or timer runs out, AI sends req and returns response
round w/l indicators appear next to names
about text
CSS cleanup
types in a separate file, imported into components

## AFTER MVP

revamp images
error handling
fix site name
username
leaderboard
login w google
input validation
price and ELO
users can submit items, try to limit them to 1 per day or something
logo quality?
"best practice" if looking for job
animal crossing audio on text readout

# TODO CODE

Add title
Create login page
Connect login to google
Input for username, submitting means username gets stored in DB along with player email and MMR
Write game explanation
Create database
Create leaderboard page
Leaderboard populate w player names and MMRs

# TODO LEARN/WRITE
Create 100 prompts
Create explanation modal
Learn about MMR/ELO


# ARCHITECTURE CONSIDERATIONS

consider using cloudflare pages host / database
deepinfra for tokens
use google for authentication

# DESIGN CONSIDERATIONS

price and ELO might be unnecessary complexities for the player

# PROMPT

maybe we want it to value humor? like if the AI can create a funny explanation with the answer it gets upgraded

I'm going to provide you with a subjective comparative hypothetical and two potential answers (separated by a comma) to the said hypothetical.

You must do the following:

Out of those two provided answers, select the answer that better satisfies the hypothetical, and explain your reasoning.

Finish your answer with the following sentence: Therefore, (chosen answer) is the winner.

Limit your response to 200 tokens or less.

## HOW TO PLAY

Draft X weapons.

Answer the Overlord's questions with your most appropriate weapons. If you manage to win 2 of 3 rounds, 

## STORY

The year is 20XX.

Ironically, we have been brought to heel by the very tool we created to conquer the rest of the universe - artificial intelligence.

You dumbfucks ignored Big Yud.

How could you ignore Big Yud?

Anyways, there's a silver lining here. The AI inherited our love of brainrot content.

Keep it distracted by giving it clever answers to the bizarre hypotheticals it conjures up.

That will buy us time to come up with countermeasures.

Just make sure your answer is better than your opponent, or you'll die.

I mean you'll die eventually regardless, but your score will stay on the leaderboard until someone else beats it. So that's nice.