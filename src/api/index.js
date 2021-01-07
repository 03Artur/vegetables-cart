import axios from 'axios';

const config = {
    baseURL: 'http://localhost:8080'
}

const httpClient = axios.create(config);

export const getAllProducts = () => httpClient.get('/products')
