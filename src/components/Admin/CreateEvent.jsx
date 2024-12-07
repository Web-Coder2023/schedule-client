import React, { useState } from 'react';

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    seats: '',
    image: '',
    location: '',
    address: '',
    organizerPhone: '',
    host: '',
    maxParticipants: '',
    minParticipants: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Созданное мероприятие:', eventData);
    // Логика отправки данных на сервер, например, через fetch/axios
  };

  return (
    <div className="create-event">
      <h2>Создать мероприятие</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название:</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Дата:</label>
          <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Время:</label>
          <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Кол-во мест:</label>
          <input type="number" name="seats" value={eventData.seats} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Изображение (URL):</label>
          <input type="text" name="image" value={eventData.image} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Локация:</label>
          <input type="text" name="location" value={eventData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Адрес:</label>
          <input type="text" name="address" value={eventData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Телефон организатора:</label>
          <input type="tel" name="organizerPhone" value={eventData.organizerPhone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Ведущий:</label>
          <input type="text" name="host" value={eventData.host} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Максимум участников:</label>
          <input type="number" name="maxParticipants" value={eventData.maxParticipants} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Минимум участников:</label>
          <input type="number" name="minParticipants" value={eventData.minParticipants} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Цена:</label>
          <input type="text" name="price" value={eventData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Описание:</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}
