// components/Events/EventSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

const EventSlider = ({ events, onEventClick }) => {
  const baseUrl = process.env.REACT_APP_URL_IMAGE;
  return (
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
      className="events__list"
    >
      {events.map((event) => (
        <SwiperSlide
          key={event._id}
          className="events__list-item"
          onClick={() => onEventClick(event)}
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
  );
};

export default EventSlider;
