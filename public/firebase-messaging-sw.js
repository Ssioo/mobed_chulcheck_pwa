importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyCXthCGTDqn-f5Nd0MY5L-Nnxg8g-f6XtQ',
  authDomain: 'mobedchulcheck.firebaseapp.com',
  projectId: 'mobedchulcheck',
  storageBucket: 'mobedchulcheck.appspot.com',
  messagingSenderId: '1078947672432',
  appId: '1:1078947672432:web:10b67c4c4a19ae9f4adfb5',
  measurementId: 'G-CERXPFDHTC'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(payload)
  self.registration.showNotification(payload.notification.title, { body: payload.notification.body, icon: 'favicon-16x16.png'})
})
