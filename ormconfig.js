
require('dotenv')
const dir = process.env.ENV === 'production'? 'dist': 'src';
const ext = process.env.ENV === 'production'? '.js': '.ts';
module.exports={
    "type": "mysql",
    "host": process.env.MYSQL_HOST,
    "port":  3306,
    "username": process.env.MYSQL_USER || 'root',
    "password": process.env.MYSQL_PASS || 'root',
    "database": process.env.MYSQL_DB || 'STORE_APP',
    "connectionTimeout": 30000,
    "logging": false,
    "entities": [
       `${dir}/app/models/*${ext}`
    ],
    "migrations": [
       `${dir}/database/migrations/*${ext}`
    ],
    "subscribers": [
       `${dir}/database/subscriber/*${ext}`
    ],
    "cli": {
        "entitiesDir": `${dir}/app/models`,
        "migrationsDir": `${dir}/database/migrations`
    }
 }