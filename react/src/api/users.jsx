import axiosClient from '../axios-client';

export const fetchUsers = async (page, search) => {
    if(search){
        const response = await axiosClient.get('/users/search', {
          params: { query: search }
        });
        return response.data;
    }
    const response = await axiosClient.get(`/users?page=${page}`);
    return response.data;
}

export const deleteUser = async (userId) => {
    const response = await axiosClient.delete(`/users/${userId}`)
    return response 
}

export const fetchUser = async (id) => {
    const response = await axiosClient.get(`/users/${id}`)
    return response.data
}

export const updateUser = async (updatedUser) => {
    const response = await axiosClient.put(`/users/${updatedUser.id}`,updatedUser)
    return response
}

export const createUser = async (payload) => {
    const response = await axiosClient.post('/users', payload)
    return response
}