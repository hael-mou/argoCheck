import axios from "axios";

export const api = axios.create({
    baseURL: "http://137.184.98.100:8000/api",
});
