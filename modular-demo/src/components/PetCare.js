import readlineSync from "readline-sync";
import { applePie, foodList } from "../util/staticVars.js";
import { pet } from "../util/functions.js";
import { whichPet, goPetMap } from "./Map.js";

export default class PetCare {
    constructor(name, type = "", hunger, affinity = 5, IQ = 10, HP = 10) {
        this.name = name;
        this.type = type;
        this.hunger = hunger;
        this.affinity = affinity;
        this.IQ = IQ;
        this.HP = HP;
        this.mapTiger = [
            "================================= 💓💓💓 ===============================",
            "                                                                        ",
            `     __  _-==-=_,-.                                                     `,
            "     /--`'\\_@-@.--<                                                     ",
            "     `--'\\ \\   <___/.                    ----${pet.petName}----             ",
            `           \\ \\\   " /                   | hunger: ${this.hunger}        `,
            "            >=\\_/`<                    | IQ:     ${this.IQ}            ",
            `           /= | \\_|/                   | affinity:${this.affinity}     `,
            `          /===\\____/                   | HP:   ${this.HP}              `,
            `                                         ----------------------          `,
            "                                                                        ",
            `                                                                        `,
            `                                                                        `,
            `                                                                        `,
            `                                                                        `,
            `                                                                        `,
            `  1. feeding    2. playing    3. quiz   4. to heal                      `,
            ` (you can chose 1, 2 or 3, to play with your pet;)                      `,
            ` (press "q" to quit the game, press "b" to go back to main map)         `,
            "================================ 💓💓💓 ================================",
        ];
        this.mapManky = [
            "================================= 💓💓💓 ===============================",
            "                                                                        ",
            `             __,__                                                       `,
            `    .--.  .-"     "-.  .--.                                              `,
            `   /.. ./  .-. .-. .'/ ..  )              ----${pet.petName}----             `,
            `  || '  |  /   Y     |   ' ||             | hunger: ${this.hunger}        `,
            `  ||     )   0 | 0   (     ||            | IQ:     ${this.IQ}            `,
            `   ('-  ).-" '''' "-./, -' /             | affinity:${this.affinity}     `,
            `    '._. (_   ^ ^   _ ) ._.'             | HP:   ${this.HP}              `,
            `        |  (._   _.)  |                  ----------------------           `,
            "        `.  ( '~' )   /                                                  ",
            `         '._ '-=-' _.'                                                   `,
            `            '~---~'                                                      `,
            `                                                                        `,
            `       ${whichPet}                                                      `,
            `                                                                        `,
            `                                                                        `,
            `                                                                        `,
            `                                                                        `,
            `                                                                        `,
            `  1. feeding    2. playing    3. quiz   4. to heal                      `,
            ` (you can chose 1, 2 or 3, to play with your pet;)                      `,
            ` (press "q" to quit the game, press "b" to go back to main map)         `,
            "================================ 💓💓💓 ================================",
        ];
        this.mapRabbit = [
            "================================= 💓💓💓 ===============================",
            "                                                                        ",
            `     ***                                                               `,
            `     ** **                                                               `,
            `    **   **                               ----${pet.petName}----             `,
            `    **   **         ****                | hunger: ${this.hunger}        `,
            `    **   **       **   ****             | IQ:     ${this.IQ}            `,
            `    **  **       *   **   **            | affinity:${this.affinity}     `,
            `     **  *      *  **  ***  **          | HP:   ${this.HP}              `,
            `       **  *    *  **     **  *          ----------------------           `,
            "        ** **  ** **        **                                                ",
            `        **   **  **                                                      `,
            `       *           *                                                     `,
            `      *             *                                                    `,
            `     *    0     0    *                                                   `,
            `     *   /   @   \\   *                                                  `,
            `     *   \\__/ \\__/   *                                                `,
            `       *     W     *                                                    `,
            `         **     **                                                      `,
            `           *****                                                        `,
            `  1. feeding    2. playing    3. quiz   4. to heal                      `,
            ` (you can chose 1, 2 or 3, to play with your pet;)                      `,
            ` (press "q" to quit the game, press "b" to go back to main map)         `,
            "================================ 💓💓💓 ================================",
        ];
        this.isPlaying = true;
    }
    printPetMap() {
        console.clear();
        let mapPet = [];
        if (whichPet === "Tiger") mapPet = this.mapTiger;
        else if (whichPet === "Affe") mapPet = this.mapManky;
        else if (whichPet === "Hase") mapPet = this.mapRabbit;
        for (let rowPet of mapPet) {
            if (rowPet.includes("hunger:")) {
                const updatedRow = rowPet.replace(
                    /hunger: \d+/,
                    `hunger: ${this.hunger}`
                );
                console.log(updatedRow);
            } else {
                console.log(rowPet);
            }
        }
    }
    addAffinity(value) {
        this.affinity = Math.min(this.affinity + value, 10);
    }
    reduceAffinity(value) {
        this.affinity = Math.max(this.affinity - value, 0);
    }
    addHunger(value) {
        this.hunger = Math.min(this.hunger + value, 10);
    }
    reduceHunger(value) {
        this.hunger = Math.max(this.hunger - value, 0);
    }

    addIQ(value) {
        this.IQ = Math.min(this.IQ + value, 10);
    }

