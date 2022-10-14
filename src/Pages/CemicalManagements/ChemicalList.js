import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ChemicalList = () => {
  const { id } = useParams();
  const [land, setLand] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/landCatagory/${id}`)
      .then((res) => res.json())
      .then((data) => setLand(data));
  }, []);
  const handlePDF = () => {
    window.print();
  };

  const [chemicalinput, setChemicalInput] = useState([
    { mame: "", Categories: "", Trade_name: "", dose: "", dose_unit: "" },
  ]);
  const [getChemicalList, setChemicalList] = useState([]);
  const [getchemicalId, setChemicalId] = useState('');
  const [getchemicalRowData, setChemicalRowData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/chemicalProducts")
      .then((res) => res.json())
      .then((data) => setChemicalList(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/chemicalProducts/${getchemicalId}`)
      .then((res) => res.json())
      .then((data) => setChemicalRowData(data));
  }, [getchemicalId]);

  /*  const fertilizer = [
    { name: "Urea", unit1: "ml/L", unit2: "mg/L" },
    { name: "DAP", unit1: "ml/L", unit2: "mg/L" },
    { name: "TSP", unit1: "ml/L", unit2: "mg/L" },
    { name: "MOP", unit1: "ml/L", unit2: "mg/L" },
    { name: "Zinc", unit1: "ml/L", unit2: "mg/L" },
  ]; */

  const handleInputChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...chemicalinput];
    list[index][name] = value;
    setChemicalInput(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...chemicalinput];
    list.splice(index, 1);
    setChemicalInput(list);
  };

  const handleAddClick = () => {
    alert("add");
    setChemicalInput([
      ...chemicalinput,
      { mame: "", Categories: "", Trade_name: "", dose: "", dose_unit: "" },
    ]);
  };

  const handleChemical = (e) => {
    const getChemicalListId = e.target.value;
    // const idList=[...getchemicalId,getChemicalListId]
    // console.log(idList)
    setChemicalId(getChemicalListId);
  };
  return (
    <div>
      <button onClick={handlePDF}>print</button>
      <h1 className="text-secondary font-bold text-2xl"> {land.name}</h1>
      <h2>chemical id:{getchemicalId}</h2>

      <form className="grid lg:grid-cols-6 grid-cols-1 justify-items-center gap-4 mt-2 w-full">
        {/* <!-- sm --> */}
        {chemicalinput.map((c, i) => {
          return (
            <>
              <select
                className="select select-bordered select-sm w-full max-w-xs"
                name="mame"
                onChange={(e) => handleChemical(e)}
              >
                <option disabled selected>
                  Select Chemical name
                </option>
                {getChemicalList.map((cl, index) => (
                  <option key={index} value={cl._id}>
                    {cl.common_name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="Categories"
                value={getchemicalRowData.Categories}
                className="input input-bordered input-sm w-full max-w-xs"
                placeholder="CATEGORIES OF CHEMICALS"
                onChange={(e) => handleInputChange(e, i)}
              />

              <input
                type="text"
                name="Trade_name"
                value={getchemicalRowData.Trade_name}
                placeholder="TRADE NAME OF PRODUCTS"
                className="input input-bordered input-sm w-full max-w-xs"
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                type="number"
                name="dose"
                value={getchemicalRowData.dose}
                placeholder="DOSE"
                className="input input-bordered input-sm w-full max-w-xs"
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                type="text"
                name="dose_unit"
                value={getchemicalRowData.dose_unit}
                placeholder="DOSE UNIT"
                className="input input-bordered input-sm w-full max-w-xs"
                onChange={(e) => handleInputChange(e, i)}
              />

              {chemicalinput.length !== 1 && (
                <button
                  className="btn btn-secondary w-full max-w-xs btn-sm"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}

              {chemicalinput.length - 1 === i && (
                <button
                  className="btn btn-secondary w-full max-w-xs btn-sm"
                  onClick={handleAddClick}
                >
                  Add More
                </button>
              )}
            </>
          );
        })}
        <input
          type="submit"
          value="Submit"
          placeholder="Type here"
          className="btn btn-secondary w-full max-w-xs btn-sm"
        />
      </form>
    </div>
  );
};

export default ChemicalList;
