import CONFIG from '../config.json';

interface DB_INFO {
    name: string;
    version: string;
    description: string;
}

export var DB_INFO: DB_INFO = {
    name: CONFIG.database_name,
    version: CONFIG.database_version,
    description: CONFIG.database_description,
}
