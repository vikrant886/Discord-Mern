import React from 'react';

const Confirm = ({ text, onConfirm, onDecline }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className='p-8 bg-gray-800 rounded'>
                <div className='flex flex-col'>
                    <div className='w-full h-auto text-white font-semibold'>
                        {text}
                    </div>
                    <div className='flex gap-8 mt-4'>
                        <button onClick={onConfirm} className='w-24 h-auto p-2 border border-text-one bg-green-600 text-white rounded'>Confirm</button>
                        <button onClick={onDecline} className='w-24 h-auto p-2 border border-text-one bg-red-600 text-white rounded'>Decline</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirm;
