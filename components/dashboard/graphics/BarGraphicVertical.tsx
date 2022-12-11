import React from 'react';
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

interface Props {
  title: string,
  labelstitle: string[],
  datos: number[],
}


const BarGraphicVertical = ({ title, labelstitle, datos }: Props) => {



  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display:false
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

  const labels = labelstitle;

  const data = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: [datos[0],datos[1],datos[2]],
        borderColor: '#235d3b',
        backgroundColor: ['#3ea76a','#153823','#a73e7b']
      },

    ],
  };

  return (
    <div className='w-full h-96 p-4 bg-pwgreen-50 rounded-xl shadow-2xl'>
      <Bar key={5} options={options} data={data} />
    </div>

  )
}


export default BarGraphicVertical
