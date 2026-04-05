import React from 'react';

const ServiceCard = ({ service }) => {
    const { Name, img, Description } = service
    return (
        <div className="card w-60 lg:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{Name}</h2>
                <p>{Description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;