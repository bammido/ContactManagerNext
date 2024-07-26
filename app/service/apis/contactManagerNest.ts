import axios from "axios";

export const contactManagerNest = axios.create({
    // baseURL: "http://localhost:3333",
    baseURL: process.env.NEXT_PUBLIC_API_CONTACT_MANAGER_NEST,
    headers: {
        token: "",
        'Access-Control-Allow-Origin': '*'
    }
})
