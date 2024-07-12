import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const getAllProducts = () => {
    return axios.get(API_URL);
};

export const addProduct = (product) => {
    return axios.post(API_URL, product);
};
