import React, { useState, useEffect } from 'react';
import ChallengeModal from '../components/ChallengeModal';
import './DiscoverHub.css';

function DiscoverHub() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      // Usando localhost:3000 por defecto para el backend
      const response = await fetch('http://localhost:3000/api/v1/challenges');
      const result = await response.json();
      if (!result.error) {
        setChallenges(result.data);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hub-container">
      <header className="hub-header">
        <h1>Descubrir Retos</h1>
        <p>Encuentra tu próximo desafío de comunicación.</p>
        <input 
          type="text" 
          placeholder="Buscar retos..." 
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {loading ? (
        <div className="loading">Cargando retos...</div>
      ) : (
        <div className="challenges-grid">
          {filteredChallenges.map(challenge => (
            <div key={challenge.id} className="challenge-card" onClick={() => setSelectedChallenge(challenge)}>
              <div className="card-badge">{challenge.category}</div>
              <h3>{challenge.title}</h3>
              <p>{challenge.description.substring(0, 60)}...</p>
              <div className={`difficulty ${challenge.difficulty}`}>
                {challenge.difficulty}
              </div>
            </div>
          ))}
          {filteredChallenges.length === 0 && (
            <p className="no-results">No se encontraron retos.</p>
          )}
        </div>
      )}

      {selectedChallenge && (
        <ChallengeModal 
          challenge={selectedChallenge} 
          onClose={() => setSelectedChallenge(null)} 
        />
      )}
    </div>
  );
}

export default DiscoverHub;
