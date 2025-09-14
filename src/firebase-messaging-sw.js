importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js"
);

const firebaseConfig = {

  apiKey: "AIzaSyBCswQwt3nX7Us3aLPo4avR5tEA9gECB4c",
  authDomain: "castello-a99be.firebaseapp.com",
  databaseURL: "https://castello-a99be.firebaseio.com",
  projectId: "castello-a99be",
  storageBucket: "castello-a99be.firebasestorage.app",
  messagingSenderId: "639056394320",
  appId: "1:639056394320:web:684a48ea6aaafa36d0f955",
  measurementId: "G-S5DE10FNH7",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage( (message) => {
  const channel = new BroadcastChannel('my-channel');
  channel.postMessage(message);
  console.log('Message received in background (SW) ', message);
  // ...
});
