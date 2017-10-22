import BarChart from './bar-chart.js';
import LineChart from './line-chart.js';
import HeartRateSensor from './heart-rate-sensor.js';
import DatabaseBuilder from './database-builder.js';
import ReaderDatabase from './reader-database.js';

async function setupReader(database, barChart, lineChart) {
  database.onDataReceived((result) => {
    barChart.addData(result.heartRate);
    lineChart.addData(result.rrIntervals[0], database.rrIntervalsMin, database.rrIntervalsMax);
  });
}

async function setupWriter(database, barChart, lineChart, connectButton, disconnectButton, clearButton, heartRateSensor) {
  connectButton.hidden = false;
  disconnectButton.hidden = false;
  clearButton.hidden = false;

  connectButton.addEventListener('click', async () => {
    connectButton.value = 'Connecting...';
    connectButton.disabled = true;

    await heartRateSensor.connect();

    connectButton.value = 'Connected';

    heartRateSensor.onHeartBeat((result) => {
      database.push(result);
      barChart.addData(result.heartRate);
      lineChart.addData(result.rrIntervals[0], database.rrIntervalsMin, database.rrIntervalsMax);
    });
  })

  disconnectButton.addEventListener('click', async () => {
    connectButton.value = 'Connect';
    connectButton.disabled = false;

    await heartRateSensor.disconnect();
  })
}

async function start() {
  const heartRateCanvas = document.getElementById('heart-rate');
  const heartRateIntervalsCanvas = document.getElementById('heart-rate-intervals');
  const connectButton = document.getElementById('connect-button');
  const disconnectButton = document.getElementById('disconnect-button');
  const clearButton = document.getElementById('clear-button');
  const demoTitle = document.getElementById('demo-title');

  const heartRateContext = heartRateCanvas.getContext('2d');
  const heartRateIntervalsContext = heartRateIntervalsCanvas.getContext('2d');

  const heartRateSensor = new HeartRateSensor();
  const barChart = new BarChart(heartRateContext);
  const lineChart = new LineChart(heartRateIntervalsCanvas);

  const database = await DatabaseBuilder.getDatabase();

  clearButton.addEventListener('click', () => {
    database.clear();
    barChart.clear();
    lineChart.clear();
  });

  if (database instanceof ReaderDatabase) {
      demoTitle.innerText += ': Doctor';

      setupReader(database, barChart, lineChart);
    } else {
      demoTitle.innerText += ': Patient';

      setupWriter(
        database,
        barChart,
        lineChart,
        connectButton,
        disconnectButton,
        clearButton,
        heartRateSensor
      );
    }
}

window.addEventListener('load', () => {
  start();
})




