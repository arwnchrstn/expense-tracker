import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChartExpense = () => {
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
              text: "Expense by category",
              font: {
                size: 15,
                family: "'Montserrat', sans-serif",
                style: "normal"
              }
            }
          }
        }}
        data={{
          labels: ["Cash", "ATM", "Bank Account"],
          datasets: [
            {
              data: [2000, 1139, 8993],
              backgroundColor: ["#248e38", "#afd91a", "#abdca7"]
            }
          ]
        }}
      />
    </>
  );
};

export default PieChartExpense;
