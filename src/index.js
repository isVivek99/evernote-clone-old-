import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from "firebase" ;

const firebaseConfig = {
  apiKey: "AIzaSyC3wIrBcKxeyonPuedOSj251W2F5lfChws",
  authDomain: "evernote-clone-f52c5.firebaseapp.com",
  projectId: "evernote-clone-f52c5",
  storageBucket: "evernote-clone-f52c5.appspot.com",
  messagingSenderId: "1051894083531",
  appId: "1:1051894083531:web:0a0cf77887f131f665104e"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

