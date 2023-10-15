import React, { useState } from 'react';
import Button from './Button';
import Modal from './Modal';

const Block = ({ isAdded, setIsAdded, isModalOpen, setIsModalOpen }) => {
 

 

  const openModal = () => {
    setIsModalOpen(true);
  };


  return (
    <div className="bg-white shadow-md sm:rounded-lg flex justify-end p-8">
      <div className="w-full flex gap-2 items-center">
      <div className="w-10/12"></div>
        <div className="w-2/12">
          <Button icon="/imgs/plus.png" onClick={openModal} text="Add Group" active />
        </div>
      </div>
    <Modal isAdded={isAdded} setIsAdded={setIsAdded} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      
    </div>
  );
};


export default Block;
