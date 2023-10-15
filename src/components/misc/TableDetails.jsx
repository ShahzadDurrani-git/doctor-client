import React, { useEffect, useState } from 'react';
// import Modal from './Modal';
import DeleteModal from './DeleteModal'
import { useParams } from 'react-router-dom';
import AddDoctorModal from './AddDoctorModal';
import {deleteDoctor, getAllGroups } from '../../api/api';
import { toast } from "react-toastify";

const TableDetail = ({isAdded, setIsAdded ,isModalOpen, setIsModalOpen, fromDate, toDate, filterData, setFilterData, doctors,setDoctors, updateDoctor, setUpdateDoctor}) => {
  
  const { id } = useParams();
  const [allGroups, setAllGroups] = useState([]);
  const [currGroup, setCurrGroup] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currDoctor, setCurrDoctor] = useState({
    id: null,
    name: null
  })


  const handleUpdateDoctor = async (doctorId) => {
    setIsModalOpen(true);
    setUpdateDoctor(doctorId)
    console.log('Received doctorId:', doctorId);
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getAllGroups();
        setAllGroups(response);
        // console.log(response)
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Handle the error, display a message, or take appropriate action
      }
    };
  
    fetchGroups();
    // fetchDoctors();
  }, [id]);

  useEffect(() => {
    allGroups?.forEach((itm) => {
      if (itm.id === id) {
        setCurrGroup(itm?.data?.groupDetails?.groupName);
      }
    });
  }, [allGroups, id]);
  
  useEffect(()=> {
  },[filterData])

  const handleDeleteDoctor = async (doctorId, doctorName) => {
    try {
      await deleteDoctor(id,doctorId);
      // Perform any additional actions after successfully deleting the doctor
      toast.success(`${doctorName} has been deleted successfully.`);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };
  const handleDoctorDeletion = () => {
    setConfirmDelete(true)
  }
  const handleDeleteClick = (doctorId, doctorName) => {
    setCurrDoctor({
      id: doctorId,
      name:doctorName
    })
    setOpenDelete(true);
  };
  const handleDeleteModalClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    if(confirmDelete) {
    handleDeleteDoctor(currDoctor.id, currDoctor.name)
    setConfirmDelete(false)
    setOpenDelete(false);
  }
  },[confirmDelete])

  

  return (
    <div>
    {isAdded && (
        <div className={`p-2 mt-4 ease-linear rounded ${isAdded.includes('Error') ? 'bg-red-500' : 'bg-green-500'} opacity-75`}>
          <span className="close" onClick={() => setIsAdded('')}>
            &times;
          </span>
          <div className="text-white">
            {isAdded}
          </div>
        </div>
      )}
      <div style={{ width: '100%' }} className="py-5 flex gap-5">
        <h1>Group Name:</h1>
        <p>{currGroup}</p>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name/ Designation
              </th>
              <th scope="col" className="px-6 py-3">
                Hospital
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Contact No.
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Adresses
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((doctor, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <div className="pl-3">
                      <div className="text-base font-semibold">{doctor.data.doctorDetails.name}</div>
                      <div>{doctor.data.doctorDetails.designation}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{doctor.data.doctorDetails.hospital}</td>
                <td className="px-6 py-4 text-center">{doctor.data.doctorDetails.city}</td>
                <td className="px-6 py-4 text-center">{doctor.data.doctorDetails.phone}</td>
                <td className="px-6 py-4 text-center">{doctor.data.doctorDetails.email}</td>
                <td className="px-6 py-4 text-center">{doctor.data.doctorDetails.clinicAddress}</td>
                <td className="px-6 py-4 text-center">
                <button onClick={() => handleUpdateDoctor(doctor.id)} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                    Update
                  </button>
                  <button onClick={() => handleDeleteClick(doctor.id,doctor.data.doctorDetails.name)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal show={openDelete} onClose={handleDeleteModalClose} onConfirm={handleDoctorDeletion} doctor={currDoctor} />
      <AddDoctorModal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(false)}
        updateDoctor={updateDoctor}
        currentGroup={id}
        isAdded={isAdded}
        setIsAdded={setIsAdded}
        /* Add any other required props for the modal */
      />
    </div>
  );
};

export default TableDetail;
