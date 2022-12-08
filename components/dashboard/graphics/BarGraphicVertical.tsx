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
    <div>
      <Bar width={400} height={500} key={5} options={options} data={data} />
    </div>

  )
}


export default BarGraphicVertical