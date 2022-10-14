import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import LandList from './LandList';

const CatagoryOfLand = () => {
    const [landCatagory,setLandCatagory]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/landCatagory')
        .then(res=>res.json())
        .then(data=>setLandCatagory(data))
    },[])
    return (
        <div>
            <h1>Catagory of Land: {landCatagory.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
        landCatagory.map((catagory) =><LandList 
        key={catagory._id}
        catagory={catagory}
        />
        )}
          </div>
        </div>
    );
};

export default CatagoryOfLand;