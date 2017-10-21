const config = {
  apiKey: "AIzaSyDxyDhmja08vNjN4figbTZRXgS4QyE7cNI",
  authDomain: "web-bluetooth-demo.firebaseapp.com",
  databaseURL: "https://web-bluetooth-demo.firebaseio.com",
  projectId: "web-bluetooth-demo",
  storageBucket: "web-bluetooth-demo.appspot.com",
  messagingSenderId: "580480149345"
};

firebase.initializeApp(config);

export default class Database {
  constructor() {
    this.db = [];
    this.average = 70;
    this.heartBeatCounter = 0;

    firebase.database().ref('avg-heart-rate/').set({})
  }

  push(rate) {
    this.db.push(rate);

    this.heartBeatCounter += 1;

    this._pushAverage()

    if (this.db.length > 30) {
      this.db.shift();
    }
  }

  getAverageHeartRate() {
    this.average = Math.round((this.average + this.db.reduce(( p, c ) => p + c, 0)) / (this.db.length + 1));

    return this.average;
  }

  getNumberOfBeats() {
    return this.heartBeatCounter;
  }

  _pushAverage() {
    if (this.heartBeatCounter % 60 === 0) {
      console.log('Saving average bpm to firebase');

      firebase.database().ref('avg-heart-rate/').push({
        rate: this.getAverageHeartRate(),
        time: Date.now()
      });
    }
  }
}
