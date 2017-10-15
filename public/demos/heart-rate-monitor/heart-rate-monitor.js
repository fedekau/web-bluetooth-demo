function initializeApp() {
  const CHART_DATA_LIMIT = 30;

  const db = Array.apply(null, Array(1000)).map(function() {
    return Math.floor(Math.random() * (77 - 55 + 1)) + 55;
  });

  const heartRateCanvas = document.getElementById('heart-rate');
  const context = heartRateCanvas.getContext('2d');

  const getRate = () => {
    return db.shift();
  }

  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
          dataset.backgroundColor.push('rgba(255, 99, 132, 0.2)');
          dataset.borderColor.push('rgba(255,99,132,1)');

        if (dataset.data.length > CHART_DATA_LIMIT) {
          removeFirstData(chart);
        }
    });

    chart.update();
  }

  function removeFirstData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        dataset.backgroundColor.shift();
        dataset.borderColor.shift();
    });
  }

  const data = {
    labels: [],
    datasets: [{
        label: 'Heart Rate',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }

  const myChartBar = new Chart(context, {
      type: 'bar',
      data,
      options
  });

  setInterval(() => {
    const rate = getRate();

    addData(myChartBar, rate, rate);

  }, 900);
}

export default initializeApp;
