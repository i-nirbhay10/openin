import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Data for the chart
    const data = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Guest",
          data: [500, 400, 300, 200],
          backgroundColor: "#98D89E", // Semi-transparent bar color for Guest
          borderColor: "#FFFFFF",
          borderWidth: 3,
          barThickness: 25,
        },
        {
          label: "User",
          data: [100, 200, 300, 400],
          backgroundColor: "#EE8484", // Semi-transparent bar color for User
          borderColor: "#FFFFFF",
          borderWidth: 3,
          barThickness: 25,
        },
      ],
    };

    // Chart configuration options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 500, // Set the maximum value on the Y-axis to 500
          stepSize: 100, // Set the step size to 100
          ticks: {
            callback: (value) => {
              if ([0, 100, 200, 300, 400, 500].includes(value)) {
                return value;
              }
            },
          },
        },
        x: {
          barPercentage: 0.7, // Adjust the bar width percentage (controls bar thickness)
          categoryPercentage: 0.8, // Adjust the category width percentage (controls gap)
        },
      },
      plugins: {
        legend: {
          display: true, // Display the legend
          position: "top", // Position the legend at the top
        },
      },
    };

    // Create the chart
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    // Clean up when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="h-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
