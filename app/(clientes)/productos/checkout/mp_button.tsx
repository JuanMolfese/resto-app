"use client"
import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const MP_Button = () => {
    useEffect(() => {
      initMercadoPago('TEST-52801a87-1132-4877-afa8-03cd1c01c382', { locale: 'es-AR' });
    }, []);

    return (
      <div className='flex mt-[40%] flex-col items-center w-[85%]'>
        <Wallet initialization={{preferenceId: '<PREFERENCE_ID>'}} />
      </div>
    );
};

export default MP_Button;
        