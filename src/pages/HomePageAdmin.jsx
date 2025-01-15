import React, { useState, useEffect } from 'react';
import Menu from '../components/Admin/Menu';
import AllEvents from '../components/Admin/AllEvents';
import CreateEvent from '../components/Admin/CreateEvent';
import ArchiveEvents from '../components/Admin/ArchiveEvents';

const HomePageAdmin = () => {
  // При загрузке страницы пытаемся получить значение из localStorage
  const savedMenu = localStorage.getItem('activeMenu') || 'create-event'; // по умолчанию 'create-event'
  const [activeMenu, setActiveMenu] = useState(savedMenu);

  // Каждый раз, когда activeMenu изменяется, сохраняем его в localStorage
  useEffect(() => {
    localStorage.setItem('activeMenu', activeMenu);
  }, [activeMenu]);

  const renderContent = () => {
    switch (activeMenu) {
      case 'create-event':
        return <CreateEvent />;
      case 'event-list':
        return <AllEvents />;
      case 'event-archive':
        return <ArchiveEvents />;
      default:
        return null;
    }
  };

  return (
    <div className="wrapper wrapper-admin">
      <Menu activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default HomePageAdmin;
