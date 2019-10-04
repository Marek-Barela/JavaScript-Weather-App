export const chartOptions = (forecastHours, forecastTemperature) => ({
  type: "line",
  data: {
    labels: forecastHours,
    datasets: [
      {
        label: "Temperature",
        data: forecastTemperature,
        pointHoverBackgroundColor: "#ffffff",
        pointHoverRadius: 6,
        backgroundColor: ["rgba(255, 255, 255, 0.5)"],
        borderColor: ["#ffffff"],
        borderWidth: 3
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "12 Hours Forecast",
      fontSize: 25,
      padding: 30
    },
    legend: {
      position: "bottom"
    },
    tooltips: {
      callbacks: {
        labelColor: function() {
          return {
            borderColor: "#ffffff",
            backgroundColor: "#ffffff"
          };
        }
      }
    }
  }
});
