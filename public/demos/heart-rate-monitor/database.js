export default class Database {
  constructor() {
    this.db = [];
    this.average = 70;
  }

  push(rate) {
    this.db.push(rate);

    if (this.db.length > 30) {
      this.db.shift();
    }
  }

  getAverageHeartRate() {
    this.average = Math.round((this.average + this.db.reduce(( p, c ) => p + c, 0)) / (this.db.length + 1));

    return this.average;
  }
}
