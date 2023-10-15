import axios from 'axios';

const apiUrl = 'http://localhost:9000'; // Update with your server URL

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDoctorsForGroup = async (groupId) => {
  try {
    const response = await api.get(`/groups/${groupId}/doctors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDoctorById = async (doctorId, groupId) => {
  try {
    const response = await axios.get(`${apiUrl}/doctors`, {
      params: {
        doctorId,
        groupId,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error fetching doctor:', error);
  }
};

export const addDoctorToGroup = async (groupId, doctorData) => {
  try {
    const response = await api.post(`/groups/${groupId}/doctors`, doctorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllGroups = async () => {
  try {
    const response = await api.get('/groups');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGroupById = async (groupId) => {
  try {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDoctorById = async (currGroup, doctorId, updatedDoctorData) => {
  try {
    console.log(currGroup)
    const response = await api.put(`/doctors/${currGroup}/${doctorId}`, updatedDoctorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDoctor = async (currGroup,doctorId) => {
  try {
    const response = await api.delete(`/doctors/${currGroup}/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGroup = async (newGroupData) => {
  try {
    const response = await api.post('/groups', newGroupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroupData = async (groupId, updatedGroupData) => {
  try {
    const response = await api.put(`/groups/${groupId}`, updatedGroupData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await api.delete(`/groups/${groupId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendEmailToGroup = async (groupId, subject, message) => {
  try {
    const response = await api.post(`/groups/${groupId}/send-email`, { subject, message });
    return response.data;
  } catch (error) {
    throw error;
  }
};
