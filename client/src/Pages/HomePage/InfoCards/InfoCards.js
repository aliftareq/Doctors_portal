import React from 'react';
import Card from '../Card/Card';
import clockIcon from '../../../assets/icons/clock.svg'
import markIcon from '../../../assets/icons/marker.svg'
import phoneIcon from '../../../assets/icons/phone.svg'

const InfoCards = () => {
    const cardDatas = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'open 9.00 am to 5.00 pm everyday',
            icon: clockIcon,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            name: 'Visit our Loacation',
            description: 'Room-034 ward-2, North Building, Square Hospital',
            icon: markIcon,
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            name: 'Contact us Now',
            description: '000 - 123 14521',
            icon: phoneIcon,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
    ]
    return (
        <div className='flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 px-3 my-5'>
                {
                    cardDatas.map(cardData => <Card key={cardData.id} cardData={cardData}></Card>)
                }
            </div>
        </div>

    );
};

export default InfoCards;