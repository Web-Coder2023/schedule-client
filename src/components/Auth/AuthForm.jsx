import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AuthForm = ({ setIsResetPassword, closeAuthModal }) => {
    const { loginUser } = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(phone, password).then(() => {
            closeAuthModal(); // Закрываем модальное окно после успешного входа
        });
    };

    return (
        <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-modal__input">
                <label htmlFor="login-phone">Телефон</label>
                <input
                    id="login-phone"
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div className="auth-modal__input">
                <label htmlFor="login-password">Пароль</label>
                <input
                    id="login-password"
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="auth-modal__box">
                <button type="submit" className="_btn">Войти</button>
                <button
                    type="button"
                    className="reset__link"
                    onClick={() => setIsResetPassword(true)}
                >
                    Забыли пароль?
                </button>
            </div>
        </form>
    );
};


export default AuthForm;
