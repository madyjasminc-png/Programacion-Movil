# Arquitectura de la API REST (Express.js) - HabitZone

La API de HabitZone seguirá una arquitectura RESTful estándar, utilizando el formato JSON para la transferencia de datos. Todas las rutas de la API estarán precedidas por el prefijo `/api/v1`.

## 1. Módulo de Autenticación (`/auth`)

Se encargará del registro, inicio de sesión y validación de tokens (JWT).

| Método | Endpoint | Descripción | Body (Payload) | Respuesta (Éxito) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` | Crea un nuevo usuario estudiante. | `{ name, email, password }` | `201 Created` - `{ message: "Usuario creado", token: "jwt_..." }` |
| **POST** | `/api/v1/auth/login` | Autentica un usuario y devuelve un token. | `{ email, password }` | `200 OK` - `{ user: {id, name, level}, token: "jwt_..." }` |
| **GET** | `/api/v1/auth/me` | Retorna los datos del usuario logueado actualmente. | Ninguno (Requiere Token en Header `Authorization: Bearer <token>`) | `200 OK` - `{ user: {...} }` |

## 2. Módulo de Retos (`/challenges`)

Gestiona el catálogo de ejercicios de comunicación disponibles en la plataforma.

| Método | Endpoint | Descripción | Body (Payload) | Respuesta (Éxito) |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/challenges` | Lista todos los retos (con soporte para paginación y filtros por `category` o `difficulty`). | Ninguno | `200 OK` - `[{ id, title, category, difficulty }]` |
| **GET** | `/api/v1/challenges/:id` | Obtiene el detalle completo de un reto, incluyendo su descripción e instrucciones. | Ninguno | `200 OK` - `{ id, title, description, category, ... }` |
| **POST** | `/api/v1/challenges` | (Admin) Crea un nuevo reto en el sistema. | `{ title, description, category, difficulty }` | `201 Created` - `{ challenge: {...} }` |

## 3. Módulo de Progreso (`/progress`)

Registra y recupera el historial de retos completados por los usuarios. Alimenta el "Mapa de Progreso".

| Método | Endpoint | Descripción | Body (Payload) | Respuesta (Éxito) |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/progress/my-journey` | Obtiene el historial de retos del usuario autenticado (para dibujar el mapa de ruta). | Ninguno (Requiere Token) | `200 OK` - `[{ challenge_id, score, status, completed_at }]` |
| **POST** | `/api/v1/progress/start` | Marca un reto como "iniciado" por el usuario. | `{ challenge_id }` | `201 Created` - `{ progress_id, status: "started" }` |
| **PUT** | `/api/v1/progress/:progress_id/complete` | Finaliza un reto, asignando una puntuación y opcionalmente el enlace del audio grabado. | `{ score, voice_record_url }` | `200 OK` - `{ message: "Reto completado", new_level: 2 }` |

## 4. Módulo de Comunidad (`/community`)

Permite la interacción social y el descubrimiento de otros estudiantes.

| Método | Endpoint | Descripción | Body (Payload) | Respuesta (Éxito) |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/community/explorers` | Lista estudiantes sugeridos o destacados en la comunidad. | Ninguno | `200 OK` - `[{ user_id, name, level }]` |
| **POST** | `/api/v1/community/connect` | Envía una solicitud de conexión/seguimiento a otro estudiante. | `{ target_user_id }` | `201 Created` - `{ status: "pending" }` |
| **PUT** | `/api/v1/community/connect/:connection_id` | Acepta o rechaza una solicitud de conexión pendiente. | `{ status: "accepted" \| "rejected" }` | `200 OK` - `{ message: "Conexión actualizada" }` |

## Estructura Base de una Petición con Error

Para asegurar la consistencia del cliente React.js, todos los errores seguirán este patrón:
```json
{
  "error": true,
  "message": "Mensaje descriptivo del error para el usuario",
  "code": "ERROR_CODE"
}
```
