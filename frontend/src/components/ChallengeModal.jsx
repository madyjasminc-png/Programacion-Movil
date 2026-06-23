import React, { useState, useRef } from 'react';
import './ChallengeModal.css';

function ChallengeModal({ challenge, onClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("No se pudo acceder al micrófono. Por favor, verifica los permisos.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSaveProgress = async () => {
    setIsSaving(true);
    try {
      // User ID hardcodeado a 1 para la demostración
      const payload = {
        user_id: 1, 
        challenge_id: challenge.id,
        score: Math.floor(Math.random() * 41) + 60, // Simular puntuación entre 60 y 100
        voice_record_url: audioURL ? 'local_blob_url' : null
      };

      const res = await fetch('http://localhost:3000/api/v1/progress/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setProgressSaved(true);
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {progressSaved ? (
          <div className="success-state">
            <h2>🎉 ¡Reto Completado!</h2>
            <p>Tu progreso ha sido guardado exitosamente.</p>
            <button className="btn-primary" onClick={onClose}>Volver al Hub</button>
          </div>
        ) : (
          <>
            <h2>{challenge.title}</h2>
            <span className={`difficulty-badge ${challenge.difficulty}`}>
              {challenge.difficulty}
            </span>
            
            <div className="challenge-instructions">
              <p>{challenge.description}</p>
            </div>

            <div className="recording-section">
              {audioURL ? (
                <div className="audio-player">
                  <p>Tu grabación:</p>
                  <audio src={audioURL} controls />
                  <button className="btn-secondary mt-1" onClick={() => setAudioURL(null)}>
                    Volver a grabar
                  </button>
                </div>
              ) : (
                <div className="record-controls">
                  {!isRecording ? (
                    <button className="record-btn" onClick={startRecording}>
                      <span className="icon">🎤</span> Iniciar Grabación
                    </button>
                  ) : (
                    <button className="record-btn stop" onClick={stopRecording}>
                      <span className="icon">⏹️</span> Detener Grabación
                    </button>
                  )}
                  {isRecording && <div className="recording-indicator">Grabando...</div>}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button 
                className="btn-primary" 
                onClick={handleSaveProgress}
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : 'Marcar como Completado'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChallengeModal;