    reduceIQ(value) {
        this.IQ = Math.max(this.IQ - value, 0);
    }
    addHP(value) {
        this.HQ = Math.min(this.HQ + value, 10);
    }
    foodStock() {}
    feed() {
        while (true) {
            if (this.hunger === 10) {
                break;
            }
            if (applePie && foodList.apple) {
                const foods = readlineSync.question(`1. apple ; 2. applePie `);
                if (foods === "1") {
                    this.addHunger(2);
                    this.addAffinity(3);
                    foodList.apple--;
                    console.log("hunger", this.hunger);
                    console.log("affinity", this.affinity);
                    this.printPetMap();
                }
                if (foods === "2") {
                    this.addHunger(5);
                    this.addAffinity(5);
                    applePie--;
                }
            } else if (!applePie) {
                const makeFood = readlineSync.question(
                    `we don't have applePie any more, do you want to cook? (y/n): `
                );
                if (makeFood === "y") {
                    this.cook(foodList);
                }
            } else if (!applePie && !foodList.apple)
                return `we don't have enought apples and applePie, you need go out to pick it`;
        }
    }
    cook(foodList) {
        if (foodList.apple >= 2 && foodList.flour >= 1 && foodList.sugar >= 1) {
            applePie++;
            foodList.apple -= 2;
            foodList.flour--;
            foodList.surge--;
            console.log(`applePie + 1, `);
        } else {
            return `we don't have enought apples, you need go out to pick it`;
        }
    }
    play() {
        if (this.hunger > 8) return `${this.name} ist zu hungrig zum spielen`;
        this.addAffinity(2);
        this.addHunger(3);

        return `${this.name} hat gespielt!`;
    }
    healed() {
        this.addHP(5);
        console.log(`${attacker.playerName} increase his 5 healthPoints `);
    }
    randomNumForQuiz(randomNumArr) {
        while (randomNumArr.length < 4) {
            let randomNum = Math.floor(Math.random() * 10);
            if (!randomNumArr.includes(randomNum)) randomNumArr.push(randomNum);
        }
        console.log("Lasst uns jetzt 'Bulls and Cows game' spielen");
        return randomNumArr;
    }
    quiz() {
        let randomNumArr = [];
        this.randomNumForQuiz(randomNumArr);
        let round = 1;
        while (true) {
            let result = [];
            const guess = readlineSync.question(
                "Gib mir eine nicht wiederholende Vier aus den Zahlen 0 bis 9: "
            );
            console.log("deine zahle ist: ", guess);
            console.log("Round ", round);
            for (let i = 0; i < randomNumArr.length; i++) {
                if (randomNumArr[i] === +guess.split("")[i]) result[i] = "🐃";
                else if (randomNumArr.includes(+guess.split("")[i]))
                    result[i] = "🐄";
                else result[i] = "😿";
            }
            if (!result.every((e) => e === "🐃"))
                console.log(
                    `Round${round}, your answer is ${result}, not collect, continue... `
                ); // 🔥 🎆 🥇 🥈 🥉
            if (result.every((e) => e === "🐃")) {
                if (round <= 3) {
                    this.addIQ(5);
                    console.log(
                        `🎆 Wow,${pet.petName}, du bist wirklich großartig! Du hast es nur in ${round} Versuchen geschafft 🥇❗❗❗ 🎆`
                    );
                }
                if (round > 3 && round < 7) {
                    this.addIQ(3);
                    console.log(
                        `${pet.petName}, Du bist sehr gut, du hast es nur in ${round} Versuchen geschafft. Beim nächsten Mal wird es noch besser sein 🥈❗ `
                    );
                }
                if (round >= 7) {
                    this.addIQ(2);
                    console.log(
                        `Herzlichen Glückwunsch, ${pet.petName}, du hast es im ${round}ten Versuch geschafft. `
                    );
                }
                const playAgain = readlineSync.question(
                    "Do you want to play again? (y/n) "
                );
                if (playAgain === "y") {
                    console.clear();
                    this.printPetMap();
                    randomNumArr = [];
                    this.randomNumForQuiz(randomNumArr);
                    round = 0;
                }
                if (playAgain === "n") break;
            } else {
                if (round >= 7 && round < 10)
                    console.log(
                        `Viel Glück, ${pet.petName}, du hast noch ⏲️ ${
                            10 - round
                        } Versuche.`
                    );
                if (round === 10) {
                    this.reduceIQ(1);
                    console.log(
                        ` 😅 , ${pet.petName}, Spiel vorbei, du hast verloren. Ich wünsche Ihnen einen schönen Tag. Willkommen zur nächsten Herausforderung.`
                    );
                    const playAgain = readlineSync.question(
                        "Do you want to play again? (y/n) "
                    );
                    if (playAgain === "y") {
                        console.clear();
                        this.printPetMap();
                        randomNumArr = [];
                        this.randomNumForQuiz(randomNumArr);
                        round = 0;
                    }
                    if (playAgain === "n") break;
                }
            }
            round++;
        }
    }
    startPetCareMode() {
        let petCareModes;
        if (goPetMap === true) this.isPlaying = true;
        while (this.isPlaying) {
            this.printPetMap();
            petCareModes = readlineSync.keyIn(
                "Use 1/2/3 to choose (or b to mainMap or Q to quit ): ",
                { limit: "123bq" }
            );
            switch (petCareModes) {
                case "1":
                    if (this.hunger === 10) {
                        petCareModes = readlineSync.keyIn(
                            "I am full. I want to go to adventure. Or we can do other things. Use space to go back!",
                            { limit: " " }
                        );
                    } else this.feed();
                    break;
                case "2":
                    this.play();
                    break;
                case "3":
                    this.quiz();
                    break;
                case "4":
                    this.healed();
                    break;
                case "q":
                    this.isPlaying = false;
                    break;
                case "b":
                    this.isPlaying = false;
                    restart = true;
                    gameInMainMap.start();
                    break;
                default:
                    break;
            }
        }
    }
}
