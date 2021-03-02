import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  legend: {
    //legend displays data about the datasets that are appearing on the chart.
    display: false,
  },
  elements: {
    point: {
      radius: 0, //point wont get rendered
    },
  },
  maintainAspectRatio: false, //responsive
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        //to be displayed on the tooltip
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll', //Sep 4, 1986
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false, //hide horizontal lines
        },
        ticks: {
          //each tick
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const buildChartData = (data, type) => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data[type]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[type][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[type][date];
  }
  return chartData;
};

function LineGraph({ className, type = 'cases' }) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
      .then((response) => response.json())
      .then((data) => setdata(buildChartData(data, type)));
  }, [type]);

  return (
    <div className={className}>
      <Line
        options={options}
        data={{
          datasets: [
            {
              backgroundColor: 'rgba(204,16,52,0.5)',
              borderColor: '#CC1034',
              color: '#cc1034',
              data: data,
            },
          ],
        }}
      />
    </div>
  );
}

export default LineGraph;
