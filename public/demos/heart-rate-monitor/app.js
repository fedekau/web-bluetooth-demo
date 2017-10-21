import BarChart from './bar-chart.js';
import HeartRateSensor from './heart-rate-sensor.js';
import DatabaseBuilder from './database-builder.js';
import ReaderDatabase from './reader-database.js';

async function start() {
  const heartRateCanvas = document.getElementById('heart-rate');
  const connectButton = document.getElementById('connect-button');
  const disconnectButton = document.getElementById('disconnect-button');

  const context = heartRateCanvas.getContext('2d');

  const heartRateSensor = new HeartRateSensor();
  const barChart = new BarChart(context);
  const database = await DatabaseBuilder.getDatabase();

  if (database instanceof ReaderDatabase) {
      database.onDataReceived((rate) => {
        barChart.addData(rate);
      });
    } else {
      connectButton.hidden = false;
      disconnectButton.hidden = false;

      connectButton.addEventListener('click', async () => {
        connectButton.value = 'Connecting...';
        connectButton.disabled = true;

        await heartRateSensor.connect();

        connectButton.value = 'Connected';

        heartRateSensor.onHeartBeat((rate) => {
          database.push(rate);
          barChart.addData(rate);
        });
      })

      disconnectButton.addEventListener('click', async () => {
        connectButton.value = 'Connect';
        connectButton.disabled = false;

        await heartRateSensor.disconnect();
      })
    }
}

window.addEventListener('load', () => {
  start();
})




