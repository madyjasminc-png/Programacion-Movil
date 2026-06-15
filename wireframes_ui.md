# Wireframes y UI Design - HabitZone

Siguiendo la propuesta estética y la paleta de colores cálidos y calmantes, he estructurado los mockups conceptuales para las pantallas principales de la aplicación. Estos diseños orientarán el desarrollo del frontend con React.js y Capacitor.

## 1. Descubrir Hub (Pantalla Principal)

Esta es la pantalla a la que ingresa el estudiante una vez ha iniciado sesión. Su objetivo es inspirar y facilitar el acceso a los retos diarios de comunicación.

![Hub de Descubrimiento](C:\Users\pulla\.gemini\antigravity-ide\brain\6c522058-6182-4cc1-a810-252757366928\habitzone_hub_ui_1781494257414.png)

**Estructura del Componente:**
* **Buscador (Search Bar):** Ubicado en la parte superior, permite a los usuarios buscar tipos específicos de ejercicios (ej. "oratoria", "trabalenguas").
* **Tarjetas Destacadas (Featured Challenges):** Un carrusel de scroll horizontal que contiene los ejercicios del día. Tienen bordes redondeados (soft UI) e ilustraciones simples para cada tipo de reto.
* **Fondo y Colores:** Tonos melocotón y beige que reducen la "fricción" de aprendizaje y ansiedad.
* **Bottom Navigation:** Menú inferior fijo con accesos a: Inicio (Hub), Progreso (Mapa), Comunidad y Perfil.

## 2. Mapa de Progreso (Itinerario del Estudiante)

Esta pantalla sustituye la aburrida lista de calificaciones por una experiencia visual gamificada, simulando un mapa de viaje para el aprendizaje.

![Mapa de Progreso](C:\Users\pulla\.gemini\antigravity-ide\brain\6c522058-6182-4cc1-a810-252757366928\habitzone_map_ui_1781494266418.png)

**Estructura del Componente:**
* **Ruta de Aprendizaje (Winding Path):** Una línea visual serpenteante que guía el ojo del usuario hacia abajo o arriba.
* **Hitos (Milestones):** Puntos de control (nodos) que representan los retos o días superados. Al completar un reto a través de la API (endpoint `/api/v1/progress/complete`), el nodo cambiará de estado (ej. de gris a naranja activo).
* **Consistencia UI:** Mantiene la paleta de colores cálida y la barra de navegación inferior para cambiar fluidamente de vista.

## Especificaciones CSS/React a Considerar
* **Tipografía:** Debería ser `Inter`, `Roboto` o `Outfit` para mantener el aspecto limpio y moderno.
* **Bordes:** Uso intensivo de `border-radius: 16px` a `24px` en las tarjetas.
* **Sombras:** Sombras suaves `box-shadow: 0 10px 25px rgba(0,0,0,0.05)` para dar profundidad sin ser abrumador.
