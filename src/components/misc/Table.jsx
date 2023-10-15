import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup, deleteGroup, getAllGroups } from '../../api/api';  // Update this with your actual API functions
import 'font-awesome/css/font-awesome.min.css';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";


const Table = ({ isAdded, setIsAdded ,isModalOpen,setIsModalOpen }) => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [updateGroup, setUpdateGroup] = useState('');
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getAllGroups();
        setGroups(response);
        console.log(response)
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Handle the error, display a message, or take appropriate action
      }
    };
  
    fetchGroups();
  }, [isAdded]);

  const handleGroupDetails = (groupId) => {
    navigate(`/group-details/${groupId}`);
  };

  const handleUpdateGroup = (groupId) => {
    setIsModalOpen(true);
    setUpdateGroup(groupId)
  }

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      toast.success('Group deleted successfully')
  
      // Fetch updated groups after deletion
      const response = await getAllGroups();
      setGroups(response);
    } catch (error) {
      toast.error('Unable to delete the group')
    }
  };

  return (
    <div>
      <Modal isAdded={isAdded} setIsAdded={setIsAdded} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} updateGroup={updateGroup} setUpdateGroup={setUpdateGroup}/>
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Group Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Last Time/Date Sent
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {groups?.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item?._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.data?.groupDetails?.groupName}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${item?.status === 'sent' ? 'text-green-500' : item?.status === 'failed' ? 'text-red-500' : ''}`}>
                  {item?.status === 'sent' ? 'Success' : item?.status === 'failed' ? 'Failed' : 'Idle'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.lastSentAt ? item?.lastSentAt : 'Not Attempted'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleGroupDetails(item?.id)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Details
                  </button>
                  <button onClick={() => handleUpdateGroup(item?.id)} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                    Update
                  </button>
                  <button onClick={() => handleDeleteGroup(item?.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
