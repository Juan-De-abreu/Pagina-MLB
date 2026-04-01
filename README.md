# Página MLB

Este proyecto es una aplicación web para gestionar y visualizar estadísticas de jugadores de béisbol de las Grandes Ligas (MLB), con enfoque especial en jugadores venezolanos, incluyendo funcionalidades backend y frontend.

## Descripción

La aplicación permite crear, consultar y mantener información detallada de jugadores de la MLB, incluyendo estadísticas individuales, datos biográficos, y rendimiento en temporadas. Está diseñada para ser una herramienta útil para seguir la carrera de jugadores históricos y actuales.
## Observaciones
- **Hay una limitacion lo cual no se puede evitar en el hosting gratuito lo cual es el bloqueo de corns al modificar o eliminar informacion ya existente en la base de datos,unicas soluciones:Cambiar de hosting u obtener la version premiun del mismo.Fuera de este unico inconveniente si funciona correcto todo el codigo

## Características principales

- **Gestión de jugadores:** Registro completo con validación de datos, asegurando consistencia lógica entre estadísticas y fechas.
- **Validación de datos:** Control para que si un jugador no ha jugado partidos, no se registren estadísticas erróneas.
- **Base de datos:** Almacenamiento en MySQL con campos detallados que reflejan métricas reales de béisbol.
- **Control de versiones:** Uso de Git organizado con ramas separadas para backend y frontend.
- **API básica:** Función para crear jugadores vía API REST con manejo de errores y estados HTTP.
- **Interfaz web:** Frontend adaptado para mostrar, insertar y editar datos de jugadores (implementado con HTML, CSS y JavaScript).
- **Integración:** Capacidad para importar/exportar datos en formato JSON para facilitar análisis y respaldo.

## Tecnologías utilizadas

- PHP para backend (con PDO para conexión segura a base de datos).
- MySQL como sistema de gestión de base de datos.
- HTML, CSS(Tailwind), JavaScript para frontend.
- Git para control de versiones con ramas específicas.
- Herramientas de desarrollo y despliegue integradas en entorno local y GitHub.
