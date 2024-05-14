import { restart } from "../util/initVars.js";
import { petObj } from "../util/functions.js";
import { whichPet, goPetMap } from "../components/MainMap.js";
import gameInMainMap from "../components/MainMap.js";
import petMaps from "../components/PetEnemyMaps.js";

export let applePie = 0;
export let foodList = { apple: 10, flour: 10, sugar: 10 };

//------- 宠物养成系统 ------------
export class Pet {
    constructor(name, type = "", hunger = 5, affinity = 5, IQ = 5, HP = 100) {
        this.name = name;
        this.type = type;
        this.hunger = hunger;
        this.affinity = affinity;
        this.IQ = IQ;
        this.HP = HP;

        this.isPlaying = true;
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
        this.HP = Math.min(this.HP + value, 10);
    }

    //foodStock() {}

    feed() {
        while (true) {
            console.log(this.hunger);
            if (this.hunger === 10) {
                // console.log(`I am full. I want to go to adventure`); // 显示不出来????
                const getMessage = readlineSync.keyIn(
                    "I am full. I want to go to adventure. Or we can do other things. Use space to go back!",
                    { limit: " " }
                );
                if (getMessage === " ") return;
            }

            if (applePie && foodList.apple) {
                const foods = readlineSync.question(`1. apple ; 2. applePie `);
                if (foods === "1") {
                    this.addHunger(2);
                    this.addAffinity(3);
                    foodList.apple--;
                    console.log("hunger", this.hunger);
                    console.log("affinity", this.affinity);
                    petMaps.printPetMap();
                    // this.printPetMap();
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
        this.addHP(50);
        // console.log(`${attacker.playerName} increase his 5 healthPoints `);
    }

    randomNumForQuiz(randomNumArr) {
        while (randomNumArr.length < 4) {
            let randomNum = Math.floor(Math.random() * 10);
            if (!randomNumArr.includes(randomNum)) randomNumArr.push(randomNum);
        }
        console.log(
            `Lasst uns jetzt 'Bulls and Cows game' spielen. \n ${chalk.bold.bgYellow(
                "Regeln"
            )}: 1. Die Geheimzahl muss aus 4 Ziffern bestehen und jede Ziffer muss einzigartig sein.\n2. Wenn die Ziffern übereinstimmen und sich an der richtigen Stelle befinden, werden sie als "🐃" gezählt. \n3. Wenn sie sich an unterschiedlichen Positionen befinden, werden sie als "🐄" gezählt. \n4. Wenn die Ziffern nicht richtig sind, werden sie als "😿" gezählt.`
        );
        return randomNumArr;
    }
    quiz() {
        //bulls and cows game
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
            // console.log(randomNumArr);
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
                        `🎆 Wow,${chalk.blue(
                            petName
                        )}, du bist wirklich großartig! Du hast es nur in ${round} Versuchen geschafft 🥇❗❗❗ 🎆`
                    );
                }
                if (round > 3 && round < 7) {
                    this.addIQ(3);
                    console.log(
                        `${chalk.blue(
                            petName
                        )}, Du bist sehr gut, du hast es nur in ${round} Versuchen geschafft. Beim nächsten Mal wird es noch besser sein 🥈❗ `
                    );
                }
                if (round >= 7) {
                    this.addIQ(2);
                    console.log(
                        `Herzlichen Glückwunsch,${chalk.blue(
                            petName
                        )}, du hast es im ${round}ten Versuch geschafft. `
                    );
                }
                // round = 1;
                // this.playAgain(randomNumArr);
                const playAgain = readlineSync.question(
                    "Do you want to play again? (y/n) "
                );
                if (playAgain === "y") {
                    console.clear();
                    petMaps.printPetMap();
                    randomNumArr = [];
                    this.randomNumForQuiz(randomNumArr);
                    round = 0;
                }
                if (playAgain === "n") break;
                //  break;
            } else {
                if (round >= 7 && round < 10)
                    console.log(
                        `Viel Glück, ${chalk.blue(
                            petName
                        )}, du hast noch ⏲️ ${chalk.yellow(
                            10 - round
                        )} Versuche.`
                    );
                if (round === 10) {
                    this.reduceIQ(1);
                    console.log(
                        ` 😅 ,${chalk.blue(
                            petName
                        )}, Spiel vorbei, du hast verloren. Ich wünsche Ihnen einen schönen Tag. Willkommen zur nächsten Herausforderung.`
                    );
                    // round = 1;
                    // this.playAgain(randomNumArr);
                    const playAgain = readlineSync.question(
                        "Do you want to play again? (y/n) "
                    );
                    if (playAgain === "y") {
                        console.clear();
                        petMaps.printPetMap();
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
            petMaps.printPetMap();
            petCareModes = readlineSync.keyIn(
                "Use 1/2/3 to choose (or b to mainMap or Q to quit ): ",
                { limit: "123bq" }
            );

            switch (petCareModes) {
                case "1":
                    this.feed();
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
                    console.log("Game over. Thanks for playing!");
                    process.exit();
                // break;
                case "b":
                    this.isPlaying = false;
                    restart = true; // go back to main map
                    gameInMainMap.start();
                    break;
                default:
                    break;
            }
        }
    }
}
const myPetCareMode = new Pet(petObj.petName, whichPet);
export default myPetCareMode;

// // import readlineSync from "readline-sync";
// // import { whichPet } from "../components/MainMap.js";
// // import { restart, goPetMap } from "../util/initVars.js";
// // import { whichPet, goPetMap } from "../components/MainMap.js";
// // import gameInMainMap from "../components/MainMap.js";
// // import myPetCareMode from "../components/Pet.js";
// // import petMaps from "../components/PetEnemyMaps.js";
// // import { petObj } from "../util/functions.js";
// // import { Pet } from "../components/Pet.js";

// //进入宠物战斗系统
// export const WeaponsList = [
//     { weaponName: "Stab des Feuers", weaponAttack: 15 },
//     { weaponName: "Donnerstab", weaponAttack: 15 },
//     { weaponName: "Engelstab", weaponAttack: 15 },
//     { weaponName: "Dunkelheitsstab", weaponAttack: 15 },
//     { weaponName: "Drachenstab", weaponAttack: 15 },
//     { weaponName: "Weisenstab", weaponAttack: 15 },
// ];
// export let isFight;
// export let randomEnemy;

// class PetAdventure extends Pet {
//     constructor(attack, weaponName = "", weaponAttack = 0, ...args) {
//         super(...args);

//         this.attack = attack;

//         this.weapons = {
//             weaponName: weaponName,
//             weaponAttack: weaponAttack,
//         };
//         this.isFighting = true;
//     }

//     fight(enemy) {
//         while (true) {
//             enemy.HP = enemy.HP - (this.attack + this.weapons.weaponAttack);
//             enemy.HP <= 0 ? (enemy.HP = 0) : enemy.HP;

//             readlineSync.keyInPause(
//                 `${this.name} fight ${enemy.name}(${enemy.HP}), press any key to continue`
//             );
//             this.HP = this.HP - enemy.attack;
//             this.HP <= 0 ? (this.HP = 0) : this.HP;

//             readlineSync.keyInPause(
//                 `${enemy.name} fight ${this.name}(${this.HP}), press any key to continue`
//             );

//             petMaps.printPetFightMap(); //每次HP变化时都要更新地图

//             if (enemy.HP <= 0) this.getWeapons();
//             if (this.HP <= 0) {
//                 this.isFighting = false;
//                 goPetMap = true;
//                 readlineSync.keyInPause(
//                     `your HP is ${this.HP} now, you must be go home to heal. press any key to continue`
//                 );
//                 myPetCareMode.startPetCareMode();
//                 break;
//             }
//         }
//     }
//     fightOrGoHome(enemy) {
//         if (this.HP > 50) {
//             if (this.IQ > 15) {
//                 isFight = readlineSync.keyIn(
//                     `Die HP des Feindes sind l, die Angriffskraft ist n; Deine HP sind m, deine Angriffskraft ist k. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
//                     { limit: "khe" }
//                 );
//             } else {
//                 if (enemy.HP > this.HP && enemy.attack > this.attack) {
//                     isFight = readlineSync.keyIn(
//                         `Gefahr, du könntest wahrscheinlich umkommen. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
//                         { limit: "khe" }
//                     );
//                 } else {
//                     isFight = readlineSync.keyIn(
//                         `Du hast möglicherweise die Möglichkeit, deinen Feind zu besiegen. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
//                         { limit: "khe" }
//                     );
//                 }
//             }
//         } else if (this.HP === 0) {
//             this.isFighting = false;
//             goPetMap = true;
//             readlineSync.keyInPause(
//                 `your HP is ${this.HP} now, you must be go home to heal. press any key to continue`
//             );
//             myPetCareMode.startPetCareMode();
//         } else {
//             isFight = readlineSync.keyIn(
//                 `Deine Lebenspunkte sind zu niedrig. Es besteht die Möglichkeit, dass du im Kampf sterben wirst. Es wird empfohlen, zunächst nach Hause zu gehen und dich zu heilen. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
//                 { limit: "khe" }
//             );
//         }
//         if (isFight === "k") {
//             this.fight(enemiesList[randomEnemy]);
//         }
//         if (isFight === "h") {
//             goPetMap = true;
//             // console.log(goPetMap);
//             // readlineSync.keyInPause("press any key to continue");
//             myPetCareMode.startPetCareMode();
//         }
//         if (isFight === "e") {
//             gameInMainMap.start();
//         }
//     }
//     getWeapons() {
//         const randomWeaponIndex = Math.floor(
//             Math.random() * WeaponsList.length
//         );

//         const equipWeapon = readlineSync.question(
//             `Du hast ${WeaponsList[randomWeaponIndex].weaponName} erhalten, Angriffskraft ist ${WeaponsList[randomWeaponIndex].weaponAttack}; Dein aktuelles ist ${this.weapons.weaponName}, Angriffskraft ist ${this.weapons.weaponAttack}. Möchtest du es ersetzen? (y/n)`
//         );
//         if (equipWeapon === "y") {
//             this.weapons.weaponName = WeaponsList[randomWeaponIndex].weaponName;
//             this.weapons.weaponAttack =
//                 WeaponsList[randomWeaponIndex].weaponAttack;
//         }
//     }

//     petFightStart() {
//         console.clear();
//         maxPetHP = myPetCareMode.HP;
//         randomEnemy = Math.floor(Math.random() * enemiesList.length);
//         enemyType = enemiesList[randomEnemy].type;
//         enemyRandom = enemiesList[randomEnemy];
//         maxEnemyHP = enemiesList[randomEnemy].HP;
//         if (goToFight === true) this.isFighting = true;
//         while (this.isFighting) {
//             petMaps.printPetFightMap();
//             console.log(enemiesList[randomEnemy]);
//             console.log(("my HP is: ", this.HP));
//             this.fightOrGoHome(enemiesList[randomEnemy]);
//         }
//     }
// }

// const petAdventureMode = new PetAdventure(10, "", 0, petObj.petName, whichPet);
// export  petAdventureMode;
