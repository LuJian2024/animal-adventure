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

figlet(greetWord1, { font: "Standard" }, function (err, data1) {
    // console.log(gradient.instagram.multiline(data1));
    const rainbowText = chalkAnimation.rainbow(data1);

    // 当动画完成时停止
    setTimeout(() => {
        rainbowText.stop();
        figlet(greetWord2, { font: "Small" }, function (err, data2) {
            // console.log(data1);
            // console.log(gradient.instagram.multiline(data1));
            // console.log(gradient.instagram.multiline(data2));

            const rainbowText1 = chalkAnimation.rainbow(data2);

            // 当动画完成时停止
            setTimeout(() => {
                rainbowText1.stop();
                console.clear();
                // 打印问题和选项
                // console.clear();
                // const question1 = readlineSync.question("Wähle dein Haustier aus:");

                while (true) {
                    // console.clear();
                    console.log(
                        `Wähle dein Haustier aus: (Use ${chalk.bold.yellow(
                            "u"
                        )}(up ⬆️) and ${chalk.bold.yellow(
                            "d"
                        )}(down ⬇️) to navigate, press ${chalk.bold.blue(
                            "Space"
                        )} to select)`
                    );
                    for (let i = 0; i < petType.length; i++) {
                        if (i === selectedIndex) {
                            // console.log("> " + petType[i]);
                            console.log("> \x1b[36m" + petType[i] + "\x1b[0m");
                        } else {
                            console.log("  " + petType[i]);
                        }
                    }

                    // 监听用户输入
                    const key = readlineSync.keyIn("", {
                        hideEchoBack: true,
                        mask: "",
                        limit: "udq ",
                    });

                    // 根据按键更新选择索引
                    if (key === "u") {
                        selectedIndex =
                            selectedIndex === 0
                                ? petType.length - 1
                                : selectedIndex - 1;
                    } else if (key === "d") {
                        selectedIndex =
                            selectedIndex === petType.length - 1
                                ? 0
                                : selectedIndex + 1;
                    }
                    // } else if (key === "q") {
                    //     // Ctrl+C 退出程序
                    //     process.exit();
                    // }
                    else if (key === " ") {
                        // space键表示选定
                        break;
                    }
                    console.clear();
                }

                // 打印最终选择
                console.log("You selected:", petType[selectedIndex]);
                console.log(chalk.bold.greenBright("Kluge Wahl"));
                petName = readlineSync.question("Wie heißt dein Haustier? ");
                console.log(petName);
                console.log(
                    `Bist du bereit? 🥳 ${chalk.bold.blueBright(
                        petName
                    )}, Wir beginnen ein neues Abenteuer! 🥳`
                );
                // setTimeout(() => {
                //     // rainbowText.stop();
                //     console.clear();
                // }, 5000);
                // console.clear();

                setTimeout(() => {
                    // rainbowText.stop();
                    console.clear();
                    // 初始化游戏并开始
                    const gameInMainMap = new mainMap();
                    gameInMainMap.start();
                    startPetPlayMode();
                    // game.printPetMap();
                }, 3000); //转入游戏主地图时间
            }, 3000); // data2 停止动画的时间（毫秒）
        });
        // console.clear();
    }, 1000); // data1 停止动画的时间（毫秒）
});

// let hasDisplayed = false;
// let getFrag = false;
class mainMap {
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
        this.mapPet = [
            "==================== 💓💓💓 ===============================",
            "                                                           ",
            `                                              ------${petName}----`,
            "                                              | health: 10 ",
            "                                              | IQ:     10 ",
            "                                              |            ",
            "                                              -------------",
            "==================== 💓💓💓 ===============================",
        ];
        this.playerPosition = { x: 1, y: 1 };
        this.isRunning = true;
        this.isAtHome = false;
    }

    //打印主地图
    printMap() {
        console.clear();
        const whichPet = petType[selectedIndex].split(" ")[0];
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

        // //当玩家从外面回到家里时，显示一次信息
        // const targetPositions = [
        //     { x: 30, y: 11 },
        //     { x: 30, y: 12 },
        //     { x: 30, y: 13 },
        // ];

        // // let hasDisplayed = false;

        // if (
        //     !hasDisplayed &&
        //     targetPositions.some(
        //         (pos) =>
        //             pos.x === this.playerPosition.x &&
        //             pos.y === this.playerPosition.y
        //     )
        // ) {
        //     console.log("Zuhause 🏠, süßes Zuhause 🏡 !");
        //     hasDisplayed = true;
        //     getFrag = true;
        // }
    }

    printPetMap() {
        console.clear();
        for (let rowPet of this.mapPet) {
            // 将玩家标记 'M' 替换为 ASCII 艺术
            // row = row.replace("M", "🐯"); // 这里可以使用任何你喜欢的 ASCII 艺术
            console.log(rowPet);
        }
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
                console.log("Zuhause 🏠, süßes Zuhause 🏡 !");
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
                    // getFrag = false;
                    this.isRunning = false;
                    // flag = false;
                    this.printPetMap();
                    // break;
                }
                // if (isPetCare === "n") {
                //     getFrag = false;
                //     break;
                // }
            }

            if (move.toLowerCase() === "q") {
                this.isRunning = false;
                console.log("Game over. Thanks for playing!");
                break;
            }

            this.movePlayer(move.toLowerCase());

            // //在家时，询问是否进入宠物培养系统
            // while (this.playerPosition.x === 30) {
            //     const isPetCare = readlineSync.question(
            //         "Do you want to play with your Pet (y/n)? "
            //     );
            //     if (isPetCare === "y") {
            //         // getFrag = false;
            //         this.isRunning = false;
            //         // flag = false;
            //         // this.printPetMap();
            //         break;
            //     }
            //     if (isPetCare === "n") {
            //         getFrag = false;
            //         break;
            //     }
            //     // setTimeout(() => {
            //     // }, 3000);
            // }
        }
    }
}

