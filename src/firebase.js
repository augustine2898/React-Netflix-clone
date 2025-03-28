import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDv_91mXs_DXA4jUh8JmI6T9eyEMdPnz54",
  authDomain: "netflix-clone-project-b3d1f.firebaseapp.com",
  projectId: "netflix-clone-project-b3d1f",
  storageBucket: "netflix-clone-project-b3d1f.firebasestorage.app",
  messagingSenderId: "853402721372",
  appId: "1:853402721372:web:0f9c260af06ff17b625a99",
  measurementId: "G-PBZGNXBG9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth(app);
const db =getFirestore(app);

const signup=async(name,email,password)=>{
    try {
      const res =  await createUserWithEmailAndPassword(auth,email,password);
      const user =res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
      })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login =async(email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}

const logout =()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}