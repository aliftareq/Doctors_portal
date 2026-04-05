import React from 'react';
import img from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    //footer for picked date
    let footer = <p>Please pick a day.</p>;
    if (selectedDate) {
        footer = <p>You picked {format(selectedDate, 'PP')}.</p>;
    }
    return (
        <header className="bgImg px-4 py-6 md:py-10 lg:py-16">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={img} className="mb-4 md:mb-0 w-4/5 lg:w-1/2 rounded-lg shadow-xl" alt='h-img' />
                <div className='lg:w-1/2 lg:ml-20'>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        footer={footer}
                    />
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;