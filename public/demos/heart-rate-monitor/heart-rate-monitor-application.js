import BarChart from './bar-chart.js'
import HeartRateSensor from './heart-rate-sensor.js';
import HeartRateDatabase from './heart-rate-database.js';
export default class App {
  constructor(context) {
    this._initDB();
    this._initHeartRateSensor();
    this._initChart(context);
  }

  start() {
    this.heartRateSensor.onHeartBeat((rate) => {
      this.lineChart.addData(rate, rate);
      this.db.add(rate);
    })
  }

  _initDB() {
    if (this.db) { return }

    this.db = new HeartRateDatabase();
  }

  _initChart(context) {
    if (this.lineChart) { return }

    this.lineChart = new BarChart(context);
  }

  _initHeartRateSensor() {
    if (this.heartRateSensor) { return }

    this.heartRateSensor = new HeartRateSensor();
  }
}
