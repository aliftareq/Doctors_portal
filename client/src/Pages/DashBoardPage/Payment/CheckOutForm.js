import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ booking }) => {
    //states
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('');

    //hooks
    const stripe = useStripe()
    const elements = useElements();

    //booking data
    const { price, email, Patientname, _id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-lyart-eight.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('patient-token')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                //console.log(data.clientSecret);
                setClientSecret(data.clientSecret)
            });
    }, [price]);

    //handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        // if Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
        if (!stripe || !elements) {
            return;
        }


        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // creating payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        //error for create payment 
        if (error) {
            console.log(error);
            setCardError(error.message)
        }
        else {
            setCardError('')
        }

        setSuccess('')
        setProcessing(true)
        //creating confirmCardPayment method
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: Patientname,
                        email: email
                    },
                },
            },
        );

        //error for confirmCardPayment
        if (confirmError) {
            setCardError(confirmError.message)
            return
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card Info', card);
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }

            //store Payment info in database
            fetch('https://doctors-portal-server-lyart-eight.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('patient-token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! Your Payment completed')
                        setTransactionId(paymentIntent.id)
                    }
                })
        }
        setProcessing(false)
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm btn-primary mt-4'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <div>
                <p className="text-lg text-rose-600">{cardError}</p>
            </div>
            {
                success &&
                <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your TransactionId is : <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </section>
    );
};

export default CheckOutForm;