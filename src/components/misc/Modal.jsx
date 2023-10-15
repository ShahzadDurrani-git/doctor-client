    import React, { useRef, useState, useEffect } from "react";
    
import { createGroup, getGroupById, updateGroupData } from '../../api/api';  // Import the API functions
import { toast } from "react-toastify";


    const Modal = ({ isAdded, setIsAdded, isModalOpen, setIsModalOpen, updateGroup, setUpdateGroup}) => {

        const [groupName, setGroupName] = useState('');
        const [description, setDescription] = useState('')
        const [groupDetails, setGroupDetails] = useState(null);

        useEffect(() => {
            if(isModalOpen){
              if (updateGroup) {
              // Fetch group details by its ID
              getGroupById(updateGroup)
                .then((response) => {
                    setGroupName(response.data.groupDetails.groupName)
                    setDescription(response.data.groupDetails.description)
                  // console.log(response.data.groupDetails)
                })
                .catch((error) => {
                  console.error('Error fetching group details:', error);
                });
                setUpdateGroup('')
            }}
          }, [updateGroup]);

      const handleAddGroup = () => {
        if (!groupName || !description) {
          toast.error('Group Name and Description cannot be empty');
          return;
        }
        const data = {
          "groupName": groupName,
          "description": description
        }
        createGroup(data)
          .then((response) => {
            toast.success('Group Created Successfully');
            setGroupName('');
            closeModal();
          })
          .catch((error) => {
            toast.error('Unable to create the group');
            console.error('Error creating group:', error);
          });
      };


      const handleUpdateGroup = () => {
        if (!groupName || !description) {
          toast.error('Group Name and Description cannot be empty');
          return;
        }
      
        const data = {
          groupName,
          description,
        };
      
        // Assuming you have an updateGroup function in your API
        updateGroupData(updateGroup, data) // Replace `groupId` with the actual group ID
          .then((response) => {
            toast.success('Group Updated Successfully');
            setGroupName('');
            setDescription('');
            setUpdateGroup('')
            closeModal();
          })
          .catch((error) => {
            toast.error('Unable to update the group');
            console.error('Error updating group:', error);
          });
      };
      

      const closeModal = () => {
        setIsModalOpen(false);
        setGroupName('')
        setDescription('')
        setUpdateGroup('')
      };
  

    return (
        <>
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="modal bg-white p-6 rounded w-5/12 shadow-2xl" style={{ margin: '0 auto' }}>
            
            <div className="modal-content">
              <h2 className="font-medium mb-5 text-lg">Enter Group Details</h2>
              <div className="group-details">
              <div className="mb-4">
                <label className="block mb-2">Group Name:</label>
                <input
                  type="text"
                  value={groupName}
                  className="w-full border rounded p-2"
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                />
                </div>
                <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Description: 
        </label>
        <textarea
          className="appearance-none w-full border rounded p-2 h-40"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
              </div>
              <div className="modal-actions">
                {updateGroup? <button onClick={handleUpdateGroup} className="bg-blue-500 text-white px-4 py-2 rounded">Update Group</button> : <button onClick={handleAddGroup} className="bg-blue-500 text-white px-4 py-2 rounded">Save Group</button>}
                {/* <button onClick={handleAddGroup}>Save Group</button> */}
                <button onClick={closeModal} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
    );
    };

    export default Modal;
