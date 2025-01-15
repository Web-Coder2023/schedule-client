import axios from "axios";

// Используем переменную окружения для API URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api"; // fallback на локальный API

// Аутентификация
export const login = async (phone, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { phone, password });
  
  // Сохранение данных пользователя с токеном в localStorage
  const userData = response.data;
  localStorage.setItem('userData', JSON.stringify(userData));
  
  return userData;
};


export const register = async (name, subname, phone, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, subname, phone, password });
  return response.data;
};
// Создание нового мероприятия с токеном
export const createEvent = async (eventData) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  // Формируем FormData
  const formData = new FormData();
  for (let key in eventData) {
    formData.append(key, eventData[key]);
  }

  try {
    // Отправляем запрос на сервер
    const response = await axios.post(`${API_URL}/events`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Функция для получения пользователя по ID
export const getUserById = async (userId) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    throw error;
  }
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
  localStorage.removeItem('userData'); // Удаляем токен и данные пользователя из localStorage
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};


// Получение списка мероприятий
export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    throw error;  // Перебрасываем ошибку, чтобы обработать ее в компоненте
  }
};
// Получение списка мероприятий в архиве
export const getArchivedEvents = async () => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  try {
    // Отправляем запрос на сервер
    const response = await axios.post(
      `${API_URL}/archived-events`, 
      {}, // Тело запроса пустое, т.к. передаем только токен в заголовке
      {
        headers: {
          Authorization: `Bearer ${token}`, // Токен в заголовке
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // Бросаем ошибку дальше
  }
};

// Архивация события
export const archiveEvent = async (id) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  try {
    // Отправляем запрос на сервер с id события в URL
    const response = await axios.put(
      `${API_URL}/events/${id}/archive`, // Добавляем id в URL
      {}, // Тело запроса пустое, если не нужно передавать данные
      {
        headers: {
          Authorization: `Bearer ${token}`, // Токен в заголовке
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // Бросаем ошибку дальше
  }
};
// 67836452cfdf58a6dfcf4efd
export const deleteEvent = async (id) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
console.log(localStorage.getItem('token'));

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  try {
    const response = await axios.delete(
      `${API_URL}/events/${id}/delete`, // URL с ID события
      {
        headers: {
          Authorization: `Bearer ${token}`, // Токен в заголовке
        },
      }
    );    

    return response.data;
  } catch (error) {
    throw error; // Бросаем ошибку дальше
  }
};

// Востановление события
export const restoreEvent = async (id) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  try {
    // Отправляем запрос на сервер с id события в URL
    const response = await axios.put(
      `${API_URL}/events/${id}/restore`, // Добавляем id в URL
      {}, // Тело запроса пустое, если не нужно передавать данные
      {
        headers: {
          Authorization: `Bearer ${token}`, // Токен в заголовке
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error; // Бросаем ошибку дальше
  }
};


// Регистрация пользователя на мероприятие
export const registerForEvent = async (eventId, userId) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  try {
    console.log('Token:', token);
    console.log('User ID:', userId);

    const response = await axios.post(
      `${API_URL}/events/${eventId}/register`,
      { userId }, // Передаем userId в теле запроса
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Ошибка при записи на мероприятие:', error);
    throw error;
  }
};

// Отмена регистрации пользователя с мероприятия
export const unregisterFromEvent = async (eventId, userId) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  if (!token) {
    throw new Error('Пользователь не авторизован');
  }

  try {
    const response = await axios.delete(`${API_URL}/events/${eventId}/unregister/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};