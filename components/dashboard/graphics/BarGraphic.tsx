import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import { Title } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );
//DEFAULTS
// ChartJS.defaults.font.size = 1;
// ChartJS.defaults.backgroundColor = '#a73e7b';
interface Props {
  title: string,
  labelstitle: string,
  datos: number[],
}


const BarGraphic = ({ title, labelstitle, datos }: Props) => {



  const options = {
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: title,
        color: "#07130c",
        font: {
          size: 16
        }
      },
    },
  };

  const labels = [labelstitle];

  const data = {
    labels,
    datasets: [
      {
        label: 'Registrados este Mes',
        data: [datos[0]],
        borderColor: '#235d3b',
        backgroundColor: '#3ea76a',
      },
      {
        label: 'Registrados el Mes Anterior',
        data: [datos[1]],
        borderColor: '#5d2344',
        backgroundColor: '#c15895',
      },
    ],
  };

  return (
    <div className='w-full h-96 p-4 bg-pwgreen-50 rounded-xl shadow-2xl'>
      <Bar key={5} options={options} data={data} />
    </div>

  )
}


export default BarGraphic
