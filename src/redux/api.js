// Base URL for the json-server API
const API_URL = "https://json-server-api-q84y.onrender.com";

// Generic API functions
export const fetchData = async (endpoint) => {
	const response = await fetch(`${API_URL}/${endpoint}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${endpoint}`);
	}
	return response.json();
};

export const createItem = async (endpoint, data) => {
	const response = await fetch(`${API_URL}/${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error(`Failed to create ${endpoint}`);
	}
	return response.json();
};

export const updateItem = async (endpoint, id, data) => {
	const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error(`Failed to update ${endpoint} with id ${id}`);
	}
	return response.json();
};

export const deleteItem = async (endpoint, id) => {
	const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
		method: "DELETE",
	});
	if (!response.ok) {
		throw new Error(`Failed to delete ${endpoint} with id ${id}`);
	}
	return response.json();
};
