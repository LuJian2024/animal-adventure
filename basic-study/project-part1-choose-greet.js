import readlineSync from "readline-sync";
import figlet from "figlet";
import gradient from "gradient-string";

import chalk from "chalk";
import chalkAnimation from "chalk-animation";

import { setTimeout as waitingTime } from "timers/promises";
console.clear();

const greetWord1 = "Willkommen zu deinem Abenteuer \n";
const greetWord2 = "in der Welt der Haustierpflege und Abenteuer";

// 问题选项
const petType = [
    "Tiger 🐯 (seine Angriffskraft ist höher)",
    "Affe 🐒 (seine Intelligenz ist höher)",
    "Hase 🐰 (seine Zuneigung ist höher)",
];
// 初始选择索引
let selectedIndex = 0;

figlet(greetWord1, { font: "Standard" }, function (err, data1) {
    console.log(gradient.instagram.multiline(data1));
    figlet(greetWord2, { font: "Small" }, function (err, data2) {
        // console.log(data1);
        // console.log(gradient.instagram.multiline(data1));
        console.log(gradient.instagram.multiline(data2));

        // const rainbowText = chalkAnimation.rainbow(data2);

        // // 当动画完成时停止
        // setTimeout(() => {
        //     rainbowText.stop();
        //     // console.clear();
        // }, 3000); // 停止动画的时间（毫秒）

        // // 问题选项
        // const petType = [
        //     "Tiger 🐯 (seine Angriffskraft ist höher)",
        //     "Affe 🐒 (seine Intelligenz ist höher)",
        //     "Hase 🐰 (seine Zuneigung ist höher)",
        // ];

        // // 初始选择索引
        // let selectedIndex = 0;

        // 打印问题和选项
        // console.clear();
        // const question1 = readlineSync.question("Wähle dein Haustier aus:");
        console.log(
            `Wähle dein Haustier aus: (Use ${chalk.bold.yellow(
                "u"
            )}(up) and ${chalk.bold.yellow(
                "d"
            )}(down) to navigate, press ${chalk.bold.blue("Space")} to select)`
        );
        while (true) {
            // console.clear();
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
        const petName = readlineSync.question("Wie heißt dein Haustier? ");
        console.log(petName);
        console.log(
            `Bist du bereit? ${petName}, Wir beginnen ein neues Abenteuer!`
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
            const game = new SuperMarioGame();
            game.start();
        }, 3000);
    });
});

// console.clear();
// const question1 = readlineSync.question("Wie heißt dein Haustier? ");

class SuperMarioGame {
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
        // this.applePositions = [
        //     { x: 20, y: 10 },
        //     { x: 30, y: 11 },
        //     { x: 40, y: 12 },
        // ];
        // this.generateApples(3); // 生成3个苹果
    }

    // generateApples(numApples) {
    //     for (let i = 0; i < numApples; i++) {
    //         // 随机生成苹果的 x 和 y 坐标
    //         const randomX =
    //             Math.floor(Math.random() * (this.map[0].length - 2)) + 1; // 避免苹果被放在地图边缘
    //         const randomY =
    //             Math.floor(Math.random() * (this.map.length - 2)) + 1;
    //         // 检查随机生成的位置是否为空地，若不是则重新生成
    //         while (this.map[randomY][randomX] !== " ") {
    //             randomX =
    //                 Math.floor(Math.random() * (this.map[0].length - 2)) + 1;
    //             randomY = Math.floor(Math.random() * (this.map.length - 2)) + 1;
    //         }
    //         this.applePositions.push({ x: randomX, y: randomY });
    //     }
    // }

    printMap() {
        console.clear();
        for (let row of this.map) {
            // 将玩家标记 'M' 替换为 ASCII 艺术
            row = row.replace("M", "🐯"); // 这里可以使用任何你喜欢的 ASCII 艺术
            console.log(row);
        }
        // 打印玩家当前位置坐标
        console.log("player's Position:", this.playerPosition);

        //当玩家从外面回到家里时，显示一次信息
        const targetPositions = [
            { x: 30, y: 11 },
            { x: 30, y: 12 },
            { x: 30, y: 13 },
        ];

        let hasDisplayed = false;

        if (
            !hasDisplayed &&
            targetPositions.some(
                (pos) =>
                    pos.x === this.playerPosition.x &&
                    pos.y === this.playerPosition.y
            )
        ) {
            console.log("I am back to home 🏠 !");
            hasDisplayed = true;
        }

        //在家时，询问是否进入宠物培养系统
        if (hasDisplayed) {
            setTimeout(() => {
                // rainbowText.stop();
                // console.clear();
                // 初始化游戏并开始
                console.log("Do you want to go to adeventure?");
            }, 3000);
        }
        // if (
        //     (this.playerPosition.x === 30 &&
        //         this.playerPosition.y === 11) ||
        //     (this.playerPosition.x === 30 &&
        //         this.playerPosition.y === 12) ||
        //     (this.playerPosition.x === 30 &&
        //         this.playerPosition.y === 13)
        // ) {
        //     console.log("I am back to home 🏠 !");
        // }

        // 检查玩家是否捡到苹果
        // for (let applePos of this.applePositions) {
        //     if (
        //         this.playerPosition.x === applePos.x &&
        //         this.playerPosition.y === applePos.y
        //     ) {
        //         console.log("You picked an apple 🍎!");
        //     }
        // }
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
                this.map[this.playerPosition.y].substr(
                    0,
                    this.playerPosition.x
                ) +
                " " +
                this.map[this.playerPosition.y].substr(
                    this.playerPosition.x + 1
                );
            this.playerPosition.x = newX;
            this.playerPosition.y = newY;
            this.map[this.playerPosition.y] =
                this.map[this.playerPosition.y].substr(
                    0,
                    this.playerPosition.x
                ) +
                "M" +
                this.map[this.playerPosition.y].substr(
                    this.playerPosition.x + 1
                );

            // 如果玩家到达房子的位置，则弹出消息
            // if (this.playerPosition.x === 10 && this.playerPosition.y === 7) {
            //     console.log("我回到家了！");
            // }
        }
    }

    start() {
        while (this.isRunning) {
            this.printMap();
            const move = readlineSync.keyIn(
                "Use W/A/S/D to move (or Q to quit): ",
                { limit: "wasdq" }
            );

            if (move.toLowerCase() === "q") {
                this.isRunning = false;
                console.log("Game over. Thanks for playing!");
                break;
            }

            this.movePlayer(move.toLowerCase());
        }
    }
}

// 获取玩家当前位置并打印
// const playerPos = game.getPlayerPosition();
// console.log("player's Position: ", playerPos);
