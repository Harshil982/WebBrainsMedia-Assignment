import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
// const firebaseConfig = {
//     apiKey: "AIzaSyAt_No03kqYqyCEKCkVPaPh9-NeyZ5Ba-o",
//     authDomain: "webbrainsmedia-harshilsinh.firebaseapp.com",
//     projectId: "webbrainsmedia-harshilsinh",
//     storageBucket: "webbrainsmedia-harshilsinh.appspot.com",
//     messagingSenderId: "553564671912",
//     appId: "1:553564671912:web:7f1d8e01685f40316b179d",
//     measurementId: "G-VVRWTVJQXW"
// };
const firebaseConfig = {
    apiKey: "AIzaSyBCgCDfmDArNcpMigsxKrtB3SSbsAFclGM",
    authDomain: "fir-2f75d.firebaseapp.com",
    projectId: "fir-2f75d",
    storageBucket: "fir-2f75d.appspot.com",
    messagingSenderId: "607397422165",
    appId: "1:607397422165:web:a025c8b10957004e7da0dc",
    measurementId: "G-3RMYMPRL7N"
  };
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);