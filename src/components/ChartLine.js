import React, { useContext } from "react";
import { Chart } from "react-google-charts";
import Context from "../store/context";

const ChartLine = () => {
  const dataCtx = useContext(Context);
  console.log(dataCtx.data);
  const intensityToColor = (intensity) => {
    let color;
    switch (intensity) {
      case "low":
        color = "green";
        break;
      case "medium":
        color = "yellow";
        break;
      case "high":
        color = "red";
        break;
      default:
        color = null;
    }
    return color;
  };
  const f = [["x", "duration", { type: "string", role: "style" }]];
  dataCtx.data.forEach((item) => {
    f.push([
      item.selectedDate,
      Number(item.duration),
      intensityToColor(item.intensity)
        ? `point { size: 5; shape-type: circle; fill-color: ${intensityToColor(
            item.intensity
          )}}`
        : null,
    ]);
    console.log(intensityToColor(item.intensity));
  });
  console.log(f);
  return (
    <div className="bg-white p-8 shadow-md w-5/6 container mx-auto m-5  mt-12 rounded-md text-gray-700 flex flex-col">
      <h2 className="text-3xl text-gray-500 text-center capitalize">
        Chart it up
      </h2>
      <Chart
        chartType="LineChart"
        height={"400px"}
        loader={<div>Loading Chart...</div>}
        data={
          dataCtx.data.length < 1
            ? [
                ["time", "duration"],
                [10.28, 10],
                [10.37, 23],
                [11.12, 17],
                [12.3, 18],
                [13.11, 9],
                [13.2, 11],
                [14.16, 27],
                [14.2, 33],
                [15.05, 40],
                [(16.19).toFixed(2), 32],
                [17.15, 35],
                [20.01, 4],
              ]
            : f
        }
        options={{
          hAxis: {
            title: "Time",
          },
          vAxis: {
            title: "Duration",
          },
          pointSize: 5,
          lineWidth: 1,
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default ChartLine;
