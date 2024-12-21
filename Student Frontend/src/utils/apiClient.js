import axios from 'axios';

// Create an Axios instance with default configurations
const apiClient = axios.create({
    // The base URL for all requests made using this Axios instance
    baseURL: 'http://localhost:8088', 
    
    // Set default headers for all requests made by this instance
    headers: {
        'Content-Type': 'application/json', // The type of data being sent to the server (JSON)
        'Accept': 'application/json', // The type of data the client expects to receive from the server (JSON)
    },
});

// Set up an interceptor to modify the request before it is sent
apiClient.interceptors.request.use(
    // The request interceptor is executed before the request is sent to the server
    (config) => {
        // Retrieve the authentication token from localStorage
        const token = localStorage.getItem('token'); 
        
        // If a token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = token; // This header is typically used for Bearer tokens
        }

        // Return the modified config object so the request can be sent
        return config;
    },
    
    // The error interceptor handles any errors that occur during the request process
    (error) => {
        // Reject the promise with the error, allowing the caller to handle it
        return Promise.reject(error);
    }
);

// Export the Axios instance to be used in other parts of the application
export default apiClient;
