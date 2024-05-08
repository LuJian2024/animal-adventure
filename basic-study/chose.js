import readlineSync from "readline-sync";
// const readlineSync = require("readline-sync");
// 问题选项
const options = ["Option 1", "Option 2", "Option 3"];

// 初始选择索引
let selectedIndex = 0;

// 打印问题和选项
console.log("Use arrow keys to navigate, press Enter to select:");
while (true) {
    console.clear();
    for (let i = 0; i < options.length; i++) {
        if (i === selectedIndex) {
            // console.log("> " + options[i]);
            console.log("> \x1b[36m" + options[i] + "\x1b[0m");
        } else {
            console.log("  " + options[i]);
        }
    }

    // // 监听用户输入
    // const key = readlineSync.keyIn("", {
    //     hideEchoBack: true,
    //     mask: "",
    //     limit: "udq ",
    // });

    // // 根据按键更新选择索引
    // if (key === "u") {
    //     selectedIndex =
    //         selectedIndex === 0 ? options.length - 1 : selectedIndex - 1;
    // } else if (key === "d") {
    //     selectedIndex =
    //         selectedIndex === options.length - 1 ? 0 : selectedIndex + 1;
    // } else if (key === "q") {
    //     // Ctrl+C 退出程序
    //     process.exit();
    // } else if (key === " ") {
    //     // 回车键表示选定
    //     break;
    // }

    // 监听用户输入
    const key = readlineSync.keyIn("", {
        hideEchoBack: true,
        mask: "",
        limit: ["ArrowUp", "ArrowDown", "q"],
    });

    // 根据按键更新选择索引
    if (key === "ArrowUp") {
        selectedIndex =
            selectedIndex === 0 ? options.length - 1 : selectedIndex - 1;
    } else if (key === "ArrowDown") {
        selectedIndex =
            selectedIndex === options.length - 1 ? 0 : selectedIndex + 1;
    } else if (key === "q") {
        // Ctrl+C 退出程序
        process.exit();
    } else if (key === "") {
        // 回车键表示选定
        break;
    }
}

// 打印最终选择
console.log("You selected:", options[selectedIndex]);
