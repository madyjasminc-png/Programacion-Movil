# Backlog Scrum: Sprint 2 (Core de la Aplicación y Retos)

Este documento detalla las Historias de Usuario (User Stories) y Tareas Técnicas necesarias para cumplir con los objetivos del Sprint 2 de HabitZone.

## 📌 Resumen del Sprint
**Objetivo del Sprint:** Permitir que los usuarios descubran retos de comunicación, puedan practicar usando grabaciones de voz y visualicen su progreso de forma gamificada.

---

## 📖 Historias de Usuario y Tareas

### US-01: Descubrir Retos de Comunicación
**Como** estudiante,
**quiero** ver una lista de retos de comunicación diarios sugeridos (dicción, lectura, improvisación),
**para poder** elegir qué habilidad practicar hoy.

* **Prioridad:** Alta 🔴
* **Puntos de Historia (Story Points):** 5
* **Tareas Técnicas:**
  - [x] **[Backend]** Crear controlador y ruta `GET /api/v1/challenges` para obtener la lista de retos desde MySQL.
  - [x] **[Backend]** Crear script *seed* para insertar 5 retos de prueba iniciales en la base de datos.
  - [x] **[Frontend]** Crear el componente y maquetación de la pantalla `DiscoverHub.jsx` con buscador y tarjetas horizontales (basado en el UI mockup).
  - [x] **[Frontend]** Crear servicio Axios para consumir el endpoint de retos y enlazar el estado de React con la UI.

### US-02: Práctica y Grabación de Voz
**Como** estudiante,
**quiero** poder grabar mi voz directamente desde la aplicación durante un reto,
**para poder** evaluar mi pronunciación y cumplir el ejercicio.

* **Prioridad:** Alta 🔴
* **Puntos de Historia (Story Points):** 8
* **Tareas Técnicas:**
  - [x] **[Frontend]** Investigar e instalar el plugin nativo `@capacitor-community/voice-recorder` (o usar la API nativa del navegador).
  - [x] **[Frontend]** Desarrollar componente de UI de grabadora (Botón de iniciar, detener y reproductor de vista previa).
  - [x] **[Frontend]** Validar y solicitar permisos de micrófono nativos al usuario usando Capacitor.
  - [x] **[Backend]** Crear controlador y ruta `POST /api/v1/progress/complete` que reciba el ID del reto y actualice la puntuación del estudiante.

### US-03: Visualización del Mapa de Progreso (Journey)
**Como** estudiante,
**quiero** ver un mapa o itinerario visual interactivo con mi progreso de retos completados,
**para** mantener mi motivación y registrar mi constancia en los hábitos.

* **Prioridad:** Media 🟡
* **Puntos de Historia (Story Points):** 5
* **Tareas Técnicas:**
  - [x] **[Backend]** Crear controlador y ruta `GET /api/v1/progress/my-journey` que junte la información de la tabla `user_progress` y `challenges` usando MySQL.
  - [x] **[Frontend]** Crear la pantalla `JourneyMap.jsx`.
  - [x] **[Frontend]** Diseñar con CSS y SVGs el componente visual de la "ruta" o itinerario con nodos, conectando las tarjetas completadas (basado en el UI mockup).
  - [x] **[Frontend]** Consumir el endpoint de progreso para que los "nodos" del mapa se marquen como "Completado" dinámicamente.

---

## 🚀 Plan de Acción Sugerido para la Ejecución
1. Empezar por las tareas de **Backend de la US-01 y US-03**, ya que proveen los datos base.
2. Construir la UI estática del **Frontend de la US-01 (Hub)**.
3. Abordar el reto técnico más grande: **US-02 (Grabación de voz en Capacitor)**.
4. Finalizar integrando la vista interactiva del **US-03 (Mapa de Progreso)**.
