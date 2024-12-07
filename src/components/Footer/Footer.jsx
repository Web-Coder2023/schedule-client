import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img src="/img/footer-logo.png" alt="Footer Logo" />
        </div>
        <div className="footer__col">
          <h2 className="footer__title">Забронировать закрытое игровое событие для собственной компании:</h2>
          <div className="footer__icons">
            <a href="#" aria-label="Telegram">
              <img src="/img/telegram-icon.png" alt="Telegram" />
            </a>
            <a href="#" aria-label="WhatsApp">
              <img src="/img/whatsapp-icon.png" alt="WhatsApp" />
            </a>
            <a href="#" aria-label="VK">
              <img src="/img/vk-icon.png" alt="VK" />
            </a>
          </div>
          <div className="line"></div>
          <div className="footer__contact">
            <h3 className="footer__title">Контакты:</h3>
            <a href="tel:+79996100990">+7(999)-610-09-90</a>
            <p>г. Волгоград, ул. Советская 11</p>
            <a href="#" className="com" aria-label="Сообщество ВК">
              Сообщество ВК <img src="./img/vk-icon.png" alt="VK" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
