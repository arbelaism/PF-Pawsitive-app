import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Title);

interface Props {
  title: string,
  bridge: string,
  labels: string[],
  dat: number[],
}


const DoughnutGraphic = ({ title, bridge, labels, dat }: Props) => {

  //DEFAULTS
  // ChartJS.defaults.font.size = 20;
  // ChartJS.defaults.backgroundColor = '#a73e7b';



  const data = {
    labels: labels,
    datasets: [
      {
        label: bridge,
        data: dat,
        borderColor: ['rgba(0,0,0,0.2)'],
        borderWidth: 2,
        backgroundColor: [
          '#a2dcbb',
          '#7dcf9f',
          '#58c184',
          '#3ea76a',
          '#308253',
          '#235d3b',
          '#153823',
        ],
        pointBackgroundColor: 'rgba(255,206,86,0.2)',
      }

    ]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // plugins: { title: { display: true, text: title } },
    // legend: {
    //   display: true,
    //   position: "bottom",
    //   labels: {
    //     fontColor: "#333",
    //     fontSize: 16
    //   }
    // },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        // position: "top",
        text: title,
        font: {
          size: 30
        }
      },
      // legend: {
      //   labels: {
      //     font: {
      //       size: 60
      //     }
      //   }
      // }
    },

    // animation: false,
    // rotation: -90,
    // circumference: 180,
    // cutout: "60%",
    // maintainAspectRatio: true,
    // responsive: true
  }
  return (
    <div>
      <Doughnut data={data} width="400" height="400" options={options} />
    </div>

  )
}

export default DoughnutGraphic
