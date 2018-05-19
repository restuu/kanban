import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCrrD0KwzA1oxh8_KHoNzLis3f0jxnGT1A",
  authDomain: "realtime-kanban.firebaseapp.com",
  databaseURL: "https://realtime-kanban.firebaseio.com",
  projectId: "realtime-kanban",
  storageBucket: "realtime-kanban.appspot.com",
  messagingSenderId: "401313178063"
}
firebase.initializeApp(config)

const db = firebase.database()
const todo = db.ref('/todos')
const wip = db.ref('/wip')
const done = db.ref('/done')

export { todo, wip, done }