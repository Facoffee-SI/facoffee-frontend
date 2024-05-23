import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NzZlOWUyOC0xOTBiLTExZWYtODIxMy0wMjQyYWMxNjAwMDIiLCJpYXQiOjE3MTY0NzIzMjB9.Tfs7qxRDgH_IuZPkpdAfGB141Smu_7d42MY1FZqFQQs";

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