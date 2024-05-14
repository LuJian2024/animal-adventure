import readlineSync from "readline-sync";
import figlet from "figlet";
import gradient from "gradient-string";

import chalk from "chalk";
import chalkAnimation from "chalk-animation";

import { setTimeout as waitingTime } from "timers/promises";
console.clear();

const greetWord1 = "Willkommen zu deinem Abenteuer \n";
const greetWord2 =
    "                       in der Welt       \n                  der Haustierpflege       \n               und Abenteuer";

// 问题选项
const petType = [
    "Tiger 🐯 (seine Angriffskraft ist höher)",
    "Affe 🐒 (seine Intelligenz ist höher)",
    "Hase 🐰 (seine Zuneigung ist höher)",
];
let petName = "";
// 初始选择索引
let selectedIndex = 0;
//重新进入主地图的判断
let restart = false;
let goPetMap = false;

function printWelcomeMessage() {
    figlet(greetWord1, { font: "Standard" }, function (err, data1) {
        const rainbowText = chalkAnimation.rainbow(data1);

        setTimeout(() => {
            rainbowText.stop();
            figlet(greetWord2, { font: "Small" }, function (err, data2) {
                const rainbowText1 = chalkAnimation.rainbow(data2);

                setTimeout(() => {
                    rainbowText1.stop();
                    console.clear();
                    printPetSelection();
                }, 3000);
            });
        }, 1000);
    });
}

async function printPetSelection() {
    while (true) {
        console.log(
            `Wähle dein Haustier aus: (Use ${chalk.bold.yellow(
                "u"
            )}(up ⬆️) and ${chalk.bold.yellow(
                "d"
            )}(down ⬇️) to navigate, press ${chalk.bold.blue(
                "Space"
            )} to select), press ${chalk.bold.red("q")} to quit the game)`
        );
        for (let i = 0; i < petType.length; i++) {
            if (i === selectedIndex) {
                console.log("> \x1b[36m" + petType[i] + "\x1b[0m");
            } else {
                console.log("  " + petType[i]);
            }
        }

        const key = readlineSync.keyIn("", {
            hideEchoBack: true,
            mask: "",
            limit: "udq ",
        });
        // 根据按键更新选择索引
        if (key === "u") {
            selectedIndex =
                selectedIndex === 0 ? petType.length - 1 : selectedIndex - 1;
        } else if (key === "d") {
            selectedIndex =
                selectedIndex === petType.length - 1 ? 0 : selectedIndex + 1;
        } else if (key === "q") {
            // Ctrl+C 退出程序
            process.exit();
        } else if (key === " ") {
            // space键表示选定
            break;
        }
        console.clear();
    }
    // 打印最终选择
    console.log("Du hast ausgewählt:", petType[selectedIndex]);
    console.log(chalk.bold.greenBright("Kluge Wahl"));
    petName = readlineSync.question("Wie heißt dein Haustier? ");
    //console.log(petName);
    console.log(
        `Bist du bereit? 🥳 ${chalk.bold.blueBright(
            petName
        )}, Wir beginnen ein neues Abenteuer! 🥳`
    );
    // await 只能使用在异步函数 async function 内使用，不用await，也可用setTimeout(callback), ??? 同样的问题上面的console.log无法正常显示 ???
    // await waitingTime(3000);
    // console.clear();
    // startGame();
    setTimeout(() => {
        console.clear();
        startGame();
    }, 3000);
}

function startGame() {
    // 初始化游戏并开始
    // const gameInMainMap = new MainMap();
    gameInMainMap.start();
    // myPetCareMode.startPetCareMode();
}

printWelcomeMessage();
// await waitingTime(3000);
// console.clear();
// startGame();

// figlet(greetWord1, { font: "Standard" }, function (err, data1) {
//     // console.log(gradient.instagram.multiline(data1));
//     const rainbowText = chalkAnimation.rainbow(data1);

//     // 当动画完成时停止
//     setTimeout(() => {
//         rainbowText.stop();
//         figlet(greetWord2, { font: "Small" }, function (err, data2) {
//             const rainbowText1 = chalkAnimation.rainbow(data2);

//             // 当动画完成时停止
//             setTimeout(() => {
//                 rainbowText1.stop();
//                 console.clear();

//                 while (true) {
//                     console.log(
//                         `Wähle dein Haustier aus: (Use ${chalk.bold.yellow(
//                             "u"
//                         )}(up ⬆️) and ${chalk.bold.yellow(
//                             "d"
//                         )}(down ⬇️) to navigate, press ${chalk.bold.blue(
//                             "Space"
//                         )} to select), press ${chalk.bold.red(
//                             "q"
//                         )} to quit the game)`
//                     );
//                     for (let i = 0; i < petType.length; i++) {
//                         if (i === selectedIndex) {
//                             // console.log("> " + petType[i]);
//                             console.log("> \x1b[36m" + petType[i] + "\x1b[0m");
//                         } else {
//                             console.log("  " + petType[i]);
//                         }
//                     }

//                     // 监听用户输入
//                     const key = readlineSync.keyIn("", {
//                         hideEchoBack: true,
//                         mask: "",
//                         limit: "udq ",
//                     });

//                     // 根据按键更新选择索引
//                     if (key === "u") {
//                         selectedIndex =
//                             selectedIndex === 0
//                                 ? petType.length - 1
//                                 : selectedIndex - 1;
//                     } else if (key === "d") {
//                         selectedIndex =
//                             selectedIndex === petType.length - 1
//                                 ? 0
//                                 : selectedIndex + 1;
//                     } else if (key === "q") {
//                         // Ctrl+C 退出程序
//                         process.exit();
//                     } else if (key === " ") {
//                         // space键表示选定
//                         break;
//                     }
//                     console.clear();
//                 }

//                 // 打印最终选择
//                 console.log("You selected:", petType[selectedIndex]);
//                 console.log(chalk.bold.greenBright("Kluge Wahl"));
//                 petName = readlineSync.question("Wie heißt dein Haustier? ");
//                 console.log(petName);
//                 console.log(
//                     `Bist du bereit? 🥳 ${chalk.bold.blueBright(
//                         petName
//                     )}, Wir beginnen ein neues Abenteuer! 🥳`
//                 );

//                 setTimeout(() => {
//                     // rainbowText.stop();
//                     console.clear();

//                     // 初始化游戏并开始
//                     // const gameInMainMap = new MainMap();
//                     gameInMainMap.start();
//                     myPetCareMode.startPetCareMode();
//                 }, 3000); //转入游戏主地图时间
//             }, 3000); // data2 停止动画的时间（毫秒）
//         });
//         // console.clear();
//     }, 1000); // data1 停止动画的时间（毫秒）
// });

// ------ 进入主地图模式 ---------------
// let whichPet = petType[selectedIndex].split(" ")[0];  //在这里定义取不到值???

