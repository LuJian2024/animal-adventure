import readlineSync from "readline-sync";
import figlet from "figlet";
import gradient from "gradient-string";

import chalk from "chalk";
import chalkAnimation from "chalk-animation";

import { setTimeout as waitingTime } from "timers/promises";

console.log(`${chalk.blue("Hello")} World${chalk.red("!")}`);
console.log(chalk.blue.bgRed.bold("Hello World!"));

// console.log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"));
console.log(chalk.hex("#DEADEA").bold("Bold gray!"));
console.log(chalk.bold.red("Error!"));
console.log(chalk.red("Error!"));

const rainbow = chalkAnimation.rainbow("Willkommen auf mein Spiel");
await waitingTime(3000);
rainbow.stop();

const nachricht = "Hello World!!";
// figlet("Hello World!!",function(){})
// figlet(nachricht, function (err, data) {
//     console.log(gradient.instagram.multiline(data));
// });
// figlet(nachricht, function (err, data) {
//     const rainbowText = chalkAnimation.rainbow(data);
//     // 当动画完成时停止
//     setTimeout(() => {
//         rainbowText.stop();
//     }, 3000); // 停止动画的时间（毫秒）
// });
// await waitingTime(3000);
// rainbowText.stop();

const greetWord1 = "Willkommen zu deinem Abenteuer \n";
const greetWord2 = "in der Welt der Haustierpflege und Abenteuer";

// const rainbow = chalkAnimation.rainbow(greetWord);
// await waitingTime(3000);
// rainbow.stop();
figlet(greetWord1, { font: "Standard" }, function (err, data1) {
    figlet(greetWord2, { font: "Small" }, function (err, data2) {
        // console.log(data1);
        console.log(gradient.instagram.multiline(data1));
        console.log(gradient.instagram.multiline(data2));
        console.log(
            chalk.rgb(123, 45, 67).underline("Underlined reddish color")
        );
        // const rainbowText = chalkAnimation.rainbow(data2);

        // // 当动画完成时停止
        // setTimeout(() => {
        //     rainbowText.stop();
        //     // console.clear();
        // }, 3000); // 停止动画的时间（毫秒）
    });
});

import { createSpinner } from "nanospinner";

const spinner = createSpinner("Run test").start();

setTimeout(() => {
    spinner.success();
}, 1000);
