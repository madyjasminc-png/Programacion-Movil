const db = require('../config/db');

async function initDB() {
  try {
    console.log('Iniciando creación de tablas...');

    // Crear tabla de usuarios
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        level INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla users asegurada.');

    // Crear tabla de retos
    await db.execute(`
      CREATE TABLE IF NOT EXISTS challenges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category ENUM('pronunciation', 'reading', 'impromptu') NOT NULL,
        difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla challenges asegurada.');

    // Crear tabla de progreso de usuario
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        challenge_id INT NOT NULL,
        score INT DEFAULT 0,
        voice_record_url VARCHAR(255) DEFAULT NULL,
        status ENUM('started', 'completed') DEFAULT 'started',
        completed_at TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
      )
    `);
    console.log('Tabla user_progress asegurada.');

    // Crear tabla de comunidad
    await db.execute(`
      CREATE TABLE IF NOT EXISTS community_connections (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id_1 INT NOT NULL,
        user_id_2 INT NOT NULL,
        status ENUM('pending', 'accepted') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Tabla community_connections asegurada.');

    // Insertar retos de prueba si está vacía
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM challenges');
    if (rows[0].count === 0) {
      console.log('Insertando retos de prueba...');
      const challenges = [
        ['Trabalenguas del Tigre', 'Lee el siguiente trabalenguas sin equivocarte: Tres tristes tigres tragaban trigo en un trigal.', 'pronunciation', 'easy'],
        ['Lectura Expresiva Nivel 1', 'Lee un párrafo de tu libro favorito con diferentes tonos de voz (feliz, triste, enojado).', 'reading', 'medium'],
        ['Improvisación de 1 minuto', 'Habla durante un minuto ininterrumpido sobre por qué los gatos dominan internet.', 'impromptu', 'hard'],
        ['Dicción con la letra R', 'Repite: El perro de San Roque no tiene rabo porque Ramón Ramírez se lo ha robado.', 'pronunciation', 'medium'],
        ['Noticias del Día', 'Lee un artículo de noticias como si fueras un presentador de televisión profesional.', 'reading', 'hard']
      ];

      for (let c of challenges) {
        await db.execute(
          'INSERT INTO challenges (title, description, category, difficulty) VALUES (?, ?, ?, ?)',
          c
        );
      }
      console.log('Retos insertados correctamente.');
    } else {
      console.log('La tabla de retos ya tiene datos. Omitiendo seed.');
    }

    console.log('✅ Base de datos inicializada correctamente.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
}

initDB();
