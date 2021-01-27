importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

const messaging = firebase.messaging()

messaging.onMessage((payload) => {
  console.log(payload)
})

messaging.onBackgroundMessage((payload) => {
  console.log(payload)
  self.registration.showNotification(payload.notification.title, { body: payload.notification.body, icon: 'favicon-16x16.png'})
})
