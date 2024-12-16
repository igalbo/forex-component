import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  formatDate,
  getDailyPercentageChanges,
  getDefaultEndDate,
  getDefaultStartDate,
  isValidDateRange,
} from "./utils";
import { useExchangeRates } from "./hooks/useExchangeRates";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const { ratesData, loading, error } = useExchangeRates(startDate, endDate);

  const validRange = isValidDateRange(startDate, endDate);

  const chartData = {
    labels: ratesData.map((d) => d.date),
    datasets: [
      {
        label: "USD to ILS Rate",
        data: ratesData.map((d) => d.rate),
        borderColor: "blue",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Daily % Change",
        data: getDailyPercentageChanges(ratesData),
        borderColor: "red",
        fill: false,
        tension: 0.1,
        yAxisID: "y1",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "800px", margin: "auto", fontFamily: "Arial" }}>
      <h1>USD to ILS Exchange Rate</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          max={formatDate(new Date())}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label style={{ marginLeft: "10px" }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          max={formatDate(new Date())}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <p style={{ fontSize: "0.8em" }}>Select up to a 14-day range.</p>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <div>Loading...</div>}
      {!validRange && (
        <div style={{ color: "red" }}>
          Please choose a valid date range (up to 14 days).
        </div>
      )}

      {!loading && validRange && ratesData.length > 0 && (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
}

export default App;
