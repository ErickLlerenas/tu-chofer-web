import firebase from "firebase/app";
import "firebase/firestore";

import { FIREBASE_CONFIG } from "./constants";

const fb = firebase.initializeApp(FIREBASE_CONFIG);
export const db = fb.firestore();
