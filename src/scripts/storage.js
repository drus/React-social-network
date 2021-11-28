import * as firebase from 'firebase/app';
import "firebase/storage";

class Storage {

    constructor(){
        this.storage = firebase.storage();

        this._progressHandler=this._progressHandler.bind(this);
        this._completeHandler=this._completeHandler.bind(this)
        this._errorHandler=this._errorHandler.bind(this)
    }


    downloadImage(name, collection='uploads'){

                // Create a reference to the file we want to download
        var fileRef = this.storage.ref().child(collection+'/'+name);

        // Get the download URL
        return fileRef.getDownloadURL().then(function(url) {
        // Insert url into an <img> tag to "download"
            console.log("url", url);
            return url;
        }).catch(function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
            console.log("File doesn't exist")
            break;

            case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object")
            break;

            case 'storage/canceled':
            console.log("User canceled the upload")
            break;

            case 'storage/unknown':
            console.log("Unknown error occurred, inspect the server response")
            break;

            default:

        }
        });


    }


    /*  */
    /*  */
    /*  */
    uploadImage(file, name, collection='uploads'){
        console.log("file, name", file, name);
        // File or Blob named mountains.jpg
        //const file = file;
        let fileName=name || file.name;

        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        this.uploadTask = this.storage.ref().child(collection+'/' + fileName).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        this.uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            this._progressHandler,
            this._errorHandler,
            this._completeHandler);
    }

    _progressHandler (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            default:
                console.log("snapshot.state", snapshot.state);
        }
    }

            

    _completeHandler() {
        // Upload completed successfully, now we can get the download URL
        this.uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
        });
    }
        

    _errorHandler(error){

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/unauthorized':
                console.log('User doesn\'t have permission to access the object');
                break;

            case 'storage/canceled':
                console.log('User canceled the upload');
                break;

            case 'storage/unknown':
                console.log('Unknown error occurred, inspect error.serverResponse');
                break;

            default:
                console.log('Unknown error occurred, inspect error.serverResponse');

        }
    }






}

export default Storage;