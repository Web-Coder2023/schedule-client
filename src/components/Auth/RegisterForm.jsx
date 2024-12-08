import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ConfirmationModal from "../Modal/ConfirmationModal";

const RegisterForm = ({ closeAuthModal }) => {
  const { registerUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [subname, setSubname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      await registerUser(name, subname, phone, password); // Регистрация без активации
      setShowModal(true); // Показ модального окна
    } catch (error) {
      alert("Ошибка при регистрации. Попробуйте снова.");
      console.error(error);
    }
  };

  const handleConfirmation = () => {
    setShowModal(false);
    closeAuthModal(); // Закрываем окно регистрации
  };

  return (
    <>
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
          <button type="submit" className="_btn">
            Зарегистрироваться
          </button>
        </div>
      </form>

      {showModal && (
        <ConfirmationModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmation}
        />
      )}
    </>
  );
};

export default RegisterForm;
