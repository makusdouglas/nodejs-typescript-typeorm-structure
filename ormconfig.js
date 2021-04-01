
require('dotenv')
const dir = process.env.ENV === 'production'? 'dist': 'src';
const ext = process.env.ENV === 'production'? '.js': '.ts';
console.log(process.env.ENV);
module.exports={
    "type": "mysql",
    "host": process.env.IP,
    "port": 3306,
    "username": "root",
    "password": "mysql_database",
    "database": "STORE_APP",
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