import BarChart from './bar-chart.js'
import HeartRateSensor from './heart-rate-sensor.js';
export default class App {
  constructor(context) {
    this._initDB();
    this._initHeartRateSensor();
    this._initChart(context);
  }

  start() {
    setInterval(() => {
      const rate = this.heartRateSensor.getHeartRate();

      this.lineChart.addData(rate, rate);

    }, 900);
  }

  _initDB() {
    if (this.db) { return }
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
