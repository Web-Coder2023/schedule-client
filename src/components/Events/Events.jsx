// components/Events/Events.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { getEvents } from '../../api/api';
import EventSlider from './EventSlider';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentDate = new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        setError('Не удалось загрузить мероприятия.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Загрузка мероприятий...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Сортировка мероприятий: сначала по разнице в датах, потом по убыванию даты
  const sortedEvents = events.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    // Разница между датой мероприятия и текущей датой
    const diffA = Math.abs(aDate - currentDate);
    const diffB = Math.abs(bDate - currentDate);

    // Сравниваем разницу, чтобы мероприятия, ближе к сегодняшней дате, шли выше
    if (diffA !== diffB) {
      return diffA - diffB;
    }

    // Если разница одинаковая, упорядочиваем по убыванию даты
    return bDate - aDate;
  });

  // Группировка мероприятий
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const eventDate = new Date(event.date).toDateString();
    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }
    acc[eventDate].push(event);
    return acc;
  }, {});

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      {Object.entries(groupedEvents).map(([date, eventsOnDate]) => {
        const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        });
        const dayOfWeek = new Date(date).toLocaleDateString('ru-RU', {
          weekday: 'long',
        }).toUpperCase();

        return (
          <section className="events" key={date}>
            <div className="events__container">
              <h2>
                <span className="date">{formattedDate}</span>
                <i className="vertical-line"></i>
                <span className="day">{dayOfWeek}</span>
              </h2>
              <EventSlider events={eventsOnDate} onEventClick={openModal} />
            </div>
          </section>
        );
      })}

      <Modal isOpen={!!selectedEvent} onClose={closeModal} event={selectedEvent} />
    </>
  );
};

export default Events;
