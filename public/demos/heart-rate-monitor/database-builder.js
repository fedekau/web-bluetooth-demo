import WriterDatabase from './writer-database.js'
import ReaderDatabase from './reader-database.js'

const config = {
  apiKey: "AIzaSyDxyDhmja08vNjN4figbTZRXgS4QyE7cNI",
  authDomain: "web-bluetooth-demo.firebaseapp.com",
  databaseURL: "https://web-bluetooth-demo.firebaseio.com",
  projectId: "web-bluetooth-demo"
};

firebase.initializeApp(config);

export default class DatabaseBuilder {
  static async getDatabase() {
    if (this.database) { return this.database }

    if (!firebase.auth().currentUser) {
      await firebase.auth().signInAnonymously();
    }

    try {
      let ref = await firebase.database().ref('realtime-heart-rate/').push({
        rate: 70,
        time: null
      })

      await ref.remove();

      return this.database = new WriterDatabase();
    } catch (e) {
      return this.database = new ReaderDatabase()
    }
  }
}
