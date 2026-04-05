import React from 'react';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import './ContactUs.css'
const ContactUs = () => {
    return (
        <section className='bgContactImg py-5 lg:py-10 my-10 rounded-md'>
            <div className='text-center my-5'>
                <p className='text-sm lg:text-lg text-primary font-bold'>Contact Us</p>
                <h1 className='text-lg lg:text-3xl text-white'>Stay connected with us</h1>
            </div>
            <div className='lg:w-1/3 mx-auto px-2'>
                <form>
                    <div className="mb-1 sm:mb-2">
                        <input
                            placeholder="E-mail"
                            required
                            type="email"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            id="firstName"
                            name="Email"
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <input
                            placeholder="Subject"
                            required
                            type="text"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            id="Subject"
                            name="Subject"
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <textarea
                            placeholder=""
                            required
                            type="text"
                            className="flex-grow w-full h-24 px-4 py-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            id="Subject"
                            name="Subject">
                        </textarea>
                    </div>
                    <div className="flex justify-center mt-4 mb-2 sm:mb-4">
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactUs;