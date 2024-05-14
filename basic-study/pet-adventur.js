const WeaponsList = [
    { weaponName: "Stab des Feuers", weaponAttack: 15 },
    { weaponName: "Donnerstab", weaponAttack: 15 },
    { weaponName: "Engelstab", weaponAttack: 15 },
    { weaponName: "Dunkelheitsstab", weaponAttack: 15 },
    { weaponName: "Drachenstab", weaponAttack: 15 },
    { weaponName: "Weisenstab", weaponAttack: 15 },
];
let isFight;

class PetAdventure extends Pet {
    constructor(attack, weaponName = "", weaponAttack = 0, ...args) {
        super(...args);

        this.attack = attack;

        this.weapons = {
            weaponName: weaponName,
            weaponAttack: weaponAttack,
        };
    }
    reduceHP(value) {
        this.HP = Math.max(this.HP - value, 0);
    }
    fight(enemy) {
        while (true) {
            enemy.HP = enemy.HP - (this.attack + this.weapons.weaponAttack);
            enemy.HP <= 0 ? (enemy.HP = 0) : enemy.HP;
            this.HP = this.HP - enemy.attack;
            this.HP <= 0 ? (this.HP = 0) : this.HP;
            // console.log(
            //     `${this.playerName} fight ${enemy.playerName}(${enemy.HP})`
            // );
            if (enemy.HP <= 0) this.getWeapons();
            if (this.HP <= 0) myPetCareMode.startPetCareMode();
        }
    }
    fightOrGoHome() {
        if (this.HP > 50) {
            if (this.IQ > 15) {
                isFight = readlineSync.keyIn(
                    `Die HP des Feindes sind l, die Angriffskraft ist n; Deine HP sind m, deine Angriffskraft ist k. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
                    { limit: "khe" }
                );
            } else {
                if (enemy.HP > this.HP && enemy.attack > this.attack) {
                    isFight = readlineSync.keyIn(
                        `Gefahr, du könntest wahrscheinlich umkommen. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
                        { limit: "khe" }
                    );
                } else {
                    isFight = readlineSync.keyIn(
                        `Du hast möglicherweise die Möglichkeit, deinen Feind zu besiegen. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
                        { limit: "khe" }
                    );
                }
            }
        } else {
            isFight = readlineSync.keyIn(
                `Deine Lebenspunkte sind zu niedrig. Es besteht die Möglichkeit, dass du im Kampf sterben wirst. Es wird empfohlen, zunächst nach Hause zu gehen und dich zu heilen. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
                { limit: "khe" }
            );
        }
        if (isFight === "k") {
            this.fight();
        }
        if (isFight === "h") {
            myPetCareMode.startPetCareMode();
        }
        if (isFight === "e") {
            gameInMainMap.start();
        }
    }
    getWeapons() {
        // const WeaponsList = [
        //     { weaponName: "Stab des Feuers", weaponAttack: 15 },
        //     { weaponName: "Donnerstab", weaponAttack: 15 },
        //     { weaponName: "Engelstab", weaponAttack: 15 },
        //     { weaponName: "Dunkelheitsstab", weaponAttack: 15 },
        //     { weaponName: "Drachenstab", weaponAttack: 15 },
        //     { weaponName: "Weisenstab", weaponAttack: 15 },
        // ];

        const randomWeaponIndex = Math.floor(
            Math.random() * WeaponsList.length
        );

        const equipWeapon = readlineSync.question(
            `Du hast ${WeaponsList[randomWeaponIndex].weaponName} erhalten, Angriffskraft ist ${WeaponsList[randomWeaponIndex].weaponAttack}; Dein aktuelles ist ${this.weapons.weaponName}, Angriffskraft ist ${this.weapons.weaponAttack}. Möchtest du es ersetzen? (y/n)`
        );
        if (equipWeapon === "y") {
            this.weapons.weaponName = WeaponsList[randomWeaponIndex].weaponName;
            this.weapons.weaponAttack =
                WeaponsList[randomWeaponIndex].weaponAttack;
        }
    }
}

const petAdventureMode = new PetAdventure(10, "", 0, petName, whichPet);

class Enemies {
    constructor(name, type, HP, attack) {
        this.name = name;
        this.type = type;
        this.HP = HP;
        this.attack = attack;
    }
}

const goldEagle = new Enemies("Adlersturz", "Eagle", 100, 20);
const zuBat = new Enemies("Nachtjäger", "Bat", 100, 20);
const wolfsRuf = new Enemies("Einsamer Wolf", "Wolf", 100, 20);

//------------------- Fight Game ----------------------------
function fight(enemy) {
    enemy.life = enemy.life - (this.attack + this.weapons.weaponAttack);
    debugger;
    enemy.life <= 0 ? (enemy.life = 0) : enemy.life;
    console.log(`${this.playerName} fight ${enemy.playerName}(${enemy.life})`);
}
function healed(attacker) {
    attacker.life += 5;
    console.log(`${attacker.playerName} increase his 5 lifePoints `);
}

// class player {
//     constructor(name, life, attack, weaponName, weaponAttack) {
//         this.playerName = name;
//         this.life = life;
//         this.attack = attack;
//         this.weapons = {
//             weaponName: weaponName,
//             weaponAttack: weaponAttack,
//         };
//         // this.weapon = this.createWeapon(weaponName, weaponAttack);
//         this.fight = fight;
//         this.healed = healed;
//     }
//     // createWeapon(weaponName, weaponAttack) {
//     //     return {
//     //         weaponName: weaponName,
//     //         weaponAttack: weaponAttack,
//     //     };
//     // }
// }
const playerGroup = [];
function playerInitial(playerNumber) {
    for (let i = 1; i <= playerNumber; i++) {
        const playerName = readlineSync.question(`give player${i}'s name: `);
        const playerLife = +readlineSync.question(
            `player${i}'s initial health is: `
        );
        const playerAttack = +readlineSync.question(`player${i}'s attack is: `);
        const playerWeaponName = readlineSync.question(
            `player${i} use which weapon: `
        );
        const playerWeaponAttack = +readlineSync.question(
            `player${i}'s weaponAttack is: `
        );
        playerGroup.push(
            new player(
                playerName,
                playerLife,
                playerAttack,
                playerWeaponName,
                playerWeaponAttack
            )
        );
    }
}

while (true) {
    const playerNumberInitial = +readlineSync.question(
        "please give the number of participants in the game: "
    );
    if (playerNumberInitial >= 2 && !isNaN(playerNumberInitial)) {
        console.log("Now start the game initialization");
        playerInitial(playerNumberInitial);
        break;
    } else {
        console.log("The value you entered is invalid, please reenter it");
    }
}

console.log(playerGroup);

// --------------- game start ------------------
let roundFlag = 0;
let lifeFlag = 1;
while (lifeFlag) {
    for (let i = 0; i < playerGroup.length; i++) {
        if (playerGroup[i].life === 0) {
            console.log(
                `${playerGroup[i].playerName} has died, ${
                    playerGroup[i + 1].playerName
                } has won, game over!`
            );
            lifeFlag = 0;
            break;
        }
        if (i === playerGroup.length - 1) {
            playerGroup[i].fight(playerGroup[0]);
        } else {
            playerGroup[i].fight(playerGroup[i + 1]);
        }
    }
    // if (playerGroup[1].life === 0) {
    //     console.log(
    //         `${playerGroup[1].playerName} has died, ${playerGroup[0].playerName} has won, game over!`
    //     );
    //     break;
    // }
    // playerGroup[1].fight(playerGroup[0]);

    // roundFlag++;
    // if (roundFlag === 5) {
    //     console.log("Every 5th round player can heal himself");
    //     playerGroup.forEach((element) => element.healed(element));
    //     // doomGuy.healed(doomGuy);
    //     // cyberDemon.healed(cyberDemon);
    //     roundFlag = 0;
    // }
}

//----------------------------------------------
// const doomGuy = {
//     name: "Doomguy",
//     life: 30,
//     attack: 2,

//     weapons: {
//         weaponName:
//             "TheHerosInfamousWandOfGreatSuperiorityWhichHeUsedToEndTheLifeOfTheBeautifulDragonQueen",
//         weaponAttack: 3,
//     },
//     fight,
//     healed,
// };

// const cyberDemon = {
//     name: "Cyberdemon",
//     life: 38,
//     attack: 1,

//     weapons: {
//         weaponName:
//             "TheDemonLordsAllMightyWeaponOfDoomCombinedWithTheScalesOfTheGreatDragonKing",
//         weaponAttack: 2,
//     },
//     fight,
//     healed,
// };
