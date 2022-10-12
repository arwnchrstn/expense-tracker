import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChartCashflow = () => {
  return (
    <>
      <Pie
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Cashflow",
              font: {
                size: 15,
                family: "'Montserrat', sans-serif",
                style: "normal"
              }
            }
          }
        }}
        data={{
          labels: ["Income", "Expenses"],
          datasets: [
            {
              data: [2000, 1139],
              backgroundColor: ["#248e38", "#dc3545"]
            }
          ]
        }}
      />
    </>
  );
};

export default PieChartCashflow;
