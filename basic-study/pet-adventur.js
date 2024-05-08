class Adventure extends PetCare {
    constructor(HP, attack, weapons, ...args) {
        super(...args);

        this.attack = attack;

        // this.weapons = {
        //     weaponName: weaponName,
        //     weaponAttack: weaponAttack,
        // };
    }
    reduceHQ(value) {
        this.HQ = Math.max(this.HQ - value, 0);
    }
    fight(enemy) {
        enemy.life = enemy.life - (this.attack + this.weapons.weaponAttack);
        debugger;
        enemy.life <= 0 ? (enemy.life = 0) : enemy.life;
        console.log(
            `${this.playerName} fight ${enemy.playerName}(${enemy.life})`
        );
    }
    pick() {}
}

const petAdventureMode = new Adventure();
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

    roundFlag++;
    if (roundFlag === 5) {
        console.log("Every 5th round player can heal himself");
        playerGroup.forEach((element) => element.healed(element));
        // doomGuy.healed(doomGuy);
        // cyberDemon.healed(cyberDemon);
        roundFlag = 0;
    }
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
