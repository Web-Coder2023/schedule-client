// components/AllEvents.jsx
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import Modal from '../Modal/Modal';
import { getEvents } from '../../api/api';
import 'swiper/css';
import 'swiper/css/scrollbar';

const AllEvents = () => {
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
              <Swiper
                modules={[Scrollbar]}
                direction="horizontal"
                slidesPerView="auto"
                spaceBetween={55}
                speed={900}
                scrollbar={{
                  draggable: true,
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                style={{ padding: '20px 30px 0px 0px' }}
                className="events__list"
              >
                {eventsOnDate.map((event) => (
                  <SwiperSlide
                    key={event._id}
                    className="events__list-item"
                    style={{ maxWidth: '487px' }}
                    onClick={() => openModal(event)}
                  >
                    <div className="_img">
                      <img src={event.image} alt={event.title} />
                    </div>
                    <div className="box">
                      <div className="_wrap-status">
                        <div className="_parallelogram"></div>
                        <h3>{event.title}</h3>
                      </div>
                      <p className="time-place">
                        <span className="time">{event.time}</span>
                        <i className="vertical-line"></i>
                        {event.seats > 0 ? (
                          <span className="place">Осталось мест: {event.seats}</span>
                        ) : (
                          <span className="_error-place">мест нет</span>
                        )}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        );
      })}

      <Modal isOpen={!!selectedEvent} onClose={closeModal} event={selectedEvent} />
    </>
  );
};

export default AllEvents;
