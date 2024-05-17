import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYTdiNTRkMi02NGRlLTQ0NmQtYjFjMy1lYzFhYjEyNGQxYjUiLCJpYXQiOjE3MTM1Njc1MTl9.xJWtZpD1aPKpl8fM8CTmhucQwh4WfOAPCjNlNcB6nNQ";

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