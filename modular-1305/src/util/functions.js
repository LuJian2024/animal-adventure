import { greetWord1, greetWord2, petType } from "./initVars.js";
import gameInMainMap from "../components/MainMap.js";
import figlet from "figlet";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import readlineSync from "readline-sync";
import { setTimeout as waitingTime } from "timers/promises";

export let petObj = {
    petName: "",
    selectedIndex: 0,
};

export function printWelcomeMessage() {
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

export async function printPetSelection() {
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
            if (i === petObj.selectedIndex) {
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
        if (key === "u") {
            petObj.selectedIndex =
                petObj.selectedIndex === 0
                    ? petType.length - 1
                    : pet.selectedIndex - 1;
        } else if (key === "d") {
            petObj.selectedIndex =
                petObj.selectedIndex === petType.length - 1
                    ? 0
                    : petObj.selectedIndex + 1;
        } else if (key === "q") {
            process.exit();
        } else if (key === " ") {
            break;
        }
        console.clear();
    }
    console.log("You selected:", petType[petObj.selectedIndex]);
    console.log(chalk.bold.greenBright("Kluge Wahl"));
    petObj.petName = readlineSync.question("Wie heißt dein Haustier? ");
    console.log(
        `Bist du bereit? 🥳 ${chalk.bold.blueBright(
            petObj.petName
        )}, Wir beginnen ein neues Abenteuer! 🥳`
    );

    await waitingTime(3000);
    console.clear();
    startGame();
}

export function startGame() {
    gameInMainMap.start();
}
