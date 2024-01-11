import s from './Diagram.module.scss';

import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Diagram = sprint => {
  const [chartData, setChartData] = useState({});

  const { startDate, endDate, duration, allScheduledTime, totalDaly, name } =
    sprint.sprint;

  useEffect(() => {
    // получаем даты
    let dates = [];
    const datesRange = (startDate_, endDate_) => {
      let startDate = new Date(startDate_ + ' 00:00:00 UTC');
      let endDate = new Date(endDate_ + ' 00:00:00 UTC');
      const options = {
        month: 'short',
        day: 'numeric',
      };
      while (startDate <= endDate) {
        const locateUs = startDate.toLocaleString('en-US', options);
        dates.push(locateUs);
        startDate = new Date(
          Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + 1,
          ),
        );
      }
    };
    datesRange(startDate, endDate);

    const redLineArray = new Array(duration)
      .fill(allScheduledTime)
      .map((el, i, arr) =>
        i > 0 ? allScheduledTime - (allScheduledTime / arr.length) * i : el,
      )
      .concat([0]);

    const blueLineArray = new Array(duration)
      .fill(allScheduledTime)
      .map((el, i, arr) => {
        let temp = 0;
        for (let j = i; j >= 0; j--) {
          temp += Object.values(totalDaly[j])[0];
        }
        return arr[i] - temp;
      });

    // cоздаем график
    const chart = () => {
      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Planned remaining staff time',
            // запланированные часы
            data: redLineArray,
            fill: false,
            backgroundColor: '#FA3B3F',
            borderColor: '#FA3B3F',
            borderWidth: 1,
            lineTension: 0.2,
          },
          {
            label: 'Current remaining staff time ',
            // фактические  часы
            data: [allScheduledTime, ...blueLineArray],
            fill: false,
            backgroundColor: '#1988EE',
            borderColor: '#1988EE',
            borderWidth: 1,
            lineTension: 0.2,
          },
        ],
      });
    };
    chart();
  }, []);

  return (
    <div>
      <h3 className={s.diagram_title}>{name}</h3>
      <Line
        data={chartData}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                  beginAtZero: true,
                },
              },
            ],
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
              },
            },
            title: {
              display: true,
              position: 'left',
              text: 'Man-hours',
            },
          },
          layout: {
            padding: 20,
          },
        }}
      />
    </div>
  );
};

Diagram.propTypes = {
  sprint: PropTypes.object.isRequired,
};

export default Diagram;
