import React, { useState, useEffect } from 'react';
import './JourneyMap.css';

function JourneyMap() {
  const [journey, setJourney] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJourney();
  }, []);

  const fetchJourney = async () => {
    try {
      // Usando user_id=1 hardcodeado para la demo
      const response = await fetch('http://localhost:3000/api/v1/progress/my-journey?user_id=1');
      const result = await response.json();
      if (!result.error) {
        setJourney(result.data);
      }
    } catch (error) {
      console.error('Error fetching journey:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="journey-container">
      <header className="journey-header">
        <h1>Mapa de Progreso</h1>
        <p>Tu camino hacia una mejor comunicación.</p>
      </header>

      {loading ? (
        <div className="loading">Cargando progreso...</div>
      ) : (
        <div className="timeline">
          {journey.length === 0 ? (
            <div className="empty-state">
              <p>Aún no has completado ningún reto. ¡Ve al Hub para empezar!</p>
            </div>
          ) : (
            journey.map((item, index) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">
                    {new Date(item.completed_at).toLocaleDateString()}
                  </div>
                  <h3>{item.title}</h3>
                  <div className={`difficulty-badge ${item.difficulty}`}>
                    {item.difficulty}
                  </div>
                  <div className="score-badge">
                    Puntuación: <strong>{item.score}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default JourneyMap;
