//怪兽战斗模式初始化
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
const enemiesList = [goldEagle, zuBat, wolfsRuf];
export default enemiesList;
