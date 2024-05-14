import readlineSync from "readline-sync";

import { petType } from "../util/staticVars.js";
import { pet } from "../util/functions.js";
import PetCare from "./PetCare.js";

export let restart = false;
export let whichPet;
export let goPetMap = false;

class MainMap {
    constructor() {
        this.map = [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "X                         x                                                                 X",
            "X                       x  x                                                                X",
            "X                     x     x                                                               X",
            "X                   x        x                                                              X",
            "X                 x           x                                                             X",
            "X               x              x                                                            X",
            "X              xxxxxxxxxxxxxxxxxx                                                           X",
            "X              x                x                                                           X",
            "X              x                x                                                           X",
            "X              x                x                                                           X",
            "X              x                                                                            X",
            "X              x                                                                            X",
            "X              x                                                                            X",
            "X              xxxxxxxxxxxxxxxxxx                                                           X",
            "X                                                                                           X",
            "X                                                                                           X",
            "X                                                                                           X",
            "X                                                                                           X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        ];

        this.playerPosition = { x: 1, y: 1 };
        this.isRunning = true;
    }

    printMap() {
        console.clear();
        whichPet = petType[pet.selectedIndex].split(" ")[0];
        for (let row of this.map) {
            if (whichPet === "Tiger") row = row.replace("M", "🐯");
            else if (whichPet === "Affe") row = row.replace("M", "🐒");
            else if (whichPet === "Hase") row = row.replace("M", "🐰");
            console.log(row);
        }
        console.log("player's Position:", this.playerPosition);
    }

    movePlayer(direction) {
        let newX = this.playerPosition.x;
        let newY = this.playerPosition.y;

        switch (direction) {
            case "w":
                newY--;
                break;
            case "s":
                newY++;
                break;
            case "a":
                newX--;
                break;
            case "d":
                newX++;
                break;
            default:
                break;
        }

        if (this.map[newY][newX] === " ") {
            this.map[this.playerPosition.y] =
                this.map[this.playerPosition.y].slice(
                    0,
                    this.playerPosition.x
                ) +
                " " +
                this.map[this.playerPosition.y].slice(
                    this.playerPosition.x + 1
                );
            this.playerPosition.x = newX;
            this.playerPosition.y = newY;
            this.map[this.playerPosition.y] =
                this.map[this.playerPosition.y].slice(
                    0,
                    this.playerPosition.x
                ) +
                "M" +
                this.map[this.playerPosition.y].slice(
                    this.playerPosition.x + 1
                );
        }
    }

    start() {
        let move;
        if (restart === true) this.isRunning = true;
        while (this.isRunning) {
            console.log(this.isRunning);
            if (!this.isRunning) break;
            this.printMap();
            if (
                this.playerPosition.x >= 16 &&
                this.playerPosition.x <= 30 &&
                this.playerPosition.y >= 8 &&
                this.playerPosition.y <= 13
            ) {
                this.isAtHome = true;
                console.log("Zuhause 🏠, schönes Zuhause 🏡 !");
                move = readlineSync.keyIn(
                    "Use W/A/S/D to move (or H to hoursMap or Q to quit ): ",
                    { limit: "wasdqh" }
                );
            } else {
                move = readlineSync.keyIn(
                    "Use W/A/S/D to move (or Q to quit): ",
                    { limit: "wasdq" }
                );
            }
            if (move.toLowerCase() === "h") {
                const isPetCare = readlineSync.question(
                    "Do you want to play with your Pet (y/n)? "
                );
                if (isPetCare === "y") {
                    this.isRunning = false;
                    goPetMap = true;
                    const myPetCareMode = new PetCare(
                        pet.petName,
                        whichPet,
                        10
                    );

                    myPetCareMode.startPetCareMode();
                }
            }
            if (move.toLowerCase() === "q") {
                this.isRunning = false;
                console.log("Game over. Thanks for playing!");
                break;
            }
            this.movePlayer(move.toLowerCase());
        }
    }
}
const gameInMainMap = new MainMap();
export default gameInMainMap;
