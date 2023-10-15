import React, { useState, useEffect  } from 'react';
import { getAllGroups, addDoctorToGroup } from '../api/api';

const AddDoctor = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [doctorDetails, setDoctorDetails] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    clinicAddress: '',
    city: '',
    hospital: '',
  });
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch groups from your API
    getAllGroups()
      .then((data) => {
        setGroups(data); 
        console.log(data)
      })
      .catch((error) => console.error('Error fetching groups:', error));
  }, []);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctorDetails({
      ...doctorDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Doctor details:', doctorDetails);
    console.log('Selected group:', selectedGroup);
    addDoctorToGroup(selectedGroup, doctorDetails)
      .then((response) => {
        setSelectedGroup('')
        setDoctorDetails({
            name: '',
            designation: '',
            email: '',
            phone: '',
            clinicAddress: '',
            city: '',
            hospital: '',
          });
        console.log('Doctor added successfully:', response);
      })
      .catch((error) => {
        console.error('Error adding doctor:', error);
      });
  };

  return (
    <div>
      <h1>Add Doctor</h1>
      <div>
        <label htmlFor="group">Select Group:</label>
        <select id="group" name="group" value={selectedGroup} onChange={handleGroupChange}>
          <option value="">Select a group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.data.groupDetails.groupName}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={doctorDetails.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="designation">Designation:</label>
          <input type="text" id="designation" name="designation" value={doctorDetails.designation} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={doctorDetails.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={doctorDetails.phone} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="clinicAddress">Clinic Address:</label>
          <input type="text" id="clinicAddress" name="clinicAddress" value={doctorDetails.clinicAddress} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={doctorDetails.city} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="hospital">Hospital:</label>
          <input type="text" id="hospital" name="hospital" value={doctorDetails.hospital} onChange={handleInputChange} />
        </div>
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
