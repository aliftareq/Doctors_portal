import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name, slots, price } = treatment //here treatment is appointment option
    const date = format(selectedDate, 'PP')

    //context values
    const { user } = useContext(AuthContext)

    //handlers
    const handleBooking = (e) => {
        e.preventDefault()
        const form = e.target
        const slot = form.slot.value
        const Patientname = form.name.value
        const phone = form.phone.value
        const email = form.email.value

        const booking = {
            appointmentDate: date,
            Patientname,
            phone,
            email,
            Treatment: name,
            slot,
            price
        }
        // console.log(date, name, email, phone, slot);
        console.log(booking);

        //sending data to server
        fetch(`https://doctors-portal-server-lyart-eight.vercel.app/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Your appointment Booked Successfully')

                }
                else {
                    toast.warn(data.message)
                }
                setTreatment(null)
                refetch()
            })

        //reseting form and closing modal
        form.reset()

    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <div className=''>
                        <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10' >
                            <input type="text" value={date} className="input input-bordered w-full font-semibold" disabled />
                            <select name='slot' className="select select-bordered w-full" required>
                                {
                                    slots?.map((slot, idx) => <option key={idx} value={slot}>{slot}</option>)
                                }
                            </select>
                            <input name='name' type="text" defaultValue={user?.displayName} placeholder="Full Name" className="input input-bordered w-full" disabled />
                            <input name='email' type="email" defaultValue={user?.email} className="input input-bordered w-full" disabled />
                            <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
                            <br />
                            <input type="submit" value="Submit" className="btn btn-accent input w-full" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingModal;