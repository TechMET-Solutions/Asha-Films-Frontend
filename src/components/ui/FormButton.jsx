import React from 'react';

const Button = ({ label = "Click Me", type = "button", onClick, className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-primary text-white px-8 py-3 rounded-full ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;
