import React from 'react';

const Card = ({ cardData }) => {
    const { name, description, icon, bgClass } = cardData
    return (
        <div className={`w-64 md:w-full lg:w-80 rounded-md h-32 ${bgClass}`}>
            <div className="flex justify-between p-4">
                <div className="lg:flex space-x-4">
                    <div className='flex justify-center'>
                        <img src={icon} alt="" className=" w-12 h-12 lg:w-20 lg:h-20 p-2 rounded-full bg-gray-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white">{name}</h4>
                        <span className="text-xs md:text-sm text-gray-100">{description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;