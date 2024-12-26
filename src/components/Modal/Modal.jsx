import React, { useState, useEffect } from 'react';
import { getUserById, registerForEvent, unregisterFromEvent } from '../../api/api.jsx'; // Импортируем наши функции

const Modal = ({ isOpen, onClose, event }) => {
  const [participantsDetails, setParticipantsDetails] = useState([]);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const baseUrl = process.env.REACT_APP_URL_IMAGE;

  // Получение данных текущего авторизованного пользователя
  const getCurrentUser = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData ? userData : null;
  };

  // Функция для загрузки данных пользователей
  const loadParticipants = async () => {
    try {
      const participantsData = await Promise.all(
        event.participants.map(async (participant) => {
          const userDetails = await getUserById(participant.userId); // Получаем данные пользователя по его ID
          return userDetails ? { ...participant, ...userDetails } : participant;
        })
      );
      setParticipantsDetails(participantsData); // Сохраняем подробности участников

      // Проверяем, зарегистрирован ли текущий пользователь
      const currentUser = getCurrentUser();
      if (currentUser) {
        const isRegistered = event.participants.some(
          (participant) => participant.userId === currentUser._id
        );
        setIsUserRegistered(isRegistered); // Если пользователь уже зарегистрирован
      }
    } catch (error) {
      console.error('Ошибка при получении данных участников:', error);
    }
  };

  // Обработчик для записи на мероприятие
  const handleRegister = async () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        await registerForEvent(event._id, currentUser._id); // Регистрируем пользователя на мероприятие
        setIsUserRegistered(true); // Обновляем состояние кнопки
      }
    } catch (error) {
      console.error('Ошибка при записи на мероприятие:', error);
    }
  };

  // Обработчик для отмены записи
  const handleUnregister = async () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        await unregisterFromEvent(event._id, currentUser._id); // Отменяем регистрацию
        setIsUserRegistered(false); // Обновляем состояние кнопки
      }
    } catch (error) {
      console.error('Ошибка при отмене записи с мероприятия:', error);
    }
  };

  useEffect(() => {
    if (isOpen && event.participants?.length) {
      loadParticipants();
    }
  }, [isOpen, event]);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? '_open' : ''}`} onClick={onClose}>
      <div className="modal__body" onClick={(e) => e.stopPropagation()}>
        <div className="modal__body-box">
          <div className="modal__body-image _img">
            <img src={`${baseUrl}${event.image}`} alt={event.title} />
          </div>
          <div className="_wrap-status">
            <div className="_parallelogram"></div>
            <h3>{event.title}</h3>
          </div>
          {getCurrentUser() ? (
            isUserRegistered ? (
              <button className="_cancel-recording" onClick={handleUnregister}>Отменить запись</button>
            ) : (
              <button className="_recording" onClick={handleRegister}>ЗАПИСАТЬСЯ</button>
            )
          ) : (
            <button className="_recording">ЗАПИСАТЬСЯ</button>
          )}

          <ul className="modal__list">
            <li><b>Дата проведения: </b>{new Date(event.date).toLocaleDateString('ru-RU')}</li>
            <li><b>Время проведения: </b>{event.time}</li>
            <li><b>Местоположение: </b>{event.location}</li>
            <li><b>Адрес: </b>{event.address}</li>
            <li><b>Тел. организатора: </b><a href={`tel:${event.organizerPhone}`}>{event.organizerPhone}</a></li>
            <li><b>Ведущий: </b>{event.host}</li>
            <li><b>Максимальное количество участников: </b>{event.maxParticipants}</li>
            <li><b>Минимальное количество участников: </b>{event.minParticipants}</li>
            <li><b>Стоимость участия: </b>{event.price}</li>
          </ul>
          <div className="modal__descr">
            <b>Описание:</b>
            <p>{event.description}</p>
          </div>
          <ul className="modal__users">
            <li className="modal__users-title">Список участников:</li>
            {participantsDetails?.length ? (
              participantsDetails.map((participant, index) => (
                <li key={index}>
                  {participant.name} {participant.subname} {/* Отображаем имя и фамилию */}
                </li>
              ))
            ) : (
              <li>Участники не указаны</li>
            )}
          </ul>
        </div>
        <div className="_close _img" onClick={onClose}>
          <img src="./img/close.png" alt="Закрыть" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
