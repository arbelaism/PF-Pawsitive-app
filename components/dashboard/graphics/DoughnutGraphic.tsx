import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Title);

interface Props {
  title: string,
  bridge: string,
  labels: string[],
  dat: number[],
  colors: string[]
}


const DoughnutGraphic = ({ title, bridge, labels, dat, colors }: Props) => {

  //DEFAULTS
  ChartJS.defaults.font.size = 20;
  // ChartJS.defaults.backgroundColor = '#a73e7b';



  const data = {
    labels: labels,
    datasets: [
      {
        label: bridge,
        data: dat,
        borderColor: ['rgba(0,0,0,0.2)'],
        borderWidth: 1,
        backgroundColor: colors,
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
        // position: "top",
        text: title,
        font: {
          size: 40
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
    <div className='w-1/3 h-auto'>
      <Doughnut data={data} width="400" height="400" options={options} />
    </div>
  )
}

export default DoughnutGraphic