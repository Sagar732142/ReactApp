import axios from "axios";

export const api = axios.create({
    baseURL: "https://vtkxfvbp-3000.inc1.devtunnels.ms",
    withCredentials: true,
});