// ConfirmationModal.jsx
import React, { useState } from "react";

const ConfirmationModal = ({ onClose, onConfirm }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsConfirmed(true);
      // Здесь вы можете реализовать логику подтверждения через Telegram
      // Например, показываем ссылку на Telegram бот:
      window.location.href = "https://t.me/official_dungeons_bot"; // Перенаправление на Telegram бот
      onConfirm(); // После того как пользователь нажмет "Подтвердить"
    } catch (error) {
      alert("Ошибка при подтверждении. Попробуйте снова.");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Подтверждение через Telegram</h2>
        <p>Для завершения регистрации, пожалуйста, подтвердите ваш аккаунт через Telegram-бота.</p>
        <p>После подтверждения, вы сможете войти в свой аккаунт.</p>
        <div className="modal-actions">
          <button onClick={onClose}>Закрыть</button>
          <button onClick={handleConfirm} disabled={isConfirmed}>
            {isConfirmed ? "Подтверждено" : "Подтвердить через Telegram"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
