import React, { createContext } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import config from "../config/firebase";
import "firebase/firestore";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import firebase from "../config/firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';


const FIREBASE_APP = initializeApp(config);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FirebaseContext = createContext();
const db = getFirestore(FIREBASE_APP);

GoogleSignin.configure({
  webClientId:
    "323061027026-67go2ubi9im7crevaeo7oi7hlqc8op7m.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const Firebase = {
  getCurrentUser: () => {
    return FIREBASE_AUTH.currentUser;
  },
  signInGoogle: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      const authResult = await signInWithCredential(FIREBASE_AUTH, googleCredentials);
      
      const uid = authResult.user.uid;
      const userDocRef = doc(collection(db, "users"), uid);
      const userDocSnapshot = await getDoc(userDocRef);
      let profilePicUrl = "default";
      if (!userDocSnapshot.exists()) {
        // User data doesn't exist in Firestore, create it
        const user = authResult.user;
        const basicUserData = {
          name: user.displayName,
          userName: user.email,
          email: user.email,
          profilePictureUrl: user.photoURL,
        };
        await setDoc(userDocRef, basicUserData);
        
        if (basicUserData.profilePictureUrl) {
          profilePicUrl = await Firebase.uploadProfilePic(basicUserData.profilePictureUrl);
        }

        delete user.password;
        return { ...user, profilePicUrl, uid };
      }

    } catch (error) {
      console.log("got error: ", error.message);
    }
},

  uploadImage: async (uri, userId) => {
    try {
      const imageBlob = await Firebase.getBlob(uri);

      const storageInstance = getStorage();
      const storageRef = ref(storageInstance, `postImages/${userId}/${Date.now()}`);

      await uploadBytes(storageRef, imageBlob);

      const imageUrl = await getDownloadURL(storageRef);

      return imageUrl;
    } catch (error) {
      console.log("Error @uploadImage: ", error);
    }
  },
  createPost: async (post) => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const { content, imageUri } = post;

      let imageUrl = null;
      if (imageUri) {
        imageUrl = await Firebase.uploadImage(imageUri, uid); // Define this function separately
      }

      const postsCollection = collection(db, "posts");
      const newPostDocRef = await addDoc(postsCollection, {
        userId: uid,
        content,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      return newPostDocRef.id;
    } catch (error) {
      console.log("Error @createPost: ", error);
    }
  },
  createUser: async (user) => {
    try {
      await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        user.email,
        user.password
      );
      const uid = Firebase.getCurrentUser().uid;

      let profilePicUrl = "default";
      const dbUsers = collection(db, "users");
      await setDoc(doc(dbUsers, uid), {
        name: user.name,
        username: user.userName,
        email: user.email,
        profilePicUrl,
      });

      if (user.profilePictureUrl) {
        profilePicUrl = await Firebase.uploadProfilePic(user.profilePictureUrl);
      }
      delete user.password;

      return { ...user, profilePicUrl, uid };
    } catch (error) {
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        alert("Password must be at least 6 characters");
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        alert("That email is already in use. Log in instead.");
      }
      console.log("Error @createUser: ", error.message);
    }
  },

  uploadProfilePic: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;
  
    try {
      const photo = await Firebase.getBlob(uri);
  
      const storageInstance = getStorage();
      const storageRef = ref(storageInstance, `profilePictures/${uid}`);
  
      await uploadBytes(storageRef, photo); // Use uploadBytes instead of uploadString
  
      const url = await getDownloadURL(storageRef);
  
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        profilePictureUrl: url,
      });
  
      return url;
    } catch (error) {
      console.log("Error @uploadProfilePic: ", error);
    }
  },  

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        reject(new TypeError("Network request failed."));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    }
  } catch (error) {
    console.log("Error @getUserInfo: ", error);
  }
},

  logOut: async () => {
    try {
      await signOut(FIREBASE_AUTH);
      return true;
    } catch (error) {
      console.log("Error @ logOut", error);
    }
  },

  signIn: async (email, password) => {
    return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  },

  getFirebaseAuth: async () => {
    return FIREBASE_AUTH;
  },

  checkAuthState: async (user, setUser) => {
    return onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
