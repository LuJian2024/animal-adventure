import { whichPet } from "../components/MainMap.js";
import myPetCareMode from "../components/Pet.js";
import petAdventureMode from "../components/PetAdventure.js";
//所有图片，宠物在家的模式和宠物战斗的模式
export let maxPetHP;
export let maxEnemyHP;
export let enemyType = "";
export let enemyRandom;

class AllPetMaps {
    constructor() {
        this.mapTiger = [
            "================================= 💓💓💓 ===============================",
            "                                                                        ",
            `     __  _-==-=_,-.                     |    ----${myPetCareMode.name}----                   `,
            "     /--`'\\_@-@.--<                    |                                 ",
            "     `--'\\ \\   <___/.                 |                                ",
            `           \\ \\\   " /                 | hunger: ${myPetCareMode.hunger}        `,
            "            >=\\_/`<                    |                               ",
            `           /= | \\_|/                   | affinity:${myPetCareMode.affinity}     `,
            `          /===\\____/                   | HP:   ${myPetCareMode.HP}              `,
            `                                                                        `,
            `                                         IQ:     ${myPetCareMode.IQ}               `,
            `                                           ----------------------        `,
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
            `   /.. ./  .-. .-. .'/ ..  )              ----${myPetCareMode.name}----             `,
            `  || '  |  /   Y     |   ' ||            | hunger: ${myPetCareMode.hunger}`,
            `  ||     )   0 | 0   (     ||            | IQ:     ${myPetCareMode.IQ}    `,
            `   ('-  ).-" '''' "-./, -' /             | affinity:${myPetCareMode.affinity}`,
            `    '._. (_   ^ ^   _ ) ._.'             | HP:   ${myPetCareMode.HP}      `,
            `        |  (._   _.)  |                  ----------------------           `,
            "        `.  ( '~' )   /                                                  ",
            `         '._ '-=-' _.'                                                   `,
            `            '~---~'                                                      `,
            `                                                                        `,
            `                                                                        `,
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
            `     ***                                                                `,
            `     ** **                                                              `,
            `    **   **                               ----${myPetCareMode.name}----            `,
            `    **   **         ****                | hunger: ${myPetCareMode.hunger} `,
            `    **   **       **   ****             | IQ:    ${myPetCareMode.IQ}      `,
            `    **  **       *   **   **            | affinity: ${myPetCareMode.affinity}   `,
            `     **  *      *  **  ***  **          | HP:    ${myPetCareMode.HP}     `,
            `       **  *    *  **     **  *          ----------------------         `,
            "        ** **  ** **        **                                          ",
            `        **   **  **                                                     `,
            `       *           *                                                    `,
            `      *             *                                                   `,
            `     *    0     0    *                                                  `,
            `     *   /   @   \\   *                                                 `,
            `     *   \\__/ \\__/   *                                                `,
            `       *     W     *                                                    `,
            `         **     **                                                      `,
            `           *****                                                        `,
            `                                                                        `,
            `                                                                        `,
            `  1. feeding    2. playing    3. quiz   4. to heal                      `,
            ` (you can chose 1, 2 or 3, to play with your pet;)                      `,
            ` (press "q" to quit the game, press "b" to go back to main map)         `,
            "================================ 💓💓💓 ================================",
        ];
        this.mapTigerFight = [
            "🐯=============== 💓🐯💓 ==============🐯",
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️                                      🗡️`,
            `🗡️           __  _-==-=_,-.             🛡️`,
            "🛡️          /--`'\\_@-@.--<              🗡️",
            "🗡️          `--'\\ \\   <___/.            🛡️",
            `🛡️                \\ \\\   " /             🗡️`,
            "🗡️                 >=\\_/`<              🛡️",
            `🛡️                /= | \\_|/             🗡️`,
            `🗡️               /===\\____/             🛡️`,
            `🛡️                                      🗡️`,
            "🗡️                                      🛡️",
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️       HP 🩷🩷🩷🩷🩷🩷🩷🩷🩷🩷       🗡️`,
            `🗡️                                      🛡️`,
            `🛡️      💟 🩶 💗                        🗡️`,
            `🗡️                                      🛡️`,
            "🐯=============== 💓🐯💓 ===============🐯",
        ];
        this.mapMankyFight = [
            "🐵=============== 💓🐵💓 ===============🐵",
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️                                      🗡️`,
            `🗡️                 __,__                🛡️`,
            `🛡️        .--.  .-"     "-.  .--.       🗡️`,
            `🗡️       /.. ./  .-. .-. .'/ ..  )      🛡️`,
            `🛡️      || '  |  /   Y     |   ' ||     🗡️`,
            `🗡️      ||     )   0 | 0   (     ||     🛡️`,
            `🛡️       ('-  ).-" '''' "-./, -' /      🗡️`,
            `🗡️        '._. (_   ^ ^   _ ) ._.'      🛡️`,
            `🛡️            |  (._   _.)  |           🗡️`,
            "🗡️            `.  ( '~' )   /           🛡️",
            `🛡️             '._ '-=-' _.'            🗡️`,
            `🗡️                '~---~'               🛡️`,
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🗡️       HP 🩷🩷🩷🩷🩷🩷🩷🩷🩷🩷       🛡️`,
            `🛡️                                      🗡️`,
            `🗡️      💟 🩶 💗                        🛡️`,
            `🛡️                                      🗡️`,
            "🐵=============== 💓🐵💓 ===============🐵",
        ];
        this.mapRabbitFight = [
            "🐰=============== 💓🐰💓 ===============🐰",
            `🛡️      ***                             🗡️`,
            `🗡️      ** **                           🛡️`,
            `🛡️     **   **                          🗡️`,
            `🗡️     **   **         ****             🛡️`,
            `🛡️     **   **       **   ****          🗡️`,
            `🗡️     **  **       *   **   **         🛡️`,
            `🛡️      **  *      *  **  ***  **       🗡️`,
            `🗡️        **  *    *  **     **  *      🛡️`,
            "🛡️         ** **  ** **        **       🗡️",
            `🗡️         **   **  **                  🛡️`,
            `🛡️        *           *                 🗡️`,
            `🗡️       *             *                🛡️`,
            `🛡️      *    0     0    *               🗡️`,
            `🗡️      *   /   @   \\   *              🛡️`,
            `🛡️      *   \\__/ \\__/   *             🗡️`,
            `🗡️        *     W     *                 🛡️`,
            `🛡️          **     **                   🗡️`,
            `🗡️            *****                     🛡️`,
            `🛡️       HP 🩷🩷🩷🩷🩷🩷🩷🩷🩷🩷       🗡️`,
            `🗡️                                      🛡️`,
            `🛡️      💟 🩶 💗                        🗡️`,
            `🗡️                                      🛡️`,
            "🐰=============== 💓🐰💓 ===============🐰",
        ];
        this.mapEagleFight = [
            "🦅=============== 💓🦅💓 ===============🦅",
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️            .------._                 🗡️`,
            '🗡️      .-"""`-.<´)    `-._             🛡️',
            `🛡️     (.--. _   '._'---.__.-'          🗡️`,
            `🗡️      '';'-.-'         '-    ._       🛡️`,
            `🛡️        .--'''  '._      - '   .      🗡️`,
            "🗡️         `''''-.    `---'             🛡️",
            "🛡️                  `\\                 🗡️",
            "🗡️                  `\\      .'         🛡️",
            "🛡️                  `'. '               🗡️",
            "🗡️                    `'.               🛡️",
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️                                      🗡️`,
            `🗡️                                      🛡️`,
            `🛡️       HP 🩷🩷🩷🩷🩷🩷🩷🩷🩷🩷       🗡️`,
            `🗡️                                      🛡️`,
            `🛡️      💟 🩶 💗                        🗡️`,
            `🗡️                                      🛡️`,
            "🦅=============== 💓🦅💓 ===============🦅",
        ];
        this.mapBatFight = [
            "🦇================ 💓🦇💓 ================🦇",
            `🛡️                                        🗡️`,
            `🗡️                                        🛡️`,
            `🛡️                                        🗡️`,
            `🗡️                                        🛡️`,
            `🛡️              /'.    .'\\                🗡️`,
            `🗡️              \\(\\__/ )/                 🛡️`,
            `🛡️         ___   / (.)(.)\\   ___          🗡️`,
            '🗡️    _.-"`_  `-.|  ____  |.-`  _`"-._    🛡️',
            "🛡️  .-'.-'//||`'-.  V--V  /.-'`||\\'-.'-.  🗡️",
            "🗡️`'-'-.// ||    / .___.      || \\.-'-'`  🛡️",
            "🛡️      `-.||_.._|        |_.._||.-'      🗡️",
            `🗡️              \\ ((  )) /                🛡️`,
            "🛡️                '.    .'                🗡️",
            "🗡️                  `/`                   🛡️",
            `🛡️                                        🗡️`,
            `🗡️                                        🛡️`,
            `🛡️                                        🗡️`,
            `🗡️                                        🛡️`,
            `🛡️       HP 🩷🩷🩷🩷🩷🩷🩷🩷🩷🩷         🗡️`,
            `🗡️                                        🛡️`,
            `🛡️      💟 🩶 💗                          🗡️`,
            `🗡️                                        🛡️`,
            "🦇================ 💓🦇💓 ================🦇",
        ];
        this.mapWolfFight = [
            "🐺================ 💓🐺💓 ===============🐺",
            `🛡️                           __          🗡️`,
            `🗡️                          .d$$b        🛡️`,
            `🛡️                        .' TO$;\\       🗡️`,
            `🗡️                       /  : TP._;      🛡️`,
            `🛡️                      / _.;  :Tb|      🗡️`,
            `🗡️                     /   /   ;j$j      🛡️`,
            `🛡️                 _.-"       d$$$$      🗡️`,
            `🗡️                .' ..       d$$$$;       🛡️`,
            "🛡️               /  /P'      d$$$$P. |     🗡️",
            `🗡️              /   "      .d$$$P' |\\^"l  🛡️`,
            "🛡️           .'           `T$P^'''''  :  🗡️",
            `🗡️       ._.'      _.'                ;  🛡️`,
            '🛡️    `-.-".-"-"" ._.       _.-"    .-"  🗡️',
            '🗡️   `.-" _____  ._              .-"     🛡️',
            `🛡️  -(.g$$$$$$$b.              .'        🗡️`,
            `🗡️     ""^^T$$$P^)            .(:        🛡️`,
            `🛡️                                       🗡️`,
            `🗡️                                       🛡️`,
            `🛡️       HP 🩷🩷🩷🩷🩷🩷🩷🩷🩷🩷        🗡️`,
            `🗡️                                       🛡️`,
            `🛡️      💟 🩶 💗                         🗡️`,
            `🗡️                                       🛡️`,
            "🐺================ 💓🐺💓 ===============🐺",
        ];
    }

