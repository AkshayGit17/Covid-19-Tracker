import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const buildChartData = (data, type = 'cases') => {
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

function LineGraph() {
  const [data, setdata] = useState([]);

  console.log(data);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
      .then((response) => response.json())
      .then((data) => setdata(buildChartData(data)));
  }, []);

  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              backgroundColor: 'rgba(204,16,52,0.5)',
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
