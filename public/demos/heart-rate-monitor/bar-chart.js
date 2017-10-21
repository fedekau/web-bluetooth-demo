export default class BarChart {
  constructor(context) {
    this.CHART_DATA_LIMIT = 30;
    this.chart = new Chart(context, {
      type: 'bar',
      data: this._data(),
      options: this._options()
    });
  }

  addData(data) {
    this.chart.data.labels.push(data);
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
          dataset.backgroundColor.push('rgba(255, 99, 132, 0.2)');
          dataset.borderColor.push('rgba(255,99,132,1)');

        if (dataset.data.length > this.CHART_DATA_LIMIT) {
          this.removeFirstData();
        }
    });

    this.chart.update();
  }

  removeFirstData() {
    this.chart.data.labels.shift();
    this.chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        dataset.backgroundColor.shift();
        dataset.borderColor.shift();
    });
  }

  _data() {
    return {
      labels: [],
      datasets: [{
          label: 'Heart Rate',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
      }]
    }
  }

  _options() {
    return {
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
  }
}
