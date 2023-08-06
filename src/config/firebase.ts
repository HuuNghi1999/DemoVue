import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {
	API_KEY,
	APP_ID,
	AUTH_DOMAIN,
	MEASUREMENT_ID,
	MESSAGE_SENDER_ID,
	PROJECT_ID,
	STORAGE_BUCKET,
} from "./environment";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGE_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app);

export { app, auth, db };
