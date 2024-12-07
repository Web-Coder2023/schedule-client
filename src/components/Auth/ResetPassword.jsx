import React from 'react';
import CodeInput from './CodeInput';

const ResetPasswordStep1 = ({ nextResetStep, prevResetStep, closeAuthModal }) => (
    <>
        <div className="auth-modal__box reset__box">
            <button onClick={closeAuthModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L4 20M20 20L4 4" stroke="#595959" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
        <div className="reset-step">
            <h2 className='reset__title'>Восстановить пароль</h2>
            <p className='reset__subtitle'>Введите свой номер телефона, чтобы мы отправили вам инструкцию.</p>
            <div className="auth-modal__input">
                <label htmlFor="reg-phone">Телефон</label>
                <input id='reg-phone' type="tel" placeholder="Телефон" />
            </div>
            <button className="_btn" onClick={nextResetStep}>
                Далее
            </button>
            <button className="back-link" onClick={prevResetStep}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7L9.42 12.0008L14 17" stroke="#595959" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
                Назад
            </button>
        </div>
    </>
);

const ResetPasswordStep2 = ({ nextResetStep, prevResetStep, closeAuthModal }) => (
    <>
        <div className="auth-modal__box reset__box">
            <button onClick={closeAuthModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L4 20M20 20L4 4" stroke="#595959" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
        <div className="reset-step">
            <h2 className='reset__title'>Восстановить пароль</h2>
            <p className='reset__subtitle'>Введите 5-значный код, который пришел вам на телефон.</p>
            <CodeInput />
            <button className="_btn" onClick={nextResetStep}>
                Далее
            </button>
            <button className="back-link" onClick={prevResetStep}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7L9.42 12.0008L14 17" stroke="#595959" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
                Назад
            </button>
        </div>
    </>
);

const ResetPasswordStep3 = ({ closeAuthModal, prevResetStep }) => (
    <>
        <div className="auth-modal__box reset__box">
            <button onClick={closeAuthModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L4 20M20 20L4 4" stroke="#595959" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
        </div>
        <div className="reset-step">
            <h2 className='reset__title'>Придумайте новый пароль</h2>
            <div className="auth-modal__input">
                <label htmlFor="reg-password">Пароль</label>
                <input id='reg-password' type="password" placeholder="Введите новый пароль" />
            </div>
            <div className="auth-modal__input">
                <label htmlFor="rep-password">Повтор</label>
                <input id='rep-password' type="password" placeholder="Введите пароль ещё раз" />
            </div>
            <button className="_btn">
                Сбросить пароль
            </button>
            <button className="back-link" onClick={prevResetStep}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 7L9.42 12.0008L14 17" stroke="#595959" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
                </svg>
                Назад
            </button>
        </div>
    </>
);

const ResetPassword = ({ resetStep, nextResetStep, prevResetStep, closeAuthModal }) => {
    if (resetStep === 1) return <ResetPasswordStep1 nextResetStep={nextResetStep} prevResetStep={prevResetStep} closeAuthModal={closeAuthModal} />;
    if (resetStep === 2) return <ResetPasswordStep2 nextResetStep={nextResetStep} prevResetStep={prevResetStep} closeAuthModal={closeAuthModal} />;
    if (resetStep === 3) return <ResetPasswordStep3 closeAuthModal={closeAuthModal} prevResetStep={prevResetStep} />;
    return null;
};

export default ResetPassword;
