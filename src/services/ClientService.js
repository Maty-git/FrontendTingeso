import axios from "axios";

const TOOL_API_BASE_URL = "http://localhost:8080/api/clients";

export const listClients = () => axios.get(`${TOOL_API_BASE_URL}/all`);
export const createClient = (client) => axios.post(`${TOOL_API_BASE_URL}/save`, client);
export const getAllRuts = () => axios.get(`${TOOL_API_BASE_URL}/rutsClients`);