    updateHP(petAdventureMode, enemyRandom) {
        const maxPetHeart = 2 * Math.ceil(maxPetHP / 10); // 最大HP值，也就是最多的红心数量🩷
        const maxEnemyHeart = 2 * Math.ceil(maxEnemyHP / 10);
        const hpSymbol = "🩷"; // 红心符号

        // 计算需要多少个红心来表示当前HP
        const petHeartsNeeded = Math.ceil(petAdventureMode.HP / 10);
        const enemyHeartsNeeded = Math.ceil(enemyRandom.HP / 10);
        // readlineSync.keyInPause(`enemy's HP is ${enemyRandom.HP}`);
        // 构建新的HP字符串
        const petHPString = hpSymbol.repeat(petHeartsNeeded);
        const enemyHPString = hpSymbol.repeat(enemyHeartsNeeded);

        // 更新地图数组中的HP值
        const petFight = this.whichPetFightMap(whichPet);
        const enemyFight = this.whichEnemyFightMap(enemyType);
        //这里需要字符串的长度是20,才能显示10个🩶或🩷
        petFight.splice(
            19,
            1,
            `🛡️           HP ${petHPString.padEnd(
                maxPetHeart,
                "🩶"
            )}              🗡️`
        );
        enemyFight.splice(
            19,
            1,
            `🛡️           HP ${enemyHPString.padEnd(
                maxEnemyHeart,
                "🩶"
            )}                🗡️`
        );

        return petFight[19] + "                " + enemyFight[19];
    }

