import React, { useState } from 'react';

function Coin({ totalCurrency, setTotalCurrency }) {
    const [transform, setTransform] = useState('');

    const handleClick = (e) => {
        setTotalCurrency(prevCurrency => prevCurrency + 1); // Increment currency
        handleAnimation(e);
    };

    const handleAnimation = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const angleX = (deltaY / rect.height) * 75;
        const angleY = -(deltaX / rect.width) * 75;

        setTransform(`rotateX(${angleX}deg) rotateY(${angleY}deg)`);
        setTimeout(() => {
            setTransform('');
        }, 100); // Reset transform after 100ms
    };

    return (
        <div
            id="coin"
            className="coin"
            onClick={handleClick}
            style={{ transform: transform, backgroundColor: '#B87333' }} // Default to bronze
        >
        </div>
    );
}

export default Coin;
