import axios from "axios";

const TOOL_API_BASE_URL = "http://localhost:8080/api/tools";

export const listTools = () => axios.get(`${TOOL_API_BASE_URL}/all`);
export const createTool = (tool) => axios.post(`${TOOL_API_BASE_URL}/`, tool);