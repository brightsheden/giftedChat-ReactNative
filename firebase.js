//import * as firebase from "firebase"
//import firebase from 'firebase/app'

//import 'firebase/auth'

//import 'firebase/firestore'

// Your web app's Firebase configuration
//const firebaseConfig = {
//    apiKey: "AIzaSyAjwU95dgu0Zg76d1wfapKoH02fZU8RhAk",
//    authDomain: "giftedchat-45581.firebaseapp.com",
//    projectId: "giftedchat-45581",
//    storageBucket: "giftedchat-45581.appspot.com",
//    messagingSenderId: "1040537210698",
//    appId: "1:1040537210698:web:6df3445e100ba0deed7bb3"
// };

//let app;
//if (firebase.app.length === 0){
//    app = initializeApp(firebaseConfig);
//}else{
//    app = firebase.app()
//}

//const db = app.firestore()
//const auth = firebase.auth()
//export default auth;



import firebase from 'firebase'
import  'firebase/firestore'
import 'firebase/auth'

//import * as firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
   
    apiKey: "AIzaSyAjwU95dgu0Zg76d1wfapKoH02fZU8RhAk",
    authDomain: "giftedchat-45581.firebaseapp.com",
    projectId: "giftedchat-45581",
    storageBucket: "giftedchat-45581.appspot.com",
    messagingSenderId: "1040537210698",
    appId: "1:1040537210698:web:6df3445e100ba0deed7bb3"
 
      

})

export const db = firebaseApp.firestore()
export const auth = firebaseApp.auth()

//export  {db,auth}