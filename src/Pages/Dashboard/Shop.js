import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import SalesDetails from "./SalesDetails";

const Shop = () => {
  const [sales, setSales] = useState(null);
  const [date, setDate] = useState(new Date());
  const [user] = useAuthState(auth);

  const formattedDate = format(date, "PP");

  const handleSubmitDepositme = (e) => {
    e.preventDefault();
    const shopList = {
      date: formattedDate,
      empoyeeName: user.displayName,
      empoyeeEmail: user.email,
      cropsName: e.target.cropsName.value,
      cropsWeight: e.target.cropsWeight.value,
      cropsUnitPrice: e.target.cropsUnitPrice.value,
    };

    fetch("http://localhost:5000/sales", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(shopList),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          toast.success(`Successfully Submit`);
        }
        setSales(null);
      });
  };
  return (
    <div>
      <>
        <div className="card lg:card-side bg-base-100 shadow-xl lg:flex-row-reverse w-[100%] justify-items-center items-center p-2">
          <div className="card-body w-[350px] lg:w-full">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-[50%]"
            />
          </div>
          <form
            onSubmit={handleSubmitDepositme}
            className="grid grid-cols-1 gap-4 justify-items-center mt-2 w-full"
          >
            <input
              type="text"
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />

            <input
              type="text"
              name="name"
              disabled
              value={user?.displayName || user?.email}
              className="input input-bordered w-full max-w-xs"
            />

            <select name="cropsName"  defaultValue={"DEFAULT"} className=" border-2 border-accent select w-full max-w-xs">
              <option value="DEFAULT" disabled selected>
                Pick Crops Name
              </option>
              <option value='Napeir Grass'>Napeir Grass</option>
              <option value='Lady Finger'>Lady Finger</option>
              <option value='Mushroom'>Mushroom</option>
              <option value='Sweet Corn'>Sweet Corn</option>
              
            </select>
            <input
              type="text"
              required
              name="cropsWeight"
              placeholder="crops Weight"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="cropsUnitPrice"
              placeholder="Unit Price"
              className="input input-bordered w-full max-w-xs"
            />
           

            <input
              type="submit"
              value="Submit"
              placeholder="Type here"
              className="btn btn-secondary w-full max-w-xs"
            />
          </form>
        </div>

        <Outlet></Outlet>
        
        <SalesDetails/>
      </>
    </div>
  );
};

export default Shop;
