import { DB_INFO } from "./info.database"
import chalk from "chalk"


export var log = () => {
    console.log(chalk.red("=-=-=-=-=-=-=-=-=-=-=-=-="));
    console.log(chalk.bgBlueBright("[+]" + DB_INFO.name));
    console.log(chalk.bgBlueBright("[+]" + DB_INFO.version));
    console.log(chalk.bgBlueBright("[+]" + DB_INFO.description));
    console.log(chalk.red("=-=-=-=-=-=-=-=-=-=-=-=-="));
}