    whichPetFightMap(whichPet) {
        let mapPetFight = [];
        if (whichPet === "Tiger") mapPetFight = this.mapTigerFight;
        else if (whichPet === "Affe") mapPetFight = this.mapMankyFight;
        else if (whichPet === "Hase") mapPetFight = this.mapRabbitFight;
        return mapPetFight;
    }
    whichEnemyFightMap(enemyType) {
        let mapEnemyFight = [];
        if (enemyType === "Eagle") mapEnemyFight = this.mapEagleFight;
        else if (enemyType === "Bat") mapEnemyFight = this.mapBatFight;
        else if (enemyType === "Wolf") mapEnemyFight = this.mapWolfFight;
        return mapEnemyFight;
    }
    printPetMap() {
        console.clear();
        let mapPet = [];
        if (whichPet === "Tiger") mapPet = this.mapTiger;
        else if (whichPet === "Affe") mapPet = this.mapManky;
        else if (whichPet === "Hase") mapPet = this.mapRabbit;
        // this.whichPetMap(whichPet);
        for (let rowPet of mapPet) {
            // 在每次打印地图之前，更新地图中显示饥饿度的部分
            if (rowPet.includes("hunger:")) {
                const updatedRow = rowPet.replace(
                    /hunger: \d+/,
                    `hunger: ${myPetCareMode.hunger}`
                );
                // console.log(myPetCareMode.hunger);
                console.log(updatedRow);
            } else {
                console.log(rowPet);
            }
        }
    }

    printPetFightMap() {
        console.clear();
        const updatedRowStr = this.updateHP(petAdventureMode, enemyRandom);
        const mapPetFight = this.whichPetFightMap(whichPet);
        const mapEnemyFight = this.whichEnemyFightMap(enemyType);
        for (let i = 0; i < mapPetFight.length; i++) {
            let rowPet = mapPetFight[i] + "                " + mapEnemyFight[i];
            if (i === 19) console.log(updatedRowStr);
            else console.log(rowPet);
        }
    }
}
const petMaps = new AllPetMaps();
export default petMaps;
