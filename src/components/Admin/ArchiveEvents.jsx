import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import ModalArchive from './Modal-Archiv';
import { getArchivedEvents } from '../../api/api';
import 'swiper/css';
import 'swiper/css/scrollbar';

const ArchiveEvents = () => {
  const baseUrl = process.env.REACT_APP_URL_IMAGE;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState(''); // Новый стейт для даты

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getArchivedEvents();
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

  // Текущая дата для сортировки
  const currentDate = new Date();

  // Фильтруем события по выбранному типу, названию и дате
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date).toISOString().split('T')[0]; // Форматируем дату
    return (
      (filter === 'Все' || event.type === filter) &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (searchDate === '' || eventDate === searchDate) // Фильтр по дате
    );
  });

  // Сортировка мероприятий по близости к текущей дате
  const sortedEvents = filteredEvents.sort((a, b) => {
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

  // Группировка мероприятий по дате
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const eventDate = new Date(event.date).toISOString().split('T')[0];
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
    <div>
      {/* Фильтры и строка поиска */}
      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Все">Все</option>
          <option value="Игры Подземелий">Игры Подземелий</option>
          <option value="Королевская битва Подземелий">Королевская битва Подземелий</option>
          <option value="Игры от частных мастеров">Игры от частных мастеров</option>
          <option value="Бронь стола для самостоятельной игры">Бронь стола для самостоятельной игры</option>
        </select>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="date"
          placeholder="Поиск по дате"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

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
                      <img src={`${baseUrl}${event.image}`} alt={event.title} />
                    </div>
                    <div className="box">
                      <div className="_wrap-status">
                        <div className="_parallelogram"></div>
                        <h3>{event.title}</h3>
                      </div>
                      <p className="time-place">
                        <span className="time">{event.time}</span>
                        <i className="vertical-line"></i>
                        {event.maxParticipants - event.participants.length > 0 ? (
                          <span className="place">
                            Осталось мест: {event.maxParticipants - event.participants.length}
                          </span>
                        ) : (
                          <span className="_error-place">Мест нет</span>
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

      <ModalArchive isOpen={!!selectedEvent} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default ArchiveEvents;
