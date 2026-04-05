import React from 'react';
const AppointmentOption = ({ option, setTreatment }) => {
    const { name, price, slots } = option
    return (
        <div className="card w-64 lg:w-80 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-xl text-secondary font-bold text-center">{name}</h2>
                <p className="text-sm font-bold text-center">
                    {slots?.length > 0 ? slots[0] : 'Try Another day'}
                </p>
                <p className='text-center'>
                    {slots?.length} {slots.length > 1 ? 'spaces' : 'space'} Available
                </p>
                <p className='text-center font-bold'><small>Price : ${price}</small></p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(option)}
                        htmlFor="booking-modal"
                        className="btn btn-primary text-white"

                    >
                        Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;