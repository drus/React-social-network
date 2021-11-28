import * as firebase from 'firebase/app';
import "firebase/auth";

class Auth{

    constructor(){
        this.auth=firebase.auth();
    }
    
    init(){
        return new Promise(resolve=>{

            let unSubscribeMe=this.auth.onAuthStateChanged((user)=>{
                //console.log((user && user.uid ? 'user ya logado...: ' : 'user no logado'), user);
                resolve(user ? user.uid : null);
                unSubscribeMe();
            });
        })


    }

    // Creo un nuevo usuario
	createUserWithEmailAndPassword(email, password){
		if(!email || !password){
			return Promise.reject('Errors.INVALID_EMAIL_AND_PASSWORD');
        }

		var promise = new Promise((resolve, reject)=>{
			this.auth.createUserWithEmailAndPassword(email, password)
				.then((userCredential)=>{
					//console.log('userCredential: ', userCredential);
					if(userCredential && userCredential.user.uid){
						return Promise.resolve(userCredential.user.uid);
					}else{
						return Promise.reject('Errors.NO_USER_CREATED');
					}
				})
				.then(resolve)
				//.then(secondaryAuth.signOut)
				.catch(reject);
		});
		return promise;
	};
    



    login(email, password){
        return this.auth.signInWithEmailAndPassword(email, password)
            .then(function(result) {
                if(result && result.user && result.user.uid){
                    return Promise.resolve(result.user.uid);
                }else{
                    return Promise.reject('user not found');
                }
            }
        );
    }

    logout(){
        const logout=this.auth.signOut();
        return logout;
    }

    checkLogged(){
        return this.auth.currentUser && this.auth.currentUser.uid;
    }
    
    
}

export default Auth;