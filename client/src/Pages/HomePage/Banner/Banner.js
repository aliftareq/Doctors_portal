import React from 'react';
import img from '../../../assets/images/chair.png'
import './Banner.css'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton'

const Banner = () => {
    return (
        <div className="hero bgImg px-4 py-6 md:py-10 lg:py-16">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={img} className="mb-4 md:mb-0 lg:w-1/2 rounded-lg shadow-xl" alt='h-img' />
                <div>
                    <h1 className="text-3xl lg:text-5xl font-bold">Your <span className='text-teal-400'>New Smile</span> will Starts from Here!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Get started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;