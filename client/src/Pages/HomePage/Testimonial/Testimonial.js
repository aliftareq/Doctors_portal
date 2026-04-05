import React from 'react';
import testiIcon from '../../../assets/icons/quote.svg'
import Person1 from '../../../assets/images/people1.png'
import Person2 from '../../../assets/images/people2.png'
import Person3 from '../../../assets/images/people3.png'
import SingelReview from '../SingleReview/SingelReview';


const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            name: 'Winson Herry',
            location: 'California',
            speech: 'It was a very good experience taking their service.',
            img: Person1,
        },
        {
            id: 2,
            name: 'Kyle Jennifer',
            location: 'Massachusets',
            speech: 'It was a very good experience taking their service.',
            img: Person2,
        },
        {
            id: 3,
            name: 'Alisha',
            location: 'los Angels',
            speech: 'It was a very good experience taking their service.',
            img: Person3,
        },
    ]
    return (
        <section className='my-6 lg:my-12'>
            <div className='flex justify-between items-center mx-2 lg:mx-5'>
                <div>
                    <p className='text-primary font-semibold text-xs lg:text-lg'>Testimonial</p>
                    <h1 className='text-sm lg:text-3xl font-bold'>What Our Patient Says</h1>
                </div>
                <figure>
                    <img className='h-16 lg:h-32' src={testiIcon} alt="" />
                </figure>
            </div>
            <div className='flex justify-center mx-2 lg:mx-5'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4'>
                    {
                        reviews.map(review => <SingelReview key={review.id} review={review}></SingelReview>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Testimonial;