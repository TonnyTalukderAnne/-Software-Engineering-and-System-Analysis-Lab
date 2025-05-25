import axiosClient from '../config/axios';

// Gets the currently logged-in seller's data from localStorage
export const getCurrentSeller = () => JSON.parse(localStorage.getItem('userData'));

// Returns a promise with all clients filtered by seller ID
export const getClients = (sellerId) => {
    return axiosClient.get(`/users?role=client&sellerId=${sellerId}`);
};

// Status options for orders
export const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'canceled', label: 'Canceled' },
];
