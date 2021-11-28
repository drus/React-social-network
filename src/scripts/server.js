import * as firebase from 'firebase/app';
import DataBase from './database';
import Auth from './auth';
import Storage from './storage';
import firebaseConfig from './firebaseConfig';


class Server{
    
    init(){
        firebase.initializeApp(firebaseConfig);
        this.database=new DataBase();
        this.auth=new Auth();
        this.storage=new Storage();

        return this.auth.init();
        
    }

}

export default new Server();
