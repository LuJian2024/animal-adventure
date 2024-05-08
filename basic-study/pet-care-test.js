import readlineSync from "readline-sync";
//------- 宠物养成系统 ------------
let applePie = 0;
const foodList = { apple: 10, flour: 10, sugar: 10 };
class PetCare {
    constructor(
        name,
        type = "",
        hunger = 5,
        affinity = 5,
        IQ = 10,
        HP = 10,
        attack = 10
    ) {
        this.mapPet = [
            "==================== 💓💓💓 ===============================",
            "                                                           ",
            `                                              ---- test ----`,
            `                                              | hunger: ${this.hunger}`,
            `                                              | IQ:     ${this.IQ}`,
            `                                              | affinity:${this.affinity}`,
            "                                              -------------",
            "==================== 💓💓💓 ===============================",
        ];
        this.name = name;
        this.type = type;
        this.hunger = hunger;
        this.affinity = affinity;
        this.IQ = IQ;
        this.HP = HP;
        this.attack = attack;
        // this.weapons = {
        //     weaponName: weaponName,
        //     weaponAttack: weaponAttack,
        // };
    }

    printPetMap() {
        console.clear();
        for (let rowPet of this.mapPet) {
            console.log(rowPet);
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
    foodStock() {}
    feed() {
        while (this.hunger < 10) {
            if (applePie && foodList.apple) {
                const foods = readlineSync.question(`1. apple ; 2. applePie `);
                if (foods === "1") {
                    this.addHunger(2);
                    this.addAffinity(3);
                    foodList.apple--;
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
                    console.log(foodList);
                    console.log(applePie);
                }
            } else if (!applePie && !foodList.apple)
                return `we don't have enought apples and applePie, you need go out to pick it`;
        }
        return `I am full. I want to go to adventure`;
    }
    cook(foodList) {
        console.log("here is cook");
        if (foodList.apple >= 2 && foodList.flour >= 1 && foodList.sugar >= 1) {
            applePie++;
            foodList.apple -= 2;
            foodList.flour--;
            foodList.sugar--;
            console.log(`applePie + 1, `);
            return applePie;
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

    quiz() {
        //bulls and cows game
        // let randomNumArr = new Array(4).fill(0).Math.floor(Math.random() * 10);
        let randomNumArr = [];
        while (randomNumArr.length < 4) {
            let randomNum = Math.floor(Math.random() * 10);
            if (!randomNumArr.includes(randomNum)) randomNumArr.push(randomNum);
        }
        console.log("Lasst uns jetzt 'Bulls and Cows game' spielen");
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
        }
    }

    printStatus() {
        let mode = "";
        let hungerState = "";
        if (this.affinity >= 0 && this.affinity <= 2) mode = "wütend";
        if (this.affinity >= 3 && this.affinity <= 5) mode = "traurig";
        if (this.affinity >= 6 && this.affinity <= 8) mode = "froh";
        if (this.affinity >= 9 && this.affinity <= 10) mode = "überglücklich";
        if (this.hunger > 5) hungerState = "hunger";
        else hungerState = "keinen hunger";
        return `${this.name} ist ${mode} und hat ${hungerState}`;
    }

    startPetCareMode() {
        console.clear();
        console.log(this);
        this.printPetMap();
        const petCareModes = readlineSync.question(
            "what do you want to do with you prt?\n 1. feeding\n 2.play quiz\n 3. just play  "
        );
        switch (petCareModes) {
            case "1":
                this.feed();
                break;
            case "2":
                this.quiz();
                break;
            case "3":
                this.play();
                break;
            default:
                break;
        }
    }
}
const myPetCareMode = new PetCare("bob");
myPetCareMode.startPetCareMode();
// class Food {
//     constructor(name, energy, sweet) {
//         this.name = name;
//         this.energy = energy;
//         this.sweet = sweet;
//     }
// }
// const foodApple = new Food("Apple", 1, true);
// const foodBread = new Food("Bread", 3, false);
