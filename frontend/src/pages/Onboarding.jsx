import React, { useState } from 'react';
import './Onboarding.css';

const Onboarding = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: 'COMIENZA TU AVENTURA',
      subtitle: 'Bienvenido Explorador. Mejora tu comunicación y expresión verbal con hábitos diarios.',
      image: '🚀' // Placeholder de ilustración
    },
    {
      title: 'PLANIFICA TUS RETOS',
      subtitle: 'Descubre nuevos destinos de aprendizaje y mejora tu fluidez paso a paso.',
      image: '🗣️'
    },
    {
      title: 'ORGANIZA TUS OBJETIVOS',
      subtitle: 'Cumple tus metas de oratoria y únete a nuestra comunidad de aprendizaje activo.',
      image: '🏆'
    }
  ];

  const nextStep = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onFinish(); // Navegar a la pantalla principal
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-image-wrapper">
        <span className="onboarding-emoji">{slides[step].image}</span>
      </div>
      
      <div className="onboarding-content">
        <h1 className="onboarding-title">{slides[step].title}</h1>
        <p className="onboarding-subtitle">{slides[step].subtitle}</p>
        
        <div className="dots-indicator">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`dot ${index === step ? 'active' : ''}`}
            />
          ))}
        </div>
        
        <button className="primary-button" onClick={nextStep}>
          {step === slides.length - 1 ? 'EMPEZAR' : 'SIGUIENTE'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
