import readlineSync from "readline-sync";
//-------------- Alternative 2 ---------------
class Pet2 {
    constructor(name) {
        this.name = name;
        this.happiness = 5;
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
                        `🎆 Wow, du bist wirklich großartig! Du hast es nur in ${round} Versuchen geschafft 🥇❗❗❗ 🎆`
                    );
                if (round > 3 && round < 7)
                    console.log(
                        `Du bist sehr gut, du hast es nur in ${round} Versuchen geschafft. Beim nächsten Mal wird es noch besser sein 🥈❗ `
                    );
                if (round >= 7)
                    console.log(
                        `Herzlichen Glückwunsch, Herzlichen Glückwunsch, du hast es im ${round}ten Versuch geschafft. `
                    );
                break;
            }
            console.log(
                `Round${round}, your answer is ${result}, not collect, continue... `
            ); // 🔥 🎆 🥇 🥈 🥉
            if (round >= 7 && round < 10)
                console.log(
                    `Viel Glück, du hast noch ⏲️ ${10 - round} Versuche.`
                );
            if (round === 10)
                console.log(
                    " 😅 , Spiel vorbei, du hast verloren. Ich wünsche Ihnen einen schönen Tag. Willkommen zur nächsten Herausforderung."
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

const petName = readlineSync.question("Wie heißt dein Haustier? ");
const myPet = new Pet2(petName);

// const guessStr = readlineSync.question(
//     "Gib mir eine nicht wiederholende Vier aus den Zahlen 0 bis 9: "
// );
console.log(myPet.quiz());
// setInterval(function () {
//     console.log("------------------------------");
//     console.log("");
//     console.log(myPetAndy.printStatus());

//     console.log(myPetAndy.play());
//     console.log(myPetAndy.happiness);
//     console.log(myPetAndy.play());
//     console.log(myPetAndy.happiness);

//     console.log(myPetAndy.feed(foodBread));
//     console.log(myPetAndy.sleep());
//     console.log(myPetAndy.feed(foodApple));
// }, 2000);
