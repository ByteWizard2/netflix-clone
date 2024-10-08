import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCqjgcrJe0dVV00v0bFXJ5Lamzsj3zeo4I",
  authDomain: "netflix-clone-9cc46.firebaseapp.com",
  projectId: "netflix-clone-9cc46",
  storageBucket: "netflix-clone-9cc46.appspot.com",
  messagingSenderId: "230656051761",
  appId: "1:230656051761:web:12dd3a914609bad28a6310"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch (error){     
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout =()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};