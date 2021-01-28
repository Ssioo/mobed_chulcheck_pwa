import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import firebase from 'firebase/app'
import 'firebase/analytics'
import  'firebase/messaging'

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
firebase.analytics()

const messaging = firebase.messaging()
firebase.messaging().getToken({ vapidKey: 'BFuII-gSgT5PGZwFUktwc49VCUmQURyMGexOTzkOcdS3_rNPDgZ9PJIvvs-1FMCBfIx65CevzmZ2O1mduWlugYM' })
messaging.onMessage((payload) => {
  console.log('onMessage', payload)
  new Notification(payload.notification.title, { body: payload.notification.body })
})

ReactDOM.render(<App/>, document.getElementById('root'))

serviceWorkerRegistration.register()
