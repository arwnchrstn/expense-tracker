import { PropTypes } from "prop-types";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

import { expenseColors } from "../../config/categoryColors";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChartExpense = ({ expenseByCategory }) => {
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
              text: "Total expense by category",
              font: {
                size: 15,
                family: "'Montserrat', sans-serif",
                style: "normal"
              }
            }
          }
        }}
        data={{
          labels: expenseByCategory.map((transaction) => transaction._id),
          datasets: [
            {
              data: expenseByCategory.map(
                (transaction) => transaction.totalAmount
              ),
              backgroundColor: expenseByCategory.map((transaction) =>
                transaction._id === "health care"
                  ? expenseColors["healthcare"]
                  : expenseColors[transaction._id]
              )
            }
          ]
        }}
      />
    </>
  );
};

PieChartExpense.propTypes = {
  expenseByCategory: PropTypes.array.isRequired
};

export default PieChartExpense;
