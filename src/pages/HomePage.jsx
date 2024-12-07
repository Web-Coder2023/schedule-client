import React, { useState } from 'react';
import Hero from '../components/Hero/Hero';
import Events from '../components/Events/Events';
import Footer from '../components/Footer/Footer';
import Modal from '../components/Modal/Modal';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="wrapper">
      <header className="_hidden"></header>
      <main className="main">
        <Hero />
        <Events onEventClick={openModal} />
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default App;
