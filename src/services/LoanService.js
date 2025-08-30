import axios from "axios";

const TOOL_API_BASE_URL = "http://localhost:8080/api/Loans";

export const createLoan = (loan) => axios.post(`${TOOL_API_BASE_URL}/save`, loan);