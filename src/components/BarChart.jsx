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
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
  },
};

function BarChart({ color = '#000', list }) {
  const data = {
    labels: list.map(
      (item) => `${new Date(item.dt * 1000).toUTCString().split(' ')[0]} ${
        item.dt_txt.split(' ')[1]
      }`,
    ),
    datasets: [
      {
        label: 'Minº',
        data: list.map((item) => item.main.temp_min),
        backgroundColor: 'rgba(255, 235, 59, 0.8)',
      },
      {
        label: 'Averageº',
        data: list.map((item) => item.main.feels_like),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
      },
      {
        label: 'Maxº',
        data: list.map((item) => item.main.temp_max),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  ChartJS.defaults.color = color;
  return (
    <div className="backdrop-blur-md py-4 overflow-hidden bg-[#2224] flex flex-col justify-center items-center">
      <h1 className="p-2" style={{ color }}>
        Next 24 Hours
      </h1>
      <Bar
        className="max-h-[55vh] lg:max-w-[80%]"
        options={options}
        data={data}
      />
      ;
    </div>
  );
}

export default BarChart;
