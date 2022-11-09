import { DB_INFO, DB_Injection, log } from "./database";

export var client = {
    database: new DB_Injection(),
    info: DB_INFO,
    log: log
}