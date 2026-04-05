import React from 'react';
import doctorImg from '../../../assets/images//doctor.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton'

const MakeAppointment = () => {
    return (
        <section className='my-10 lg:mt-32 lg:mb-6 rounded-md'
            style={{
                background: `url(${appointment})`
            }}
        >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row lg:px-20">
                    <img src={doctorImg} className="-mt-24 -mb-4 hidden lg:block h-96 lg:w-4/5 rounded-lg shadow-2xl" alt='xd' />
                    <div className='lg:w-4/5'>
                        <p className='text-primary text-lg font-bold'>Appointment</p>
                        <h1 className="text-white text-3xl lg:text-4xl font-bold">Make an appointment Today!</h1>
                        <p className="text-white py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        <PrimaryButton>Book Now</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;