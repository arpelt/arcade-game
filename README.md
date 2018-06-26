# Arcade Game Project

## Table of Contents
* [Project instructions](#proinst)
* [Game rules](#gamer)
* [How to play](#howplay)
* [Play the live desktop version of the game](#playlive)
* [Installation](#install)

<a name="proinst"></a>
## Project instructions
Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.
For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

<a name="gamer"></a>
## Game rules
The goal of the player is to reach the water, without colliding into any one of the enemies.
The player's score increase each time the player reaches the water and the game difficulty increase automatically.
Once a the player collides with an enemy, the total amount of the player's lives is reduced. If the player's lives is reduced to 0 the game is over.
If the player reaches the maximum score, the player wins the game.

<a name="howplay"></a>
## How to play
The keyboard arrow buttons move the player and pressing the Esc button restart the game.

<a name="playlive"></a>
## Play the live desktop version of the game
The live version of the game is available at https://arpelt.azurewebsites.net/arcade-game/app/.

<a name="install"></a>
## Installation
1. Go to the folder where you want to store project and use git clone to clone project.
```
$ git clone https://github.com/arpelt/arcade-game.git
```
Or press the "Clone or download" button and select "Download ZIP".

2. Open `index.html` file.
