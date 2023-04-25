import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Min Temp',
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
    },
    {
      label: 'Max Temp',
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(53, 162, 235, 0.8)',
    },
  ],
};

function BarChart(props) {
  ChartJS.defaults.color = '#fff';
  return <Bar className="backdrop-blur-md" options={options} data={data} />;
}

export default BarChart;
