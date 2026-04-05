import React from 'react';

const SingelReview = ({ review }) => {
    const { id, name, location, speech, img } = review;
    return (
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 text-black shadow-xl">
            <div className="p-4 space-y-2 text-sm text-gray-800">
                <p>{speech}</p>
            </div>
            <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                    <div>
                        <img src={img} alt="" className="object-cover w-12 h-12 rounded-full bg-gray-500" />
                    </div>
                    <div>
                        <h4 className="font-bold">{name}</h4>
                        <span className="text-xs text-gray-400">{location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingelReview;