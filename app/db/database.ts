import { MongoClient } from 'mongodb';
import * as appConstants from '../config/app.config';


export class Database {
    connectionInstance: any;
    async _connect() {
        try{
            if (this.connectionInstance) {
                return this.connectionInstance;
            }
            this.connectionInstance = await MongoClient.connect(appConstants.dbURL, { useNewUrlParser: true });
            return this.connectionInstance;
        }catch(err){
            throw err;
        }
        
    }
}

//Database Class as Singleton
// module.exports = new Database();