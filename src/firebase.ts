import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const apiKey: string | undefined = process.env.REACT_APP_APIKEY
const authDomain: string | undefined = process.env.REACT_APP_AUTHDOMAIn
const projectId: string | undefined = process.env.REACT_APP_PROJECTID
const storageBucket: string | undefined = process.env.REACT_APP_STORAGEBUCKET
const messagingSenderId: string | undefined = process.env.REACT_APP_MESSAGINGSENDERID
const appId: string | undefined = process.env.REACT_APP_APPID

const firebaseConfig = {
	apiKey:apiKey,
	authDomain:authDomain,
	projectId:projectId,
	storageBucket:storageBucket,
	messagingSenderId:messagingSenderId,
	appId:appId
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
