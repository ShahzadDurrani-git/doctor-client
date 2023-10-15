import React, { useEffect, useState } from 'react';
import { fetchDoctorById, addDoctorToGroup, updateDoctorById} from '../../api/api';

const AddDoctorModal = ({   isAdded, setIsAdded , isModalOpen, setIsModalOpen, updateDoctor, currentGroup}) => {
  const [doctorDetails, setDoctorDetails] = useState({
    clinicAddress: '',
    phone: '',
    city: '',
    name: '',
    designation: '',
    hospital: '',
    email: '',
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await updateDoctorById(currentGroup, updateDoctor, doctorDetails);
    console.log(response);
    setIsAdded('Success: Doctor updated Successfully');
    setDoctorDetails({
      clinicAddress: '',
      phone: '',
      city: '',
      name: '',
      designation: '',
      hospital: '',
      email: '',
    });
  } catch (error) {
    setIsAdded('Error: Unable to update doctor');
    console.log(error);
  }
  setIsModalOpen();
};
const handleCancel = () => {
  setDoctorDetails({
    clinicAddress: '',
    phone: '',
    city: '',
    name: '',
    designation: '',
    hospital: '',
    email: '',
  });
  setIsModalOpen();
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addDoctorToGroup(currentGroup, doctorDetails);
    setIsAdded('Success: Doctor Created Successfully');
    setDoctorDetails({
      clinicAddress: '',
      phone: '',
      city: '',
      name: '',
      designation: '',
      hospital: '',
      email: '',
    });
  } catch (error) {
    setIsAdded('Error: Unable to create doctor');
    console.log(error);
  }
  setIsModalOpen();
};

// const handleSubmit =  (e) => {
//     e.preventDefault();
    
//     console.log('isAdded prop inside AddDoctorModal:', isAdded);
//   console.log('setIsAdded prop inside AddDoctorModal:', setIsAdded);
//       // try{
//       //   const response  = await addDoctorToGroup(currentGroup, doctorDetails );
//       //   setIsAdded('Success: Group Created Successfully');
//       //   console.log(response)
//       //   setDoctorDetails({
//       //     clinicAddress: '',
//       //     phone: '',
//       //     city: '',
//       //     name: '',
//       //     designation: '',
//       //     hospital: '',
//       //     email: '',
//       //   });
//       // }catch(error){
//       //   console.log(error);
//       // }
//       addDoctorToGroup(currentGroup, doctorDetails )
//           .then((response) => {
//             // setIsAdded('Success: Doctor added Successfully');
//             setDoctorDetails({
//               clinicAddress: '',
//               phone: '',
//               city: '',
//               name: '',
//               designation: '',
//               hospital: '',
//               email: '',
//             });
//             setIsModalOpen();
//           })
//           .catch((error) => {
//             // setIsAdded('Error: Unable to add doctor');
//             console.error('Error creating group:', error);
//           });
    
//   };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetchDoctorById(updateDoctor, currentGroup);
          // console.log('RESPONSE DETAILS:::::::',updateDoctor,response)  
          setDoctorDetails({
            clinicAddress: response.doctor.doctorDetails.clinicAddress,
            phone: response.doctor.doctorDetails.phone,
            city: response.doctor.doctorDetails.city,
            name: response.doctor.doctorDetails.name,
            designation: response.doctor.doctorDetails.designation,
            hospital: response.doctor.doctorDetails.hospital,
            email: response.doctor.doctorDetails.email,
          })
            // console.log(response.data.groupDetails)
          }catch(error) 
          {
          console.error('Error fetching group details:', error);
          };
    }


    if(isModalOpen){
      if(updateDoctor){
        fetchDoctor();
      }
    }
    
  },[isModalOpen])

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isModalOpen ? 'visible' : 'invisible'
      }`}
    >
      <div className="modal-container bg-white rounded p-20 w-7/12 shadow-2xl">
        <div className="modal-content">
          <h2 className="text-2xl mb-4">Add Doctor</h2>
          <form onSubmit={updateDoctor ? handleUpdate: handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={doctorDetails.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex">
              <div className='w-6/12 mr-5'>
              <label className="block mb-2" htmlFor="designation">
                Designation:
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={doctorDetails.designation}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              </div>
              <div className='w-6/12'>
              <label className="block mb-2" htmlFor="hospital">
                Hospital:
              </label>
              <input
                type="text"
                id="hospital"
                name="hospital"
                value={doctorDetails.hospital}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              </div>
              
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="clinicAddress">
                Clinic Address:
              </label>
              <input
                type="text"
                id="clinicAddress"
                name="clinicAddress"
                value={doctorDetails.clinicAddress}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4 flex">
            <div className='w-6/12 mr-5'>
              <label className="block mb-2" htmlFor="city">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={doctorDetails.city}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
            </div>
            <div className='w-6/12'>
              <label className="block mb-2" htmlFor="phone">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={doctorDetails.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
            </div>
              
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={doctorDetails.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorModal;
