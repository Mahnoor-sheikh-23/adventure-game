#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.italic.rgb(65, 105, 255)(`\n\t\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n\t\t\t\t\t    ******** WELLCOME TO THIS ADVENTURE GAME ********\n \t\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   \n`));
// simple class for name 
class main {
    name;
    constructor(n) {
        this.name = n;
    }
}
// using inquirer to take name from the user 
let ans = await inquirer.prompt([{
        name: "answer",
        type: "input",
        message: chalk.italic.rgb(252, 15, 192)("Kindly Type Your Name : "),
        validate: (input) => {
            if (!input) {
                // checking that name should be given
                return chalk.italic.bold.rgb(255, 36, 0)("ERROR!! PLEASE ENTER YOUR NAME : ");
            }
            else {
                return true;
            }
        }
    }]);
// call the class 
let classews = new main(ans.answer);
// main object 
let gameObj = {
    random: Math.floor(Math.random()),
    //enemy info
    enemies: ["skeleton", "Zombie", "Wolves", "Bat"],
    enemiesHealth: 80,
    enemyAttackDamage: 20,
    // player info
    playerHealth: 100,
    attackDamage: 40,
    numHealthPotions: 3,
    healthPotionHealAmount: 30,
    healthPotionDropChance: 50,
    // running loop function 
    runLoop: async function () {
        let running = true;
        while (running) {
            let enemyHealth = Math.floor(Math.random() * this.enemiesHealth);
            let enemy = this.enemies[Math.floor(Math.random() * this.enemies.length)];
            console.log(chalk.italic.yellow(` \n\t\t-------> ${enemy} APPEARED IN GAME <------- \n `));
            while (enemyHealth > 0) {
                console.log(chalk.italic.yellow(`\t\t            ${classews.name.toUpperCase()} HP : ${this.playerHealth}\n`));
                console.log(chalk.italic.yellow(`\t\t            ${enemy}  HP : ${enemyHealth}\n`));
                let input = await inquirer.prompt([{
                        name: "choices",
                        type: "list",
                        message: chalk.italic.rgb(252, 15, 192)("What Would You Like To Do "),
                        choices: ["Attack", "Drink Health Potion", "Run From Battle"]
                    }]);
                if (input.choices == "Attack") {
                    let damageDealt = Math.floor(Math.random() * this.attackDamage);
                    let damageTaken = Math.floor(Math.random() * this.enemyAttackDamage);
                    enemyHealth -= damageDealt;
                    this.playerHealth -= damageTaken;
                    console.log(chalk.italic.rgb(124, 252, 0)(`\n\t\t        ${classews.name} Strike the ${enemy} for ${damageDealt} Damage\n`));
                    console.log(chalk.italic.rgb(128, 0, 0)(`\t\t           ${classews.name} Recieve ${damageTaken} damage \n`));
                    if (this.playerHealth < 1) {
                        console.log(chalk.italic.rgb(299, 12, 9)(`\t\t  ${classews.name} ********** HAVE TAKEN TOO MUCH DAMAGE YOU ARE TOO WEAK TO GO ON ********** `));
                        process.exit();
                    }
                }
                else if (input.choices == "Drink Health Potion") {
                    if (this.numHealthPotions > 0) {
                        this.playerHealth += this.healthPotionHealAmount;
                        this.numHealthPotions--;
                        console.log(chalk.italic.rgb(144, 238, 144).bold(`\t\t             ${classews.name} Drink A Health Potion , Healing Yourself For ${this.healthPotionHealAmount}
                            now ${classews.name} have ${this.playerHealth} HP 
                            you have ${this.numHealthPotions} Health Potions Left \n`));
                    }
                    else {
                        console.log(`${classews.name} have no Health Potion Left ! Defeat Enemies For A Chance to get `);
                    }
                }
                else if (input.choices == "Run From Battle") {
                    console.log(chalk.italic.bold.rgb(139, 0, 0)(`\n\t\t     ${classews.name.toUpperCase()} Run Away From The ${enemy} !!\n`));
                    continue;
                }
                else {
                    console.log('Invalid Action ');
                }
            }
            if (this.playerHealth < 1) {
                console.log(chalk.italic.rgb(101, 67, 33)(` ${classews.name} You limp out of the game ,weak from battle`));
            }
            console.log(chalk.italic.magenta(` ----------------------------- >>>> ${enemy} was defeated <<<<-----------------------------\n`));
            console.log(chalk.italic.rgb(26, 267, 228)(`\t\t         ${classews.name} have ${this.playerHealth} hp left\n `));
            if (Math.floor(Math.random() * 100) < this.healthPotionDropChance) {
                this.numHealthPotions++;
                console.log(chalk.italic.rgb(123, 275, 16)(`\t\t        The ${enemy} dropped a health potions \n`));
                console.log(chalk.italic.rgb(123, 275, 16)(`\t\t        ${classews.name.toUpperCase()} have now ${this.numHealthPotions} health potion \n`));
            }
            let user_input = await inquirer.prompt([{
                    name: "players",
                    type: "list",
                    message: chalk.italic.rgb(252, 15, 192)("what wowuld you like to do"),
                    choices: ["Continue Fighting", "Exit Dungeon"]
                }]);
            if (user_input.players == "Continue Fighting") {
                console.log(chalk.italic.rgb(255, 102, 204).underline(`\n\t\t         ${classews.name.toUpperCase()} continue on your adventure`));
            }
            else if (user_input.players == "Exit Dungeon") {
                console.log(chalk.italic.bold.rgb(64, 224, 208)(`\n\t\t          -----------> ${classews.name.toUpperCase()} Exit The Dungeon Sucessful From The Adventure <---------- \n`));
                console.log(chalk.italic.rgb(250, 30, 290)("\t\t                   ~~~~~~~~~~~~~~~~ THANK'S FOR PLAYING ~~~~~~~~~~~~~~~~~ "));
                process.exit();
            }
        }
    }
};
let Anser = gameObj.runLoop();
console.log(Anser);
