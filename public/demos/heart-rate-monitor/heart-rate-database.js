export default class HeartRateDatabase {
  constructor() {
    this.db = [];
  }

  add(rate) {
    this.db.push(rate);

    if (this.db.length > 30) {
      this.db.shift();
    }
  }
}
