import { PropTypes } from "prop-types";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChartCashflow = ({ cashflow }) => {
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
          labels: cashflow.map((transaction) => transaction._id),
          datasets: [
            {
              data: cashflow.map((transaction) => transaction.totalAmount),
              backgroundColor: cashflow.map((transaction) =>
                transaction._id === "expense" ? "#dc3545" : "#248e38"
              )
            }
          ]
        }}
      />
    </>
  );
};

PieChartCashflow.propTypes = {
  cashflow: PropTypes.array.isRequired
};

export default PieChartCashflow;
