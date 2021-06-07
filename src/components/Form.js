import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { format } from "date-fns";
import { useContext } from "react";
import Context from "../store/context";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

import Select from "react-select";

const options = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const Form = () => {
  const dataCtx = useContext(Context);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [intensity, setIntensity] = useState("");
  const [list, setList] = useState(getLocalStorage());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (e) => {
    setDuration(e.target.value);
  };
  const handleChangeSelect = (newValue) => {
    setIntensity(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      selectedDate: parseFloat(format(selectedDate, "HH.mm")).toFixed(2),
      duration: duration,
      intensity: intensity.value,
    };
    setList([...list, newItem]);
    dataCtx.addData(newItem);

    console.log(dataCtx.data);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  useEffect(() => {
    dataCtx.addData(getLocalStorage());
    console.log(getLocalStorage());
  }, []);
  return (
    <form className="bg-white p-8 shadow-md w-5/6 container mx-auto m-5 mt-12 rounded-md text-gray-700 flex flex-col">
      <h2 className="text-3xl text-gray-500 text-center capitalize mb-4">
        Enter the data
      </h2>
      <div className="flex flex-col md:flex-row justify-center md:items-center w-5/6 md:justify-around !space-x-3 !space-y-3 p-2">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>

        <input
          type="number"
          placeholder="Duration (s)"
          className="placeholder-gray-700 border-2 rounded-md border-indigo-100 p-1"
          onChange={handleChange}
        />
        <Select
          options={options}
          className="!placeholder-gray-700 outline-0 !border-0 rounded-md border-gray-200 !m-0 md:w-1/3"
          placeholder="Intensity"
          value={intensity}
          onChange={handleChangeSelect}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-3 py-2 rounded-3xl text-md mt-6 self-end outline-0 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
