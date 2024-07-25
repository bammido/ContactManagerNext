import axios from "axios";

export const contactManagerNest = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        token: "",
        'Access-Control-Allow-Origin': '*'
    }
})