import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updatePassword
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpSU96LhVMqrsCbRRX57_ccBifhC0sXzE",
  authDomain: "bookflix-7a0ce.firebaseapp.com",
  projectId: "bookflix-7a0ce",
  storageBucket: "bookflix-7a0ce.appspot.com",
  messagingSenderId: "593660041275",
  appId: "1:593660041275:web:da61224d2f48d96f16241e",
  databaseURL: "https://bookflix-7a0ce-default-rtdb.firebaseio.com"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [pic, setPic] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (users) => {
      if (users) {
        setUser(users);
        setPic(users.photoURL);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Signup method
  const signupWithUsernameAndPassword = (email, pass) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, pass);
  };

  // Login method
  const loginWithUsernameAndPassword = (email, pass) => {
    return signInWithEmailAndPassword(firebaseAuth, email, pass);
  };

  // Log out
  const logout = () => {
    return signOut(firebaseAuth);
  };

  // Sign in with Google method
  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  // Update password method
  const updatePasswordForUser = (newPassword) => {
    const firebaseUser = firebaseAuth.currentUser;
    if (firebaseUser) {
      return updatePassword(firebaseUser, newPassword);
    } else {
      return Promise.reject(new Error("No user is currently logged in."));
    }
  };

  // Save todos to Firebase
  const saveTodosToFirebase = (todos) => {
    if (user) {
      const todosRef = ref(firebaseDatabase, `todos/${user.uid}`);
      return set(todosRef, todos);
    }
  };

  // Fetch todos from Firebase
  const fetchTodosFromFirebase = async () => {
    if (user) {
      const dbRef = ref(firebaseDatabase);
      const snapshot = await get(child(dbRef, `todos/${user.uid}`));
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
    }
  };

  // Checking if user is logged in or not
  const isLoggedIn = user ? true : false;
  
  // Returning the context provider
  return (
    <FirebaseContext.Provider
      value={{
        signupWithUsernameAndPassword,
        loginWithUsernameAndPassword,
        signInWithGoogle,
        logout,
        updatePasswordForUser,
        saveTodosToFirebase,
        fetchTodosFromFirebase,
        isLoggedIn,
        pic,
        user, 
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
