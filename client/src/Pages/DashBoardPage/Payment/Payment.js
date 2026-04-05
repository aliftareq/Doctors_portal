import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import CheckOutForm from './CheckOutForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    //hooks
    const booking = useLoaderData()
    // const navigation = useNavigation()

    //destructured data
    const { Treatment, appointmentDate, slot, price } = booking

    //loader based on state
    // if (navigation.state === 'loading') {
    //     return <LoadingSpinner></LoadingSpinner>
    // }
    return (
        <div className='mx-10'>
            <div>
                <h1 className='text-lg lg:text-3xl font-bold'>Payment for {Treatment}</h1>
                <p className='text-sm lg:text-xl mt-5'>
                    Please Pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}
                </p>
            </div>
            <div className='border boreder-2 border-green-400 w-64 lg:w-96 p-5 my-5'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;