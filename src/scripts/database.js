import * as firebase from 'firebase/app';
import "firebase/firestore";
import server from './server';

class DataBase{

    constructor(){
        this.db=firebase.firestore();
    }

    updateProfile(userId, userData){
        console.log("updateProfile", userId, userData);
        const userRef=this.db.collection('users').doc(userId);
        return userRef.update({...userData})
            .then(()=>({}))
            .catch(error=>{
                console.error("Error updating profile: ", error);
            });
    }

    setComment(topicId, comment){
        console.log("setComment topicId, comment", topicId, comment);
        const commentsRef=this.db.collection('topics').doc(topicId);

        return commentsRef.update({
            comments:firebase.firestore.FieldValue.arrayUnion(comment)
            })
            .then(()=>({}))
            //.then(()=>this.getTopic(topicId))
            .catch(error=>{
                console.error("Error setting topic: ", error);
            });
    }

    deleteComment(topicId, comment){
        // elimina el parametro userId del array followees del usuario logado
        // recuperar el id de usuario logado??
        console.log("comment", comment);
        const confirm=window.confirm(`The comment will be deleted, sure?`);
        if(!confirm) return false;

        const commentsRef=this.db.collection('topics').doc(topicId);

        return commentsRef.update({
                comments:firebase.firestore.FieldValue.arrayRemove(comment)
            })
            .then(()=>this.getTopic(topicId))
            .catch(error=>{
                console.error("Error deleting comment: ", error);
            });
    }

    getTopic(topic){
        return this.db.collection('topics').doc(topic).get()
            .then(response=>{
                return response.data();
            })
            .catch(error=>{
                console.error("Error setting topic: ", error);
            });
    }
    setTopic(topic){
        return this.db.collection('topics').add(topic)
            .then(response=>{
                return response;
            })
            .catch(error=>{
                console.error("Error setting topic: ", error);
            });
    }

    registerUser(id, name){
        return this.db.collection('users').doc(id).set({name})
            .then(response=>{
                console.log("response", response);
                return response;
            })
            .catch(error=>{
                console.error("Error setting topic: ", error);
            });
    }

    deleteTopic(topicId){
        return this.db.collection('topics').doc(topicId).delete()
            .then(response=>{
                return response;
            })
            .catch(error=>{
                console.error("Error removing topic: ", error);
            });
    }

    like(topicId){
        const increment = firebase.firestore.FieldValue.increment(1);
        const topic = this.db.collection('topics').doc(topicId);
        
        return topic.update({ likes: increment })
            .catch(error=>{
                console.error("Error incrementing likes: ", error);
            });
    }

    getCollection(collection){
    
        return this.db.collection(collection).orderBy("date", "desc").limit(100).get()
        .then((querySnapshot) => {
            let result=[];
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), id:doc.id});
            });
            return result;
        });
    
    }

    getFolloweesWall(followees){
        if(!followees || !followees.length) return [];

        return this.db.collection('topics').where('authorId', 'in', followees).get()
            .then((querySnapshot) => {
                let result=[];
                querySnapshot.forEach((doc) => {
                    result.push({...doc.data(), id:doc.id});
                });
                return result;
            });
        

    }

    getUserWall(userId){
    
        return this.db.collection('topics').where('authorId','==', userId).get()
        .then((querySnapshot) => {
            let result=[];
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), id:doc.id});
            });
            return result;
        });
    
    }

    getUser(userId){
        return this.db.collection('users').doc(userId).get()
        .then(snapshot => snapshot.data())
        .catch(error=>{
            console.error("Error getting user: ", error);
        });
    
    }

    followUser(userId){
        // añade el parametro userId al array followees del usuario logado
        // recuperar el id de usuario logado??
        const myUserId=server.auth.checkLogged();
        if(!myUserId) return new Promise(r=>({}));

        const userRef=this.db.collection('users').doc(myUserId);

        return userRef.update({
                followees:firebase.firestore.FieldValue.arrayUnion(userId)
            })
            .then(response=>{
                return this.getUser(myUserId);
            })
            .catch(error=>{
                console.error("Error setting topic: ", error);
            });
    }

    unfollowUser(userId){
        // elimina el parametro userId del array followees del usuario logado
        // recuperar el id de usuario logado??
        const myUserId=server.auth.checkLogged();
        if(!myUserId) return new Promise(r=>({}));

        const userRef=this.db.collection('users').doc(myUserId);
        const confirm=window.confirm(`Do you really unfollow user ${userId} ?`);
        if(!confirm) return false;


        return userRef.update({
                followees:firebase.firestore.FieldValue.arrayRemove(userId)
            })
            .then(response=>{
                return this.getUser(myUserId);
            })
            .catch(error=>{
                console.error("Error setting topic: ", error);
            });
    }

/* 
getPath(path){
    const subPaths = path.trim().replace(/^\/|\/$/g, '').split('/');
    const result = subPaths.reduce((acc, curr, index)=>{
        if(index%2 === 0){
            // Par
            return acc.collection(curr);
        }else {
            // Impar
            return acc.doc(curr);
        }
    }, this.db);

    return result.get()
        .then(snapshot=>{
            if(snapshot.size !== undefined){
                let result={};
                snapshot.forEach((doc) => {
                    result[doc.id]=doc.data();
                });
                return result;
            }else {
                return snapshot.data();
            }
        })
        .catch(error=>{
            return {}
        })
}
 */


}

export default DataBase;