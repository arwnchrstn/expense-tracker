import { PropTypes } from "prop-types";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

import { incomeColors } from "../../config/categoryColors";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChartIncome = ({ incomeByCategory }) => {
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
              text: "Total income by category",
              font: {
                size: 15,
                family: "'Montserrat', sans-serif",
                style: "normal"
              }
            }
          }
        }}
        data={{
          labels: incomeByCategory.map((transaction) => transaction._id),
          datasets: [
            {
              data: incomeByCategory.map(
                (transaction) => transaction.totalAmount
              ),
              backgroundColor: incomeByCategory.map(
                (transaction) => incomeColors[transaction._id]
              )
            }
          ]
        }}
      />
    </>
  );
};

PieChartIncome.propTypes = {
  incomeByCategory: PropTypes.array.isRequired
};

export default PieChartIncome;
