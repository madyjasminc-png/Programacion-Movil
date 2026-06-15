# FORMATO DE PROPUESTA PARA DESARROLLO DE APP MÓVIL PARA ESTUDIANTES

**Institución:** Instituto Superior Tecnológico Alberto Enríquez
**Carrera / Área:** Desarrollo de software
**Fecha:** 29 / 05 / 2026
**Responsable(s):** Colobon Arboleda Mady Jasmin

## 1. Título del Proyecto
**HabitZone**
Aplicación móvil para mejorar la comunicación y la expresión verbal mediante hábitos diarios.

## 2. Problema a Resolver
Muchos estudiantes tienen dificultades para hablar en público, expresarse correctamente y comunicarse con seguridad en exposiciones, debates o presentaciones. Además, no practican constantemente su pronunciación y fluidez verbal.

## 3. Justificación
Es importante desarrollar esta aplicación porque ayudará a los estudiantes a mejorar sus habilidades de comunicación de manera práctica y dinámica. La expresión verbal es fundamental en la educación, entrevistas y vida profesional.

## 4. Objetivo General
Desarrollar una aplicación móvil multiplataforma que ayude a los estudiantes a mejorar su comunicación oral, pronunciación y confianza al hablar mediante ejercicios y hábitos diarios.

## 5. Objetivos Específicos
* Mejorar la pronunciación y dicción de los estudiantes.
* Crear hábitos diarios de práctica verbal.
* Motivar a los usuarios mediante retos, estadísticas y un sistema de progreso tipo "viaje de aprendizaje".
* Fomentar el apoyo mutuo a través de una comunidad de estudiantes.
* Ayudar a reducir el miedo al hablar en público.

## 6. Público Objetivo
La aplicación estará dirigida principalmente a estudiantes de secundaria, institutos y universidades que desean mejorar su forma de hablar y expresarse.

## 7. Funcionalidades Principales
* **Onboarding y Bienvenida:** Pantallas introductorias amigables para configurar los objetivos del usuario, inspiradas en la fluidez de las apps modernas.
* **Hub de Descubrimiento:** Sección para explorar ejercicios de pronunciación, lectura en voz alta y retos (estilo "Featured Destinations").
* **Mapa de Progreso (Journey):** Visualización del avance del estudiante como un mapa de niveles.
* **Comunidad y Perfil:** Espacio para ver el progreso propio, ajustar configuraciones y conectar con otros estudiantes de la comunidad.
* **Itinerario de Práctica (Retos Diarios):** Una lista de tareas diarias de comunicación organizadas paso a paso.
* **Grabación de voz y feedback:** Herramienta integrada para medir la calidad de lectura o discurso.

## 8. Tecnologías a Utilizar
El proyecto adopta un enfoque de desarrollo web moderno empaquetado para móviles:
* **Frontend Móvil:** React.js + Capacitor (permite crear apps nativas iOS y Android con tecnologías web).
* **Backend:** Node.js con Express.js para una API RESTful rápida y escalable.
* **Base de Datos:** MySQL para almacenamiento relacional seguro de usuarios, progresos y retos.
* **APIs Adicionales:** API de reconocimiento de voz (Web Speech API o Google Cloud Speech-to-Text).

## 9. Diseño de la Interfaz
Tomando como referencia la propuesta visual del archivo `interfaz.jpeg`, la experiencia de usuario y visual se caracterizará por:
* **Paleta de Colores:** Tonos cálidos y pasteles (beige, naranja suave, detalles oscuros) que transmitan calma y reduzcan la ansiedad al hablar.
* **Estilo Visual:** Uso de tarjetas (cards) con bordes redondeados, ilustraciones amigables y limpias, y tipografía legible y moderna.
* **Navegación:** Menú inferior (Bottom Navigation Bar) con iconos para Inicio (Hub), Progreso (Mapa), Comunidad, y Perfil.
* **Flujo Intuitivo:** Desde una pantalla de bienvenida limpia hasta un "Descubrir Hub" para encontrar nuevos retos, manteniendo un diseño estructurado y sin sobrecarga visual.

## 10. Metodología de Desarrollo
Se utilizará la metodología ágil Scrum, permitiendo desarrollar la aplicación por etapas (Sprints), realizar pruebas constantes, iterar sobre el diseño de la interfaz y mejorar funciones continuamente.

## 11. Recursos Necesarios
* Computadora o laptop de desarrollo.
* Conexión a Internet.
* Entorno de Node.js y gestor de paquetes (npm).
* Motor de base de datos MySQL local o en la nube.
* Dispositivo móvil Android/iOS (o emuladores vía Android Studio) para pruebas con Capacitor.

## 12. Cronograma Tentativo (Organizado por Sprints)
* **Sprint 0 - Definición y Diseño (2 semanas):** Definición de requerimientos, esquemas de base de datos MySQL y creación de mockups adaptando la paleta cálida y estructura visual.
* **Sprint 1 - Fundamentos y Setup (2 semanas):** Configuración del backend (Express+MySQL) con módulos de autenticación, inicialización del frontend (React+Capacitor) y pantallas base (Onboarding).
* **Sprint 2 - Core de la App (2 semanas):** CRUD de retos y ejercicios, grabación de voz, desarrollo de la pantalla "Descubrir Hub" y lógica del "Mapa de Progreso".
* **Sprint 3 - Comunidad y Cierre (1 semana):** Endpoints de perfiles y comunidad, pruebas y testeo en dispositivos, despliegue del servidor y generación del instalador móvil (APK/IPA).

## 13. Resultados Esperados
Se espera que los estudiantes mejoren su seguridad, pronunciación y capacidad de comunicación oral mediante el uso constante de una aplicación con un diseño altamente atractivo, calmante y motivador.

## 14. Conclusiones
HabitZone no solo será una herramienta funcional, sino que mediante una interfaz moderna, cálida y orientada a la gamificación, logrará retener a los estudiantes. El uso de React + Capacitor en conjunto con un backend Express + MySQL asegura escalabilidad, facilidad de mantenimiento y agilidad en el desarrollo.
