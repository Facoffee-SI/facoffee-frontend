import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMzA5YTdhZC0xODgyLTExZWYtOTY5MC0wMjQyYWMxNjAwMDIiLCJpYXQiOjE3MTY0MTM1NTh9.hsh4myK03FrwkJ4lIFuERQcJu-gNLn6Bi4XhUoYAUYk";

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