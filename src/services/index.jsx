import axios from "axios";
let baseUrl = "https://najamt-server-final.vercel.app/api/v1/";
// let baseUrl = "http://192.168.100.28:5000/api/v1/"; 

const api = async (path, params, method,token) => {
    let options;
    options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization":token
        }, 
        method: method,
        ...(params && { data: JSON.stringify(params)}),  
    };
    return axios(baseUrl + path, options)
        .then((response) => {
            return response; 
        })
        .catch(async (error) => {
            return error.response;
        });
};

export default api;