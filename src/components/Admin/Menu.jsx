import React from 'react';

export default function Menu({ activeMenu, onMenuChange }) {
  return (
    <div className="sidebar-menu">
      <ul>
        <li className={`menu-item ${activeMenu === 'create-event' ? '_active' : ''}`}>
          <a href="#!" onClick={() => onMenuChange('create-event')}>
            Создать мероприятие
          </a>
        </li>
        <li className={`menu-item ${activeMenu === 'event-list' ? '_active' : ''}`}>
          <a href="#!" onClick={() => onMenuChange('event-list')}>
            Список мероприятий
          </a>
        </li>
        <li className={`menu-item ${activeMenu === 'event-archive' ? '_active' : ''}`}>
          <a href="#!" onClick={() => onMenuChange('event-archive')}>
            Архив мероприятий
          </a>
        </li>
      </ul>
    </div>
  );
}
