import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LandList = ({catagory}) => {
    const {name,_id}=catagory
   
    return (
       <div className="card lg:max-w-lg bg-base-100 shadow-xl mt-5">
      <div className="card-body text-center">
        <h2 className="text-2xl text-secondary text-center">{name}</h2>
        <div className="card-actions justify-center">
          <Link to={`/chemical/${_id}`}
            
            className="btn btn-secondary text-white uppercase"
          >
            select Camical
          </Link>
        </div>
      </div>
    </div>
    );
};

export default LandList;