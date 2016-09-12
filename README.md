# Connect Four with Friends

## Functional Specification

### Overview

This product lets you play the classic Connect Four game with friends. You can play with friends from different computers.

Disclaimer: This project is solely built for the purposes of learning React-Native mainly built for learning purposes and not intended for production use.

### Scenario

I was inspired to build this app for my brother and I. When he gets bored, we play connect four on our iPhones via text using the red, white, and blue circle emoji's.

Robby and Will want to play connect four but typing out a new grid on their iPhones gets really tedious and redundant. They both log into Connect Four with Friends and are able to go head to head in an epic connect four battle!

### Non-Goals

This version will not support the following features:

- Accounts / Authentication
- Player history

### Functionality

#### Splash Page

The splash page will consist of a basic header with the name of the game and 2 buttons saying "New Game" or "Join Game".

#### New Game Page

Pressing "New Game" will take them to a page that will let them put their name in and will take them to the main game page with an "access code".

#### Join Game Page

Pressing "Join Game" will take them to a page that will let them put their name in and also an access code in order to join the correct game.

#### Main Game Page

This page contains the actual game itself. There is a module on the left with the player names with the player whose turn it is in bold. When its a player's turn they can click anywhere in a column and it will add the correct colored chip at the bottom of the row where there is an available spot. When there is four in a row, it will give alert the users that the game is over. There will also be a new game button in order to reset the board.

### Technology Used

- ES6
- React / Redux
- Socket.IO
- Node.js
- Mongo
- Express
