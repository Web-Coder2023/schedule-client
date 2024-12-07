import React, { useState } from 'react';
import Menu from '../components/Admin/Menu';
import AllEvents from '../components/Admin/AllEvants';
import CreateEvent from '../components/Admin/CreateEvent';

const HomePageAdmin = () => {
  const [activeMenu, setActiveMenu] = useState('create-event');

  const renderContent = () => {
    switch (activeMenu) {
      case 'create-event':
        return <CreateEvent />;
      case 'event-list':
        return <AllEvents />;
      case 'event-archive':
        return <div>Архив мероприятий</div>; // Замените на компонент архива, если он есть
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
