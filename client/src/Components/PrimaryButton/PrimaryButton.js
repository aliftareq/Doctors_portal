import React from 'react';

const primaryButton = ({ children }) => {
    return (
        <button className="btn text-white font-bold border-none bg-gradient-to-r from-primary to-secondary">
            {children}
        </button>
    );
};

export default primaryButton;