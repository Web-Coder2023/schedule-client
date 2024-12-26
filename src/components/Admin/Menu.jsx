import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Menu({ activeMenu, onMenuChange }) {
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { logoutUser } = useContext(AuthContext);
  const handleLogout = () => {
    logoutUser();
    closeLogoutModal();
  };
  return (
    <div className="sidebar-menu">
      <ul>
        <li className={`menu-item ${activeMenu === 'create-event' ? '_active' : ''}`}>
          <button onClick={() => onMenuChange('create-event')}>
            Создать мероприятие
          </button>
        </li>
        <li className={`menu-item ${activeMenu === 'event-list' ? '_active' : ''}`}>
          <button onClick={() => onMenuChange('event-list')}>
            Список мероприятий
          </button>
        </li>
        <li className={`menu-item ${activeMenu === 'event-archive' ? '_active' : ''}`}>
          <button onClick={() => onMenuChange('event-archive')}>
            Архив мероприятий
          </button>
        </li>
      </ul>
      <button className="_btn" onClick={openLogoutModal}>Выйти</button>

      {isLogoutModalOpen && (
        <div className="logout-modal _open">
          <div className="logout-modal__body">
            <h2>Вы уверены, что хотите выйти?</h2>
            <div className="logout-modal__btn">
              <button className="_btn _btn-red" onClick={handleLogout}>Да</button>
              <button className="_btn _btn-green" onClick={closeLogoutModal}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
