import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost/credpago/public/api",
	// baseURL: "https://api.leap.art.br/api",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
