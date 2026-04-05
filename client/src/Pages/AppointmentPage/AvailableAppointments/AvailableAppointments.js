import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption/AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    //states
    const [treatment, setTreatment] = useState({})

    //formating date
    const date = format(selectedDate, 'PP')

    //query for loading data (process - 1)
    // const { data: appointments = [] } = useQuery({
    //     queryKey: ['appointmentOptions'],
    //     queryFn: () => fetch('https://doctors-portal-server-lyart-eight.vercel.app/appointmentOptions')
    //         .then(res => res.json())
    // })

    //query for loading data (process - 2)
    const { data: appointments = [], isLoading, refetch } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-lyart-eight.vercel.app/v2/appointmentOptions?date=${date}`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <section className='my-5 lg:my-10'>
            <div className='lg:my-20'>
                <p className='px-3 text-primary font-bold text-center'>
                    Available Appointments on {format(selectedDate, 'PP')}.
                </p>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {
                        appointments.map(option => <AppointmentOption
                            key={option._id}
                            option={option}
                            setTreatment={setTreatment}
                        ></AppointmentOption>)
                    }
                </div>
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;