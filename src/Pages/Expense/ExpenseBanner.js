import React from "react";
import expenBanner from "../../asset/banner2.jpg";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
const ExpenseBanner = ({ date, setDate }) => {
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl lg:flex-row-reverse">
        <figure>
          <img
            src={expenBanner}
            style={{ width: "400px", height: "400px" }}
            className="sm:w-50 rounded-lg shadow-2xl"
            alt="Album" 
          />
        </figure>
        <div className="card-body ">
          <DayPicker mode="single" selected={date} onSelect={setDate} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseBanner;
