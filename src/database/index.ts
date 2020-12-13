import {Connection, createConnection} from "typeorm";

class Database {
    public connection : Connection
    constructor() {
        this.createConnection()
    }
     createConnection() {
        
         createConnection().then(() => console.log('Database Connected!!'))
        
    }
}
export default new Database().connection
