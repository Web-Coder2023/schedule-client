import React, { useState } from 'react';
import { createEvent } from '../../api/api'; // Импортируем API-функцию
import { toast } from 'react-toastify'; // Импортируем Toast

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    system: '',
    date: '',
    time: '',
    duration: '',
    seats: '',
    image: null,
    location: '',
    address: '',
    organizerPhone: '',
    host: '',
    maxParticipants: '',
    minParticipants: '',
    price: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createEvent(formData);
      console.log('Мероприятие создано:', result);
      toast.success('Мероприятие успешно создано!'); // Уведомление об успехе
    } catch (err) {
      toast.error('Ошибка при создании мероприятия. Попробуйте снова.'); // Уведомление об ошибке
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event">
      <h2>Создать мероприятие</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Тип события:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Категория:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Система:</label>
          <input
            type="text"
            name="system"
            value={formData.system}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Время:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Продолжительность:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Изображение:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Локация:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Адрес:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Телефон организатора:</label>
          <input
            type="tel"
            name="organizerPhone"
            value={formData.organizerPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ведущий:</label>
          <input
            type="text"
            name="host"
            value={formData.host}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Максимальное количество участников:</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Минимальное количество участников:</label>
          <input
            type="number"
            name="minParticipants"
            value={formData.minParticipants}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Цена:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Описание:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Создание...' : 'Создать'}
        </button>
      </form>
    </div>
  );
}
