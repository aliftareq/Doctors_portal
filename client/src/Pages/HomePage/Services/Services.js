import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import flurideImg from '../../../assets/images/fluoride.png'
import cavityImg from '../../../assets/images/cavity.png'
import whiteningImg from '../../../assets/images/whitening.png'

const Services = () => {
    const services = [
        {
            id: 1,
            Name: 'Fluoride Treatment',
            img: flurideImg,
            Description: 'Treatment your toothace and recover all the function'
        },
        {
            id: 2,
            Name: 'Cavity Filling',
            img: cavityImg,
            Description: "suffuring From Cavity? Here's the solution , it will just takes of time 15 mins"
        },
        {
            id: 3,
            Name: 'Teeth Whitening',
            img: whiteningImg,
            Description: 'Make white your teeth as it is glow like a diamonds and girls fell in your love.'
        },
    ]
    return (
        <div className='mt-5 lg:mt-10'>
            <div className='text-center'>
                <p className='font-semibold text-primary text-xs md:text-sm'>OUR SERVICES</p>
                <h3 className='text-xl md:text-3xl text-gray-700'>Services We Provide</h3>
            </div>
            <div className='flex justify-center mt-4'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                    {
                        services.map(service => <ServiceCard key={service.id} service={service}></ServiceCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;