class Pet {
    constructor(name) {
        this.name = name;
        this.happiness;
        this.hunger = 5;
    }
    addHappiness(value) {
        // if((this.happiness+value)>10) this.happiness=10
        // if((this.happiness+value)<0) this.happiness=0
        this.happiness = Math.min(this.happiness + value, 10);
    }

    reduceHappiness(value) {
        this.happiness = Math.max(this.happiness - value, 0);
    }

    addHunger(value) {
        this.hunger = Math.min(this.hunger + value, 10);
    }

    reduceHunger(value) {
        this.hunger = Math.max(this.hunger - value, 0);
    }
    feed(food) {
        this.hunger = this.hunger - food.energy;
        if (!food.sweet) this.reduceHappiness(1);
        return `${this.name} hat ${food.name} gegessen!`;
    }
    play() {
        if (this.hunger > 8) return `${this.name} ist zu hungrig zum spielen`;
        this.addHappiness(2);
        this.addHunger(3);
        return `${this.name} hat gespielt!`;
    }
    sleep() {
        this.reduceHappiness(5);
        this.addHunger(2);
        return `${this.name} hat geschlafen!`;
    }
    quiz() {
        //bulls and cows game
        // let randomNumArr = new Array(4).fill(0).Math.floor(Math.random() * 10);
        let randomNumArr = [];
        while (randomNumArr.length < 4) {
            let randomNum = Math.floor(Math.random() * 10);
            if (!randomNumArr.includes(randomNum)) randomNumArr.push(randomNum);
        }
        console.log("Lasst uns jetzt 'Bulls and Cows game' spielen");
        // const guess = readlineSync.question(
        //     "Gib mir eine nicht wiederholende Vier aus den Zahlen 0 bis 9: "
        // );
        // console.log("deine zahle ist: ", guess);
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
            if (result.every((e) => e === "🐃")) {
                if (round <= 3)
                    console.log(
                        `🎆 Wow,${petName}, du bist wirklich großartig! Du hast es nur in ${round} Versuchen geschafft 🥇❗❗❗ 🎆`
                    );
                if (round > 3 && round < 7)
                    console.log(
                        `${petName}, Du bist sehr gut, du hast es nur in ${round} Versuchen geschafft. Beim nächsten Mal wird es noch besser sein 🥈❗ `
                    );
                if (round >= 7)
                    console.log(
                        `Herzlichen Glückwunsch, ${petName}, du hast es im ${round}ten Versuch geschafft. `
                    );
                break;
            }
            console.log(
                `Round${round}, your answer is ${result}, not collect, continue... `
            ); // 🔥 🎆 🥇 🥈 🥉
            if (round >= 7 && round < 10)
                console.log(
                    `Viel Glück, ${petName}, du hast noch ⏲️ ${
                        10 - round
                    } Versuche.`
                );
            if (round === 10)
                console.log(
                    ` 😅 , ${petName}, Spiel vorbei, du hast verloren. Ich wünsche Ihnen einen schönen Tag. Willkommen zur nächsten Herausforderung.`
                );

            round++;
            // console.log("Gib mir neue Vier Zahlen: ");
            // const guess = readlineSync.question("Gib mir neue Vier Zahlen: ");
            // console.log(myPet.quiz(guessStr));
            // this.guess = guessStr;
        }
    }
    printStatus() {
        let mode = "";
        let hungerState = "";
        if (this.happiness >= 0 && this.happiness <= 2) mode = "wütend";
        if (this.happiness >= 3 && this.happiness <= 5) mode = "traurig";
        if (this.happiness >= 6 && this.happiness <= 8) mode = "froh";
        if (this.happiness >= 9 && this.happiness <= 10) mode = "überglücklich";
        if (this.hunger > 5) hungerState = "hunger";
        else hungerState = "keinen hunger";
        return `${this.name} ist ${mode} und hat ${hungerState}`;
    }
}

class Food {
    constructor(name, energy, sweet) {
        this.name = name;
        this.energy = energy;
        this.sweet = sweet;
    }
}
const foodApple = new Food("Apple", 1, true);
const foodBread = new Food("Bread", 3, false);

// const petName = readlineSync.question("Wie heißt dein Haustier? ");
const myPet = new Pet(petName);
function startPetPlayMode() {
    const petCareModes = readlineSync.question(
        "what do you want to do with you prt?\n 1. feeding\n 2.play quiz  "
    );
    if (+petCareModes === 2) myPet.quiz();
}
