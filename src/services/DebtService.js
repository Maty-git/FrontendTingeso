import axios from "axios";

const TOOL_API_BASE_URL = "http://localhost:8090/api/Debts";

export const getDebtByLoanId = (loanId) => axios.get(`${TOOL_API_BASE_URL}/${loanId}`);
export const getAllDebts = () => {
    return axios.get(`${TOOL_API_BASE_URL}/all`);
}
export const listUnpaidDebts = () => axios.get(`${TOOL_API_BASE_URL}/unpaid`);

export const payDebt = (id) => axios.put(`${TOOL_API_BASE_URL}/pay/${id}`);
export const listClientsWithLateDebts = () => axios.get(`${TOOL_API_BASE_URL}/late`);
export const listClientsWithLateDebtsByDateRange = (startDate, endDate) =>
  axios.get(`${TOOL_API_BASE_URL}/late/range`, {
    params: { startDate, endDate },
  });
