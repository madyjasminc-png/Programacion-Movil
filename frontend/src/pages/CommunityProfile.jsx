import React, { useState, useEffect } from 'react';
import './CommunityProfile.css';

function CommunityProfile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Perfil del usuario actual simulado
  const currentUser = {
    id: 1,
    name: 'Explorador HabitZone',
    level: 5,
    joined: 'Hace 2 semanas'
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/community?user_id=${currentUser.id}`);
      const result = await response.json();
      if (!result.error) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error fetching community:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (targetUserId) => {
    try {
      const payload = {
        user_id_1: currentUser.id,
        user_id_2: targetUserId,
        action: 'request'
      };
      
      const res = await fetch('http://localhost:3000/api/v1/community/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert('Solicitud de conexión enviada!');
      }
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  return (
    <div className="community-container">
      <header className="profile-header">
        <div className="avatar-circle">{currentUser.name.charAt(0)}</div>
        <h2>{currentUser.name}</h2>
        <div className="level-badge">Nivel {currentUser.level}</div>
        <p className="joined-text">Se unió {currentUser.joined}</p>
      </header>

      <section className="community-list-section">
        <h3>Descubrir Exploradores</h3>
        {loading ? (
          <div className="loading">Cargando comunidad...</div>
        ) : (
          <div className="users-list">
            {users.length === 0 ? (
              <p className="empty-state">Aún no hay otros usuarios.</p>
            ) : (
              users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <div className="small-avatar">{user.name.charAt(0)}</div>
                    <div>
                      <h4>{user.name}</h4>
                      <span className="user-level">Nivel {user.level}</span>
                    </div>
                  </div>
                  <button className="btn-connect" onClick={() => handleConnect(user.id)}>
                    Conectar
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default CommunityProfile;
