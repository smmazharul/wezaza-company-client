import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ChemicalProductLists = () => {

    const [chemicalProducts,setChemicalProducts]=useState(null)




    const handleSubmitchemicalProducts=e=>{
        e.preventDefault()
        const chemicalProductlist={
            common_name: e.target.common_name.value,
            Categories: e.target.Categories.value,
            Trade_name: e.target.Trade_name.value,
            dose: e.target.dose.value,
            dose_unit: e.target.dose_unit.value,
            
          }
      
          fetch('http://localhost:5000/chemicalProducts', {
            method: "POST",
            headers: {
              'content-type':'application/json'
            },
            body:JSON.stringify(chemicalProductlist)
          })
            .then(res => res.json())
            .then(data => {
              // console.log(data);
              if (data) {
                   console.log(data) 
                toast.success(`Successfully Submit`);
            }
            setChemicalProducts(null)
            })
      
    }

    return (
        <div>
            <h1>Chemical product lists </h1>

            <form onSubmit={handleSubmitchemicalProducts}  className="grid grid-cols-1 gap-4 justify-items-center mt-2 w-full">
          
          
          <input
            type="text"
            required
            name="common_name"
            className="input input-bordered w-full max-w-xs"
            placeholder='COMMON NAME OF PRODUCTS'
          />
          <input
            type='text'
            required
            name='Categories'
            className="input input-bordered w-full max-w-xs"
            placeholder='CATEGORIES OF CHEMICALS'
          />
          
          <input
            type="text"
            required
            name="Trade_name"
            placeholder="TRADE NAME OF PRODUCTS"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            required
            name="dose"
            placeholder="DOSE"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            required
            name="dose_unit"
            placeholder="DOSE UNIT"
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
    );
};

export default ChemicalProductLists;