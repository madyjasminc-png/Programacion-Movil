# Documentación Técnica: HabitZone

## 1. Arquitectura del Sistema
HabitZone utiliza una arquitectura Cliente-Servidor desacoplada:
*   **Cliente Móvil (Frontend):** Construido como una Single Page Application (SPA) utilizando **React.js**. Mediante **Capacitor**, el código web se empaqueta en un contenedor nativo, permitiendo su despliegue como una app móvil real que tiene acceso a APIs del hardware del dispositivo.
*   **Servidor API (Backend):** Construido en **Node.js** utilizando el framework **Express.js**. Proporciona una API RESTful para gestionar la lógica de negocio y el flujo de información.
*   **Almacenamiento de Datos:** Base de datos relacional **MySQL**, ideal para mantener la integridad de relaciones complejas (ej. usuarios, progreso en diferentes retos, interacciones en la comunidad).

## 2. Stack Tecnológico Detallado

### 2.1 Frontend (Aplicación Móvil)
*   **Librería Principal:** React.js
*   **Empaquetador y Puente Nativo:** Capacitor (permite usar el micrófono, almacenamiento local y cámara del teléfono).
*   **Enrutamiento:** React Router DOM (para navegar entre las vistas estilo "Hub", "Mapa", "Perfil").
*   **Estilos:** CSS Modules o un framework de utilidades (como Tailwind CSS) configurado con la paleta de colores de referencia (naranjas suaves, beige, blancos).
*   **Peticiones HTTP:** Axios para consumir la API de Express.

### 2.2 Backend (API REST)
*   **Entorno de Ejecución:** Node.js
*   **Framework:** Express.js
*   **ORM / Manejo de DB:** Sequelize o MySQL2 crudo para interactuar con la base de datos MySQL de forma segura (previniendo inyección SQL).
*   **Autenticación:** JSON Web Tokens (JWT) junto con `bcrypt` para encriptación de contraseñas de los estudiantes.
*   **Middlewares:** `cors` para el manejo de políticas de acceso, `express.json` para parseo de solicitudes, y manejadores de errores globales.

### 2.3 Base de Datos (MySQL)
Esquema relacional propuesto (Entidades Principales):
*   **Usuarios (`users`):** `id`, `name`, `email`, `password_hash`, `level`, `created_at`.
*   **Retos (`challenges`):** `id`, `title`, `description`, `type` (lectura, pronunciación, debate), `difficulty`.
*   **Progreso de Usuario (`user_progress`):** `id`, `user_id`, `challenge_id`, `score`, `voice_record_url` (opcional, si se guarda en la nube), `completed_at`.
*   **Comunidad (`community_connections`):** `user_id_1`, `user_id_2`, `status` (para interacciones entre usuarios).

## 3. Estructura de Directorios Propuesta

El monorepo o proyecto se puede dividir de la siguiente manera:

### Backend (`/server`)
```text
/server
  /config         # Configuración de base de datos MySQL y variables de entorno
  /controllers    # Lógica de negocio (auth, challenges, progress)
  /middlewares    # Verificadores de JWT, manejo de errores
  /models         # Modelos de datos para interactuar con MySQL
  /routes         # Definición de las rutas RESTful
  app.js          # Configuración principal de Express
  server.js       # Punto de entrada y listener de puertos
```

### Frontend (`/client`)
```text
/client
  /android        # Proyecto nativo de Android (Generado por Capacitor)
  /ios            # Proyecto nativo de iOS (Generado por Capacitor)
  /src
    /assets       # Imágenes, iconos e ilustraciones de la UI
    /components   # Componentes UI reutilizables (Cards, NavBars, Buttons)
    /pages        # Vistas principales (Onboarding, DiscoverHub, JourneyMap)
    /services     # Funciones para llamadas Axios al Backend
    App.jsx       # Enrutador principal de React
  capacitor.config.ts # Configuración de empaquetado nativo
```

## 4. Endpoints Principales de la API (Borrador)

*   **Autenticación:**
    *   `POST /api/auth/register` - Crear cuenta de estudiante.
    *   `POST /api/auth/login` - Iniciar sesión y retornar el token JWT.
*   **Retos / Challenges:**
    *   `GET /api/challenges` - Obtener lista de retos recomendados (Pantalla Descubrir).
    *   `GET /api/challenges/:id` - Detalles de un reto específico.
*   **Progreso e Itinerario:**
    *   `GET /api/progress/user/:id` - Obtener el progreso del usuario para llenar el "Mapa de Progreso".
    *   `POST /api/progress/submit` - Registrar que un estudiante completó un reto de comunicación.
*   **Comunidad:**
    *   `GET /api/community/explore` - Obtener listas de "exploradores" o estudiantes recomendados.
    *   `GET /api/users/:id/profile` - Obtener datos públicos de un perfil.

## 5. Decisiones de Diseño Basadas en la Referencia
La propuesta de interfaz de viaje (viajes, mapas, exploradores) se adapta perfectamente a una metodología de gamificación del aprendizaje:
*   El estudiante es un "Explorador" de sus propias habilidades.
*   El **Discover Hub** sirve para encontrar nuevos ejercicios de comunicación.
*   El **Mapa o Itinerario** (Travel Itinerary) se convierte en la hoja de ruta de los hábitos diarios que debe completar el estudiante.
*   Las **Cards y el Bottom Navigation** aseguran que la aplicación se sienta como una app nativa premium con interacciones suaves y limpias.
