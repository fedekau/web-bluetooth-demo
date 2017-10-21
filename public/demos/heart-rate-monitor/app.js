import BarChart from './bar-chart.js';
import HeartRateSensor from './heart-rate-sensor.js';
import Database from './database.js';

const heartRateCanvas = document.getElementById('heart-rate');
const connectButton = document.getElementById('connect-button');
const heartRateAvg = document.getElementById('heart-rate-avg');
const heartBeatsCounter = document.getElementById('heart-beats-counter');

const context = heartRateCanvas.getContext('2d');

const heartRateSensor = new HeartRateSensor();
const barChart = new BarChart(context);
const database = new Database();

connectButton.addEventListener('click', async () => {
  await heartRateSensor.connect()

  heartRateSensor.onHeartBeat((rate) => {
    database.push(rate);
    barChart.addData(rate);

    heartRateAvg.innerText = `Average heart rate: ${database.getAverageHeartRate()}`;
    heartBeatsCounter.innerText = `Number of beats: ${database.getNumberOfBeats()}`;
  });
})



