import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
//DEFAULTS
// ChartJS.defaults.font.size = 1;
// ChartJS.defaults.backgroundColor = '#a73e7b';
interface Props {
  title: string,
  labelRow: string[],
  labels1title: string,
  labels2title: string,
  dat1: number[],
  dat2: number[],
}


const LineGraphic = ({
  title,
  labelRow,
  labels1title,
  labels2title,
  dat1,
  dat2
}: Props) => {



  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },

  };
  // [4, 5, 6, 3, 5, 2, 3, 2, 3, 4, 1, 2]
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const data = {
    labels,
    datasets: [
      {
        label: labels1title,
        data: dat1,
        borderColor: '#235d3b',
        backgroundColor: '#3ea76a',
      },
      {
        label: labels2title,
        data: dat2,
        borderColor: '#a73e7b',
        backgroundColor: '#5d2344',
      },
    ],
  };


  return (
    <div>
      <Line height={400} width={400} options={options} data={data} />
    </div>

  )
}


export default LineGraphic