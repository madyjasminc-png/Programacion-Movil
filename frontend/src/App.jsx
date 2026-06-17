import React, { useState } from 'react';
import Onboarding from './pages/Onboarding';
import './App.css';

function App() {
  // Estado para controlar si mostramos el Onboarding o la app principal
  const [showOnboarding, setShowOnboarding] = useState(true);

  const finishOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="app-container">
      {showOnboarding ? (
        <Onboarding onFinish={finishOnboarding} />
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
          <h2>🎉 ¡Bienvenido al Hub de Descubrimiento!</h2>
          <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
            Esta será tu pantalla principal con el buscador y los retos diarios.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
