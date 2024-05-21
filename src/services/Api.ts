import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZjg4MjdiNi0xNDU2LTExZWYtYThmNS0wMjQyYWMxNjAwMDIiLCJpYXQiOjE3MTU5ODU2NDV9.9tUQPD4MmUUmS5N8vvGHNHzkBL8yN8W-QE63QENzzg8";

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '',
        'Access-Control-Expose-Headers': '*',
    },

});

export default api;