import React from 'react';

const Modal = ({ isOpen, onClose, event }) => {
  const baseUrl = process.env.REACT_APP_URL_IMAGE;
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
          <div className="modal__buttons">
            <button className="_redact">Редактировать</button><button className="_isArchive">В архив</button><button className="_delited">Удалить</button> <button className="_delited">Отменить</button> 
          </div>
          <ul className="modal__list">
            <li><b>Тип события: </b>{event.type}</li>
            <li><b>Категория: </b>{event.category}</li>
            <li><b>Система: </b>{event.system}</li>
            <li><b>Дата проведения: </b>{new Date(event.date).toLocaleDateString('ru-RU')}</li>
            <li><b>Время проведения: </b>{event.time}</li>
            <li><b>Продолжительность: </b>{event.duration}</li>
            <li><b>Локация: </b>{event.location}</li>
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
            {event.participants?.length ? (
              event.participants.map((participant, index) => <li key={index}>{participant}</li>)
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