let whichPet;
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
        // this.isAtHome = false;
    }

    //打印主地图
    printMap() {
        console.clear();
        whichPet = petType[selectedIndex].split(" ")[0]; //??? 为何定义全局时，取不到值
        for (let row of this.map) {
            // 将玩家标记 'M' 替换为 ASCII 艺术, 不同的宠物对应不同的图标
            if (whichPet === "Tiger") row = row.replace("M", "🐯");
            // 这里可以使用任何你喜欢的 ASCII 艺术
            else if (whichPet === "Affe") row = row.replace("M", "🐒");
            else if (whichPet === "Hase") row = row.replace("M", "🐰");
            console.log(row);
        }
        // 打印玩家当前位置坐标
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
        // let flag = true;
        let move;
        if (restart === true) this.isRunning = true;
        while (this.isRunning) {
            console.log(this.isRunning);
            if (!this.isRunning) break;
            this.printMap();

            // at home
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

            //询问是否进入宠物养成系统
            if (move.toLowerCase() === "h") {
                const isPetCare = readlineSync.question(
                    "Do you want to play with your Pet (y/n)? "
                );
                if (isPetCare === "y") {
                    this.isRunning = false;
                    goPetMap = true;
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

//------- 宠物养成系统 ------------
let applePie = 0;
const foodList = { apple: 10, flour: 10, sugar: 10 };
class Pet {
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
            "     `--'\\ \\   <___/.                    ----${petName}----             ",
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
            `   /.. ./  .-. .-. .'/ ..  )              ----${petName}----             `,
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
            `    **   **                               ----${petName}----             `,
            `    **   **         ****                | hunger: ${this.hunger}        `,
            `    **   **       **   ****             | IQ:     ${this.IQ}            `,
            `    **  **       *   **   **            | affinity:${this.affinity}     `,
            `     **  *      *  **  ***  **          | HP:   ${this.HP}              `,
            `       **  *    *  **     **  *          ----------------------         `,
            "        ** **  ** **          **                                        ",
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
        // 这里可以使用任何你喜欢的 ASCII 艺术
        else if (whichPet === "Affe") mapPet = this.mapManky;
        else if (whichPet === "Hase") mapPet = this.mapRabbit;
        for (let rowPet of mapPet) {
            // 在每次打印地图之前，更新地图中显示饥饿度的部分
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
        // return this.hunger;
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
    foodStock() {}
    feed() {
        if (this.hunger === 10) {
            // setTimeout(() => {
            //     console.log(`I am full. I want to go to adventure`);
            // }, 2000);      // 这样还是不能输出
            console.log(`I am full. I want to go to adventure`); //这样还是不能输出
            return;
            //break;
        }

        // 异步操作，等待用户输入
        // const anyKey = readlineSync.keyInPause("Press any key to continue..."); // 这句不会执行???
        readlineSync.keyInPause("Press any key to continue..."); // 这句不会执行???

        while (true) {
            // if (this.hunger === 10) {
            //     setTimeout(() => {
            //         console.log(`I am full. I want to go to adventure`);
            //     }, 0);
            //     // console.log(`I am full. I want to go to adventure`); //这样还是不能输出
            //     return;
            //     //break;
            // }
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
        // setTimeout(() => {
        //     console.log(`I am full. I want to go to adventure`);
        // }, 3000);
        // return `I am full. I want to go to adventure`;
    }
    cook(foodList) {
        if (foodList.apple >= 2 && foodList.flour >= 1 && foodList.sugar >= 1) {
            applePie++;
            foodList.apple -= 2;
            foodList.flour--;
            foodList.surge--;
            console.log(`applePie + 1, `);
            // return applePie;
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
    // sleep() {
    //     this.reduceAffinity(5);
    //     this.addHunger(2);
    //     return `${this.name} hat geschlafen!`;
    // }
    randomNumForQuiz(randomNumArr) {
        //randomNumArr = [];
        while (randomNumArr.length < 4) {
            let randomNum = Math.floor(Math.random() * 10);
            if (!randomNumArr.includes(randomNum)) randomNumArr.push(randomNum);
        }
        console.log("Lasst uns jetzt 'Bulls and Cows game' spielen");
        return randomNumArr;
    }
    quiz() {
        //bulls and cows game
        // let randomNumArr = new Array(4).fill(0).Math.floor(Math.random() * 10);
        let randomNumArr = [];
        // while (randomNumArr.length < 4) {
        //     let randomNum = Math.floor(Math.random() * 10);
        //     if (!randomNumArr.includes(randomNum)) randomNumArr.push(randomNum);
        // }
        // console.log("Lasst uns jetzt 'Bulls and Cows game' spielen");
        this.randomNumForQuiz(randomNumArr);
        let round = 1;
        while (true) {
            let result = [];
            const guess = readlineSync.question(
                "Gib mir eine nicht wiederholende Vier aus den Zahlen 0 bis 9: "
            );
            console.log("deine zahle ist: ", guess);
            // console.log("deine zahle ist: ", guess);
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

                // ??????? 如果没有下面的询问语句，上面的console.log也显示不出来 ??????
                // const playAgain = readlineSync.question(
                //     "Do you want to play again? (y/n) "
                // );
                // if (playAgain === "y") {
                //     console.clear();
                //     this.printPetMap();
                //     randomNumArr = [];
                //     this.randomNumForQuiz(randomNumArr);
                //     round = 0;
                // }
                // if (playAgain === "n") break;
                break; //推出整个问题的循环，回到主菜单
            } else {
                if (round >= 7 && round < 10)
                    console.log(
                        `Viel Glück,${chalk.blue(petName)}, du hast noch ⏲️ ${
                            10 - round
                        } Versuche.`
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
                    // ????????? 这里和上面那段是同样的问题 ????????????
                    // const playAgain = readlineSync.question(
                    //     "Do you want to play again? (y/n) "
                    // );
                    // if (playAgain === "y") {
                    //     console.clear();
                    //     this.printPetMap();
                    //     randomNumArr = [];
                    //     this.randomNumForQuiz(randomNumArr);
                    //     round = 0;
                    // }
                    // if (playAgain === "n") break;
                }
            }
            round++;
        }
    }
    // playAgain(randomNumArr) {
    //     const playAgain = readlineSync.question(
    //         "Do you want to play again? (y/n) "
    //     );
    //     if (playAgain === "y") {
    //         console.clear();
    //         this.printPetMap();
    //         randomNumArr = [];
    //         this.randomNumForQuiz(randomNumArr);
    //         // round = 1;
    //     }
    //     if (playAgain === "n") return;
    // }
    // printStatus() {
    //     let mode = "";
    //     let hungerState = "";
    //     if (this.affinity >= 0 && this.affinity <= 2) mode = "wütend";
    //     if (this.affinity >= 3 && this.affinity <= 5) mode = "traurig";
    //     if (this.affinity >= 6 && this.affinity <= 8) mode = "froh";
    //     if (this.affinity >= 9 && this.affinity <= 10) mode = "überglücklich";
    //     if (this.hunger > 5) hungerState = "hunger";
    //     else hungerState = "keinen hunger";
    //     return `${this.name} ist ${mode} und hat ${hungerState}`;
    // }

    startPetCareMode() {
        let petCareModes;
        // console.clear();
        // console.log(this);
        if (goPetMap === true) this.isPlaying = true;
        while (this.isPlaying) {
            this.printPetMap();
            petCareModes = readlineSync.keyIn(
                "Use 1/2/3 to choose (or b to mainMap or Q to quit ): ",
                { limit: "123bq" }
            );
            // petCareModes = readlineSync.question(
            //     "what do you want to do with you pet? "
            // );
            switch (petCareModes) {
                case "1":
                    // if (this.hunger === 10) {
                    //     console.log(`I am full. I want to go to adventure`); // ??? 显示不出来 ??? 放在这里和写在feed方法里面，是一样的效果，还是有区别
                    //     // petCareModes = readlineSync.keyIn(
                    //     //     "I am full. I want to go to adventure. Or we can do other things. Use space to go back!",
                    //     //     { limit: " " }
                    //     // );
                    // } else this.feed();
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
                    break;
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
const myPetCareMode = new Pet(petName, whichPet, 10);
