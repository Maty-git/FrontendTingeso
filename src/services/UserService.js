import axios from "axios";

const TOOL_API_BASE_URL = "http://localhost:8080/api/users";

export const createUser = (user) => axios.post(`${TOOL_API_BASE_URL}/save`, user);