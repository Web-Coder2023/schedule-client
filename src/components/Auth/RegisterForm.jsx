import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const RegisterForm = ({ closeAuthModal }) => {
    const { registerUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [subname, setSubname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleRegister = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
      }
      registerUser(name, subname, phone, password).then(() => {
        closeAuthModal(); // Закрываем модальное окно после успешной регистрации
      });
    };
  
    return (
      <form className="register-form" onSubmit={handleRegister}>
        <div className="auth-modal__input">
          <label htmlFor="reg-name">Имя</label>
          <input
            id="reg-name"
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="auth-modal__input">
          <label htmlFor="reg-subname">Фамилия</label>
          <input
            id="reg-subname"
            type="text"
            placeholder="Фамилия"
            value={subname}
            onChange={(e) => setSubname(e.target.value)}
            required
          />
        </div>
        <div className="auth-modal__input">
          <label htmlFor="reg-phone">Телефон</label>
          <input
            id="reg-phone"
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="auth-modal__input">
          <label htmlFor="reg-password">Пароль</label>
          <input
            id="reg-password"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="auth-modal__input">
          <label htmlFor="rep-password">Повтор</label>
          <input
            id="rep-password"
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="auth-modal__box reg">
          <button type="submit" className="_btn">Зарегистрироваться</button>
        </div>
      </form>
    );
  };
  

export default RegisterForm;
