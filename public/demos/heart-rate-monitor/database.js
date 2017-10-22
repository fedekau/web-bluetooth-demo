export default class Database {
  constructor() {
    this.realTimeHeartRateRef = firebase.database().ref('realtime-heart-rate/');
  }

  clear() {
    this.realTimeHeartRateRef.set({});
  }
}
