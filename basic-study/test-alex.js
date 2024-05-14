// Your code here!
import readlineSync from "readline-sync";

// Wait for user's response.
var userName = readlineSync.question("May I have your name? ");
console.log("Hi " + userName + "!");

// Handle the secret text (e.g. password).
var favFood = readlineSync.question("What is your favorite food? ", {
    hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
});
console.log("Oh, " + userName + " loves " + favFood + "!");
class Calculator {
    constructor() {
        this.PI = Math.PI;
        this.E = Math.E;
    }

    ratio(x, y, width) {
        return (y / x) * width;
    }

    percentage(x, y) {
        if (y === 0) {
            return "Fehler: Divisor darf nicht Null sein";
        }
        const result = (x / y) * 100;
        return result.toFixed(0) + "%";
    }

    //   let a=readlineSync.question("Gib mir nummer1: ");
    //   let b=readlineSync.question("Gib mir nummer2: ");

    add(x, y) {
        return x + y;
    }

    subtract(x, y) {
        return y - x;
    }

    multiply(x, y) {
        return x * y;
    }

    divide(x, y) {
        if (y === 0) {
            return "Fehler: Divisor darf nicht Null sein";
        }
        return x / y;
    }

    remainder(x, y) {
        if (y === 0) {
            return "Fehler: Divisor darf nicht Null sein";
        }
        return x % y;
    }

    elevate(x, y) {
        return Math.pow(x, y);
    }

    sqrt(x) {
        if (x < 0) {
            return "Fehler: Quadratwurzel einer negativen Zahl kann nicht berechnet werden";
        }
        return Math.sqrt(x);
    }
    sin(x) {
        return Math.sin((90 * Math.PI) / 180);
    }
    cos(x) {
        return Math.cos((0 * Math.PI) / 180);
    }
}
//
//
// Testen der Calculator-Klasse
const calc = new Calculator();
//
import chalk from "chalk";

console.log(chalk.blue("Es IST EIN Taschenrechner!"));
console.log(` _____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|`);

//   console.log("ratio 5, 7, 300");
//   console.log(calc.ratio(5, 7, 300)); // 420
//   console.log("percentage 3, 12");
//   console.log(calc.percentage(3, 12)); // 25%
//   console.log("add 5+7");
//   console.log(calc.add(a, b)); // 12
//   console.log("subtract 5, 7");
//   console.log(calc.subtract(5, 7)); // 2
//   console.log("multiply 5 * 7");
//   console.log(calc.multiply(5, 7)); // 35
//   console.log("divide 35 / 7");
//   console.log(calc.divide(35, 7)); // 5
//   console.log("remainder 7,5");
//   console.log(calc.remainder(7, 5)); // 2
//   console.log("elevate 5³");
//   console.log(calc.elevate(5, 3)); // 125
//   console.log("sqrt 25");
//   console.log(calc.sqrt(25)); // 5
//   console.log("sin 8");
//   console.log(calc.sin(8));
//   console.log("cos 5");
//   console.log(calc.cos(5));
