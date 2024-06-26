import React, { useEffect } from 'react';

const Success = () => {
  useEffect(() => {
    // Delete 'cart' item from localStorage when the component mounts
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Success</h1>
      <div className="max-w-lg text-center">
        <p className="mb-4">Your payment was successful</p>
      </div>
    </div>
  );
};

export default Success;
