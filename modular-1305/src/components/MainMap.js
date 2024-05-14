import readlineSync from "readline-sync";

import { petType } from "../util/initVars.js";
import { petObj } from "../util/functions.js";
import { restart } from "../util/initVars.js"; //重新进入主地图的判断
// import { whichPet } from "../util/initVars.js";
import myPetCareMode from "../components/Pet.js";
import petAdventureMode from "../components/PetAdventure.js";

export let whichPet;
//重新进入宠物战斗系统地图的判断
export let goPetMap = false;
let itemsList = { apples: 0, flours: 0, sugar: 0 };
class MainMap {
    constructor() {
        this.map = [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "X                                                              🎄                           X",
            "X                       🌻                                    🎄  🎄                        X",
            "X                     🌻  🌻                                 🎄   🎄🎄🎄                    X",
            "X                   🌻      🌻                       🎄🎄🎄🎄🎄          🎄🎄🎄              X",
            "X                 🌻          🌻                     🎄                        🎄             X",
            "X               🌻             🌻                🎄 🎄                         🎄             X",
            "X              🌻🌻🌻🌻🌻🌻🌻🌻🌻                 🎄                        🎄               X",
            "X             🌻                🌻               🎄                       🎄                  X",
            "X             🌻                🌻              🎄                     🎄                     X",
            "X             🌻                🌻                                   🎄                       X",
            "X             🌻                                                      🎄                     X",
            "X             🌻                                 🎄🎄🎄                 🎄🎄                  X",
            "X             🌻                                      🎄                   🎄                X",
            "X             🌻🌻🌻🌻🌻🌻🌻🌻🌻🌻                 🎄                      🎄               X",
            "X                                                 🎄                      🎄                 X",
            "X                                                🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄                  X",
            "X                                                                                            X",
            "X                                                                                            X",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        ];
        this.playerPosition = { x: 1, y: 1 };
        this.isRunning = true;
        this.isAtHome = false;
        this.isAdventureMap = false;

        this.applePositions = []; //随机生成苹果的位置
        this.enemyPosition = []; //随机产生怪兽的位置，暂时只产生3个

        this.generateApples(3); // 生成3个苹果
    }

    generateApples(numApples) {
        for (let i = 0; i < numApples + 3; i++) {
            // 随机生成苹果的 x 和 y 坐标 (x: 52~74; y:5~15)
            const randomX = Math.floor(Math.random() * (74 - 52)) + 52; // 在地图上52到74的数中间随机产生一个x的坐标
            const randomY = Math.floor(Math.random() * (15 - 5)) + 5; // 在地图上5到15的数中间随机产生一个y的坐标
            // // 检查随机生成的位置是否为空地，若不是则重新生成
            // while (this.map[randomY][randomX] !== " ") {
            //     randomX =
            //         Math.floor(Math.random() * (this.map[0].length - 2)) + 1;
            //     randomY = Math.floor(Math.random() * (this.map.length - 2)) + 1;
            // }
            if (i < numApples)
                this.applePositions.push({
                    x: randomX,
                    y: randomY,
                });
            //前面的那些给苹果
            else this.enemyPosition.push({ x: randomX, y: randomY }); //最后的3个给怪兽
        }
    }

    getApplesAndEnemies(itemsList) {
        const randomApples = Math.floor(Math.random() * 5) + 1;
        const randomFlours = Math.floor(Math.random() * 3) + 1;
        const randomSugar = Math.floor(Math.random() * 3) + 1;
        // console.log(
        //     `Herzlichen Glückwunsch zu ${randomApples} Äpfeln, ${randomFlours} Mehl und ${randomSugar} Zucker. Möchtest du sie behalten oder wegwerfen?`
        // );
        if (
            this.applePositions.some(
                (item) =>
                    item.x === this.playerPosition.x &&
                    item.y === this.playerPosition.y
            )
        ) {
            const takeApples = readlineSync.question(
                `Herzlichen Glückwunsch zu ${randomApples} Äpfeln, ${randomFlours} Mehl und ${randomSugar} Zucker. Möchtest du sie behalten oder wegwerfen? (y/n)`
            );

            if (takeApples === "y") {
                itemsList.apples += randomApples;
                itemsList.flours += randomFlours;
                itemsList.sugar += randomSugar;
                console.log(
                    `Du hast jetzt ${itemsList.apples} Äpfel, ${itemsList.flours} Mehl und ${itemsList.sugar} Zucker.`
                );
            } else return;
        } else if (
            this.enemyPosition.some(
                (item) =>
                    item.x === this.playerPosition.x &&
                    item.y === this.playerPosition.y
            )
        ) {
            const fightEnemy = readlineSync.question(
                `Vorsicht, du hast ein Monster getroffen. Möchtest du gegen es kämpfen? (y/n)`
            );

            if (fightEnemy === "y") {
                //进入战斗画面
                goToFight = true;
                petAdventureMode.petFightStart();
            } else return;
        }

        return itemsList;
    }

    //打印主地图
    printMap() {
        console.clear();
        whichPet = petType[petObj.selectedIndex].split(" ")[0]; //??? 为何定义全局时，取不到值
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
        console.log("truesure's Position ", this.applePositions);
        console.log("enemy's Position ", this.enemyPosition);
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
        this.generateApples(3);
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
                    "Use W/A/S/D to move (or H to houseMap or Q to quit ): ",
                    // "Use W/A/S/D to move ( or Q to quit ): ",
                    { limit: "wasdqh" }
                );
            } else if (
                // in Adventure map
                this.playerPosition.x >= 50 &&
                this.playerPosition.x <= 76 &&
                this.playerPosition.y >= 5 &&
                this.playerPosition.y <= 15
            ) {
                this.isAdventureMap = true;
                console.log(
                    "Beachte, du bist jetzt auf der Abenteuerkarte. Hier kannst du Glück haben und Schätze 🍎 finden, aber natürlich auch Gefahren 🗡️ begegnen.!"
                );

                //添加随机遇到苹果和怪兽
                this.getApplesAndEnemies(itemsList);

                // 下面的这行代码必须要在，不然会出现代码乱跳的琴况
                move = readlineSync.keyIn(
                    "Use W/A/S/D to move ( or Q to quit ): ",
                    { limit: "wasdq" }
                );
            } else {
                this.isAtHome = false;
                this.isAdventureMap = false;
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
export default gameInMainMap;
