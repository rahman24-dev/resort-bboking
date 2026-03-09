import axios from "axios";

const API = axios.create({
    baseURL:"https://api.natureheavenholidays.com"
});

export default API;