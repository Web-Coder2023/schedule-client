import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AuthTabs from '../Auth/AuthTabs';
import AuthForm from '../Auth/AuthForm';
import RegisterForm from '../Auth/RegisterForm';
import ResetPassword from '../Auth/ResetPassword';
import SvgAnimation from '../SvgAnimation';

const Hero = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [resetStep, setResetStep] = useState(1);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for logout confirmation modal

    const { user, logoutUser } = useContext(AuthContext);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        setIsRegister(false);
        setIsResetPassword(false);
        setResetStep(1);
    };

    const openLogoutModal = () => setIsLogoutModalOpen(true); // Open logout confirmation modal
    const closeLogoutModal = () => setIsLogoutModalOpen(false); // Close logout confirmation modal

    const handleLogout = () => {
        logoutUser();
        closeLogoutModal();
    };

    return (
        <>
            <section className="hero">
                <div className="hero__container">
                    <div className="hero__image _img">
                        <SvgAnimation />
                    </div>
                    <div className="hero__box">
                        <h1>Подземелья Lounge</h1>
                        <span className="line"></span>
                        <p>Расписание событий</p>
                        {user ? (
                            <div className="hero__profile">
                                <h2>Приветствую, <b>{user.name} {user.subname}</b></h2>
                                <button className="_btn" onClick={openLogoutModal}>Выйти</button> {/* Open logout modal */}
                            </div>
                        ) : (
                            <button className="_btn" onClick={openAuthModal}>Войти</button>
                        )}
                    </div>
                </div>
            </section>

            {isAuthModalOpen && (
                <div className="auth-modal">
                    <div className="auth-modal__content">
                        {!isResetPassword ? (
                            <>
                                <div className="auth-modal__box">
                                    <h2 className='auth-modal__title'>{isRegister ? 'Регистрация' : 'Авторизация'}</h2>
                                    <button onClick={closeAuthModal}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 4L4 20M20 20L4 4" stroke="#595959" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                                <AuthTabs isRegister={isRegister} setIsRegister={setIsRegister} />
                                <div className="auth-modal__body">
                                    {!isRegister ? (
                                        <AuthForm setIsResetPassword={setIsResetPassword} closeAuthModal={closeAuthModal} />
                                    ) : (
                                        <RegisterForm closeAuthModal={closeAuthModal} />
                                    )}
                                </div>
                            </>
                        ) : (
                            <ResetPassword
                                resetStep={resetStep}
                                nextResetStep={() => setResetStep((prev) => prev + 1)}
                                prevResetStep={() => setResetStep((prev) => Math.max(1, prev - 1))}
                                closeAuthModal={closeAuthModal}
                            />
                        )}
                    </div>
                </div>
            )}

            {isLogoutModalOpen && (
                <div className="logout-modal _open">
                    <div className="logout-modal__body">
                        <h2>Вы уверены, что хотите выйти?</h2>
                        <div className="logout-modal__btn">
                            <button className="_btn _btn-red" onClick={handleLogout}>Да</button>
                            <button className="_btn _btn-green" onClick={closeLogoutModal}>Нет</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Hero;