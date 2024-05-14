import readlineSync from "readline-sync";
// import { whichPet } from "../components/MainMap.js";
// import { restart, goPetMap } from "../util/initVars.js";
import { whichPet, goPetMap } from "../components/MainMap.js";
import gameInMainMap from "../components/MainMap.js";
import myPetCareMode from "../components/Pet.js";
import petMaps from "../components/PetEnemyMaps.js";
import { petObj } from "../util/functions.js";
import { Pet } from "../components/Pet.js";
import enemiesList from "../components/Enemies.js";

//进入宠物战斗系统
export const WeaponsList = [
    { weaponName: "Stab des Feuers", weaponAttack: 15 },
    { weaponName: "Donnerstab", weaponAttack: 15 },
    { weaponName: "Engelstab", weaponAttack: 15 },
    { weaponName: "Dunkelheitsstab", weaponAttack: 15 },
    { weaponName: "Drachenstab", weaponAttack: 15 },
    { weaponName: "Weisenstab", weaponAttack: 15 },
];
export let isFight;
export let randomEnemy;

class PetAdventure extends Pet {
    constructor(attack, weaponName = "", weaponAttack = 0, ...args) {
        super(...args);

        this.attack = attack;

        this.weapons = {
            weaponName: weaponName,
            weaponAttack: weaponAttack,
        };
        this.isFighting = true;
    }

    fight(enemy) {
        while (true) {
            enemy.HP = enemy.HP - (this.attack + this.weapons.weaponAttack);
            enemy.HP <= 0 ? (enemy.HP = 0) : enemy.HP;

            readlineSync.keyInPause(
                `${this.name} fight ${enemy.name}(${enemy.HP}), press any key to continue`
            );
            this.HP = this.HP - enemy.attack;
            this.HP <= 0 ? (this.HP = 0) : this.HP;

            readlineSync.keyInPause(
                `${enemy.name} fight ${this.name}(${this.HP}), press any key to continue`
            );

            petMaps.printPetFightMap(); //每次HP变化时都要更新地图

            if (enemy.HP <= 0) this.getWeapons();
            if (this.HP <= 0) {
                this.isFighting = false;
                goPetMap = true;
                readlineSync.keyInPause(
                    `your HP is ${this.HP} now, you must be go home to heal. press any key to continue`
                );
                myPetCareMode.startPetCareMode();
                break;
            }
        }
    }
    fightOrGoHome(enemy) {
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
        } else if (this.HP === 0) {
            this.isFighting = false;
            goPetMap = true;
            readlineSync.keyInPause(
                `your HP is ${this.HP} now, you must be go home to heal. press any key to continue`
            );
            myPetCareMode.startPetCareMode();
        } else {
            isFight = readlineSync.keyIn(
                `Deine Lebenspunkte sind zu niedrig. Es besteht die Möglichkeit, dass du im Kampf sterben wirst. Es wird empfohlen, zunächst nach Hause zu gehen und dich zu heilen. Möchtest du kämpfen, nach Hause gehen oder weiter erkunden? (k for kämpfen, h for nach Hause gehen und e for weiter erkunden)`,
                { limit: "khe" }
            );
        }
        if (isFight === "k") {
            this.fight(enemiesList[randomEnemy]);
        }
        if (isFight === "h") {
            goPetMap = true;
            // console.log(goPetMap);
            // readlineSync.keyInPause("press any key to continue");
            myPetCareMode.startPetCareMode();
        }
        if (isFight === "e") {
            gameInMainMap.start();
        }
    }
    getWeapons() {
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

    petFightStart() {
        console.clear();
        maxPetHP = myPetCareMode.HP;
        randomEnemy = Math.floor(Math.random() * enemiesList.length);
        enemyType = enemiesList[randomEnemy].type;
        enemyRandom = enemiesList[randomEnemy];
        maxEnemyHP = enemiesList[randomEnemy].HP;
        if (goToFight === true) this.isFighting = true;
        while (this.isFighting) {
            petMaps.printPetFightMap();
            console.log(enemiesList[randomEnemy]);
            console.log(("my HP is: ", this.HP));
            this.fightOrGoHome(enemiesList[randomEnemy]);
        }
    }
}

const petAdventureMode = new PetAdventure(10, "", 0, petObj.petName, whichPet);
export default petAdventureMode;
