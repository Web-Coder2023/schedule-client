// context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData, login, register, logout as apiLogout } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const data = await getUserData(token);
          setUser(data);
        } catch (error) {
          setUser(null);
          localStorage.removeItem("token");
          setToken(null);
          toast.error("Ваша сессия завершена, пожалуйста, войдите снова.");
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const loginUser = async (phone, password) => {
    try {
      const { token } = await login(phone, password);
      localStorage.setItem("token", token);
      setToken(token);
      const userData = await getUserData(token);
      setUser(userData);
      toast.success("Вход выполнен успешно!");
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Ошибка входа. Проверьте данные.");
      console.error("Login failed", error);
    }
  };

  const registerUser = async (name, subname, phone, password, isActive = false) => {
    try {
      const response = await register(name, subname, phone, password);
      if (!isActive) {
        toast.info("Регистрация выполнена! Подтвердите через Telegram.");
      } else {
        const { token } = response;
        localStorage.setItem("token", token);
        setToken(token);
        const userData = await getUserData(token);
        setUser(userData);
        toast.success("Регистрация успешна!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Ошибка регистрации. Попробуйте позже.");
      console.error("Registration failed", error);
    }
  };
  
  const logoutUser = async () => {
    try {
      await apiLogout();
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      toast.info("Вы вышли из системы.");
      navigate("/");
    } catch (error) {
      toast.error("Ошибка выхода. Попробуйте снова.");
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
