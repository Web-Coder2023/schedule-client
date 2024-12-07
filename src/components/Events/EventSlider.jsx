// components/Events/EventSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

const EventSlider = ({ events, onEventClick }) => {
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
      style={{ padding: '20px 30px 0px 0px' }}
      className="events__list"
    >
      {events.map((event) => (
        <SwiperSlide
          key={event._id}
          className="events__list-item"
          style={{ maxWidth: '487px' }}
          onClick={() => onEventClick(event)}
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
  );
};

export default EventSlider;
