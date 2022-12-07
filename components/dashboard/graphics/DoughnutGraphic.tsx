import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Title);



const DoughnutGraphic = () => {
  const data = {
    labels: ['Juguetes', 'Comida', 'Accesorios', 'Thurs', 'Fri'],
    datasets: [
      {
        label: 'Attendance for Week 1',
        data: [25, 24, 25, 25, 3],
        borderColor: ['rgba(255,206,86,0.2)'],
        backgroundColor: ['rgba(232,99,132,1)',
          'rgba(232,211,6,1)',
          'rgba(54,162,235,1)',
          'rgba(255,159,64,1)',
          'rgba(153,102,255,1)'],
        pointBackgroundColor: 'rgba(255,206,86,0.2)',
      }

    ]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    plugins: { title: { display: true, text: 'CATEGORIAS MAS VENDIDAS' } }


    // rotation: -90,
    // circumference: 180,
    // cutout: "60%",
    // maintainAspectRatio: true,
    // responsive: true
  }
  return (
    <div className='w-1/4 h-auto'>
      <Doughnut data={data}  options={options} />
    </div>
  )
}

export default DoughnutGraphic