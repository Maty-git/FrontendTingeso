import axios from "axios";

const TOOL_API_BASE_URL = "http://localhost:8090/api/tools";

export const listTools = () => axios.get(`${TOOL_API_BASE_URL}/all`);
export const createTool = (tool, rutUser) => {
    return axios.post(`${TOOL_API_BASE_URL}/${rutUser}`, tool);
};
export const getTools = () => axios.get(`${TOOL_API_BASE_URL}/tools`);
export const deleteTool = (id,rutUser) => axios.put(`${TOOL_API_BASE_URL}/${id}/${rutUser}`);
export const listToolsForRepair = () => axios.get(`${TOOL_API_BASE_URL}/for-repair`);
export const repairTool = (id,rutUser) => axios.put(`${TOOL_API_BASE_URL}/repairDebt/${id}/${rutUser}`);
export const repairToolNoDebt = (id,rutUser) => axios.put(`${TOOL_API_BASE_URL}/repair/${id}/${rutUser}`);
export const updateTool = (id, rutUser, tool) => axios.put(`${TOOL_API_BASE_URL}/update/${id}/${rutUser}`, tool);
export const getToolByNameAndCategory = (name, category) =>
  axios.get(`${TOOL_API_BASE_URL}/${name}/${category}`);

const KARDEX_API_BASE_URL = "http://localhost:8090/api/kardex";

export const getMovementsByTool = (toolId) =>
  axios.get(`${KARDEX_API_BASE_URL}/tool/${toolId}`);

export const getMovementsByToolAndDateRange = (toolId, startDate, endDate) => {
  return axios.get(`${KARDEX_API_BASE_URL}/tool/${toolId}/range`, {
    params: { startDate, endDate },
  });
};
