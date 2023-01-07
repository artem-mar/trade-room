import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import Room from './Room';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCxa-TKXUbdq_3mip2nx1PNFa3uFPIt6l4',
  authDomain: 'trade-room-7f3ef.firebaseapp.com',
  databaseURL: 'https://trade-room-7f3ef-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'trade-room-7f3ef',
  storageBucket: 'trade-room-7f3ef.appspot.com',
  messagingSenderId: '345510340804',
  appId: '1:345510340804:web:2ff22cf7b240c16dfd4191',
};
const app = initializeApp(firebaseConfig);
console.log(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Room />
  </React.StrictMode>,
);
