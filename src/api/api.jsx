import axios from "axios";

// Используем переменную окружения для API URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api"; // fallback на локальный API

// Аутентификация
export const login = async (phone, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { phone, password });
  return response.data;
};

export const register = async (name, subname, phone, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, subname, phone, password });
  return response.data;
};

export const getUserData = async (token) => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.setItem('userData', JSON.stringify(response.data));
  return response.data;
};

// Активация пользователя
export const activateUser = async (token) => {
  const response = await axios.post(`${API_URL}/auth/activate`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Выход пользователя
export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};

// Получение списка мероприятий
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};
