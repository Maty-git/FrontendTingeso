import axios from "axios";

const TOOL_API_BASE_URL = "http://localhost:8090/api/loans";

export const createLoan = (loan) => axios.post(`${TOOL_API_BASE_URL}/save`, loan);
export const allLoans = () => axios.get(`${TOOL_API_BASE_URL}/all`);
export const getLoanById = (id) => axios.get(`${TOOL_API_BASE_URL}/${id}`);
export const returnLoan = (id,user,bool) => axios.put(`${TOOL_API_BASE_URL}/return/${id}/${user}/${bool}`);

export const listActiveLoans = () => axios.get(`${TOOL_API_BASE_URL}/active`);

export const listActiveLoansByDateRange = (startDate, endDate) =>
  axios.get(`${TOOL_API_BASE_URL}/active/range`, {
    params: { startDate, endDate },
  });

  export const listMostLoanedTools = () => axios.get(`${TOOL_API_BASE_URL}/ranking`);

  export const listMostLoanedToolsByDateRange = (startDate, endDate) =>
  axios.get(`${TOOL_API_BASE_URL}/ranking/range`, {
    params: { startDate, endDate },
  });

