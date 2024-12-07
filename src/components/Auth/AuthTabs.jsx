import React from 'react';

const AuthTabs = ({ isRegister, setIsRegister }) => {
  return (
    <div className="auth-modal__tabs">
      <button
        className={`auth-modal__tab ${!isRegister ? 'active' : ''}`}
        onClick={() => setIsRegister(false)}
      >
        Вход
      </button>
      <button
        className={`auth-modal__tab ${isRegister ? 'active' : ''}`}
        onClick={() => setIsRegister(true)}
      >
        Регистрация
      </button>
    </div>
  );
};

export default AuthTabs;
