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
      title: {
        display: true,
        text: title,
        color: "#07130c",
        font: {
          size: 16
        }
      },
        legend: {
            labels: {
                display: false,
                font: {
                    size: 11
                },
            }
        }
    },

    animation: true,
    rotation: -90,
    circumference: 360,
    cutout: "50%",
    // maintainAspectRatio: true,
    // responsive: true
  }
  return (
    <div className='w-full h-96 p-4 bg-pwgreen-50 rounded-xl shadow-2xl'>
      <Doughnut data={data}  options={options} />
    </div>

  )
}

export default DoughnutGraphic
