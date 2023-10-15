import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import Button from './Button';
import AddDoctorModal from './AddDoctorModal';
import { getDoctorsForGroup} from '../../api/api'; // Import the modal component for adding doctors

const Block = ({
  filterData,
  setFilterData,
  doctors,
  setDoctors,
  isModalOpen, setIsModalOpen,
  updateDoctor, setUpdateDoctor,
  isAdded, setIsAdded
}) => {
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const { id } = useParams();

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleAddGroup = async () => {
    setIsModalOpen(true);
    setUpdateDoctor('')
  }

  const handleSearchValueChange = (e) => {
    if(!e.target.value){
      setFilterData(doctors)
    }else{
      setSearchValue(e.target.value);
    }
  };

  const handleFilter = () => {
    let filteredResults = [];

   
    if (searchValue) {
      switch (searchType) {
        case 'name':
          filteredResults = doctors?.filter(
            (item) => {
              const itemName = item.data.doctorDetails.name.toLowerCase();
              return itemName.includes(searchValue.toLowerCase());
            }
          );
          break;
        case 'city':
          filteredResults = doctors?.filter(
            (item) => {
              const itemName = item.data.doctorDetails.city.toLowerCase();
              return itemName.includes(searchValue.toLowerCase());
            }
          );
          break;
        case 'hospital':
          filteredResults = doctors?.filter(
            (item) => {
              const itemName = item.data.doctorDetails.hospital.toLowerCase();
              return itemName.includes(searchValue.toLowerCase());
            }
          );
          break;
        default:
          filteredResults = doctors;
          break;
      }
    } else {
      filteredResults = doctors;
    }
    console.log(filteredResults)
    setFilterData(filteredResults);
  };

  useEffect(() => {
    console.log(isAdded)
  },[])
  useEffect(() => {
    // Fetch doctor details for the group
    const fetchDoctors = async () => {
      try {
        const doctorData = await getDoctorsForGroup(id);
        setDoctors(doctorData);
        setFilterData(doctorData)
        // console.log(doctorData)
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctors();
    // console.log(doctors);
  }, [id, isAdded]);

  return (
    <div className="bg-white shadow-md sm:rounded-lg flex justify-center p-8 flex-wrap gap-3">
      

      {/* Filter options */}
      <div className="flex gap-2 w-9/12 items-center">
        <div className="w-6/12">
          <input
            type="text"
            placeholder="Search Value"
            value={searchValue}
            onChange={handleSearchValueChange}
            className="group--block--input rounded"
          />
        </div>
        <p className='font-medium'>By</p>
        <div className="w-6/12">
          <select
            value={searchType}
            onChange={handleSearchTypeChange}
            className="group--block--input rounded"
          >
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="hospital">Hospital</option>
          </select>
        </div>
        <div className="w-3/12">
          <Button text="Filter" active onClick={handleFilter} />
            
        </div>

      {/* Rest of the component content */}

      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute top-2 left-50" role="alert">
          <span className="font-medium">Danger alert!</span> {errorMessage}
        </div>
      )}
    </div>
    <div className="w-2/12 ml-10">
        <Button text="+ Add Doctor" active onClick={handleAddGroup} />
      </div>

      <AddDoctorModal
       isAdded={isAdded}
       setIsAdded={setIsAdded}
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(false)} 
        /* Add any other required props for the modal */
      />
    </div>
  );
};

export default Block;
