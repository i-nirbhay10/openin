import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const DonutChart = () => {
  const chartRef = useRef(null);

  const [productdata, setproductdata] = useState({
    // top_product: "",
    // mediam_product: "",
    // low_product: "",
    // mediam_productper: "",
    // top_productper: "",
    // low_productper: "",
  });

  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:5000/productapi", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const prodata = await res.json();
      if (prodata && prodata[0] && prodata[0].data) {
        setproductdata(prodata[0].data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // chart data
      const data = {
        labels: ["Top Product", "Medium Product", "Low Product"],
        datasets: [
          {
            data: [
              productdata.mediam_productper,
              productdata.top_productper,
              productdata.low_productper,
            ],
            backgroundColor: ["#F6DC7D", "#98D89E", "#EE8484"], // Colors for each segment
          },
        ],
      };

      // Chart configuration options
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
        cutout: 70, //  value to control ring thickness
        radius: 90,
      };

      // Create the chart
      const ctx = chartRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });

      // Clean up when the component unmounts
      return () => {
        myChart.destroy();
      };
    }
  }, [productdata]);

  return (
    <div className="flex flex-col xl:flex-row justify-evenly items-center">
      <div style={{ height: "200px" }}>
        <canvas ref={chartRef} />
      </div>
      <div className="flex gap-2 xl:block">
        <div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#98D89E]"></div>
            <div className="flex font-semibold ml-2 ">
              {productdata.top_product}
            </div>
          </div>
          <div className="ml-7 mt-1 text-[#858585]">
            {productdata.top_productper}%
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#F6DC7D]"></div>
            <div className="flex font-semibold ml-2 ">
              {productdata.mediam_product}
            </div>
          </div>
          <div className="ml-7 mt-1 text-[#858585]">
            {productdata.mediam_productper}%
          </div>
        </div>

        <div>
          <div className="flex items-center ">
            <div className="w-4 h-4 rounded-full bg-[#EE8484] "></div>
            <div className="flex font-semibold ml-2 ">
              {productdata.low_product}
            </div>
          </div>
          <div className="ml-7 mt-1 text-[#858585]">
            {productdata.low_productper}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
