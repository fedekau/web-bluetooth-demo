export default class BarChart {
  constructor(context) {
    this.CHART_DATA_LIMIT = 30;
    this.chart = new Chart(context, {
      type: 'line',
      data: this._data(),
      options: this._options()
    });
  }

  addData(data, min, max) {
    this.chart.data.labels.push(data);
    this.chart.data.datasets.forEach((dataset) => {
      if (dataset.label === 'Heart Inter-Beat Interval (milliseconds)') {
        dataset.data.push(data);
        dataset.backgroundColor.push('rgba(0, 0, 0, 0.0)');
        dataset.borderColor.push('rgba(0, 0, 255, 1)');

        if (dataset.data.length > this.CHART_DATA_LIMIT) {
          this.removeFirstData();
        }
      }

      if (dataset.label === 'Min Heart Inter-Beat Interval (milliseconds)') {
        dataset.data.push(min);
        dataset.backgroundColor.push('rgba(0, 0, 0, 0.0)');
        dataset.borderColor.push('rgba(0, 255, 0, 1)');

        if (dataset.data.length > this.CHART_DATA_LIMIT) {
          this.removeFirstData();
        }
      }

      if (dataset.label === 'Max Heart Inter-Beat Interval (milliseconds)') {
        dataset.data.push(max);
        dataset.backgroundColor.push('rgba(0, 0, 0, 0.0)');
        dataset.borderColor.push('rgba(255, 0, 0, 1)');

        if (dataset.data.length > this.CHART_DATA_LIMIT) {
          this.removeFirstData();
        }
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

  setData(data) {
    this.chart.data.labels = data;

    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = data;
    });

  }

  clear() {
    this.chart.data.labels = [];

    this.chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
  }

  _data() {
    return {
      labels: [],
      datasets: [
        {
          label: 'Heart Inter-Beat Interval (milliseconds)',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        },
        {
          label: 'Min Heart Inter-Beat Interval (milliseconds)',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        },
        {
          label: 'Max Heart Inter-Beat Interval (milliseconds)',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        }
      ]
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
