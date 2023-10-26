import React, { useEffect, useState } from "react";
import { getAllGroups } from '../../api/api'; 

function EmailGroupSelector({ selectedGroup, onSelectGroup }) {
  
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getAllGroups();
        setGroups(response);
        // console.log(response[0].id)
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Handle the error, display a message, or take appropriate action
      }
    };
  
    fetchGroups();
  }, []);
  return (
    <div className='relative mb-7'>
      <label htmlFor="groups" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Select Group</label>
      <select id="groups" value={selectedGroup} onChange={(e) => onSelectGroup(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.data.groupDetails.groupName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EmailGroupSelector;
