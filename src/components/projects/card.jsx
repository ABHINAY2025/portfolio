import React from 'react';

const CardStack = () => {
  return (
    <div className="relative h-screen flex justify-center items-center bg-gray-100">
      <div className="relative" style={{ perspective: '1000px' }}>
        <div className="absolute transform-gpu rotate-y-[-15deg] translate-z-[0px] z-10 w-48 h-64 md:w-60 md:h-80 bg-white shadow-lg">
          {/* Content of Card 1 */}
          <img src="/path/to/image1.jpg" alt="Card 1" className="w-full h-full object-cover" />
        </div>
        <div className="absolute transform-gpu rotate-y-[-15deg] translate-z-[150px] z-9 w-48 h-64 md:w-60 md:h-80 bg-white shadow-lg">
          {/* Content of Card 2 */}
          <img src="/path/to/image2.jpg" alt="Card 2" className="w-full h-full object-cover" />
        </div>
        <div className="absolute transform-gpu rotate-y-[-15deg] translate-z-[300px] z-8 w-48 h-64 md:w-60 md:h-80 bg-white shadow-lg">
          {/* Content of Card 3 */}
          <img src="/path/to/image3.jpg" alt="Card 3" className="w-full h-full object-cover" />
        </div>
        <div className="absolute transform-gpu rotate-y-[-15deg] translate-z-[450px] z-7 w-48 h-64 md:w-60 md:h-80 bg-white shadow-lg">
          {/* Content of Card 4 */}
          <img src="/path/to/image4.jpg" alt="Card 4" className="w-full h-full object-cover" />
        </div>
        {/* Add more cards if needed */}
      </div>
    </div>
  );
};

export default CardStack;
