const API_BASE_URL = "https://quackthon2025.onrender.com";

class ApiClient {
  static async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Request failed");
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  static async get(endpoint) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient;
