import React from 'react';
import Button from './Button';

const DeleteModal = ({ show, onClose, onConfirm, doctor }) => {
  if (!show) return null;

  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="modal bg-white p-6 rounded w-5/12 shadow-2xl" style={{ margin: '0 auto' }}>
      <div className="modal-content text-lg text-red-700 font-bold">
        <p>Are you sure you want to delete this doctor?</p>
        <div className='w-full flex mt-10'>
            <div className='w-6/12 text-center'><Button text="Cancel" center={true} active onClick={onClose} /></div>
            <div className='w-6/12'><Button text="Confirm" center={true} onClick={onConfirm} /></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DeleteModal;
