import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/messaging'
import { updateAlert } from './util'
import { skipWaiting } from 'workbox-core'

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
  navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then((registration) => {
    registration?.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
      badge: payload.notification.icon,
      vibrate: payload.notification.vibrate ?? payload.notification.vibrateTimingsMillis,
    })
  })
})

addEventListener('notificationclick', (event) => {
  event.notification.close()
  // @ts-ignore
  event.waitUntil(clients.matchAll({
    type: 'window'
  })).then((cs) => {
    const found = cs.find((c) => c.url === '/' && 'focus' in c)
    if (found) return found.focus()
    // @ts-ignore
    clients.openWindow('https://mobedchulcheck.netlify.app/#/')
  })
})

ReactDOM.render(<App/>, document.getElementById('root'))

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    updateAlert()
    skipWaiting()
  }
})
