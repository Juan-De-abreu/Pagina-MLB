# MLB Venezuela – Backend (API)

API REST construida en **PHP** con **MySQL** y autenticación **JWT**, consumida por el frontend de la app MLB Venezuela. Este backend expone endpoints para autenticación, gestión de usuarios, equipos venezolanos y favoritos.

## Tecnologías

- **PHP 8+**
- **MySQL**
- **JSON Web Tokens (JWT)** para autenticación basada en tokens. [web:115][web:117]
- Estilo REST con respuestas en **JSON**.

## Endpoints principales

> Las rutas pueden variar según tu estructura (por ejemplo, `/api/...`), aquí se muestra la idea general.

### Autenticación

- `POST /auth/login`  
  - Body: `{ "email": string, "password": string }`  
  - Respuesta: `{ "token": "JWT_TOKEN", "user": { ... } }`  
  - Genera un JWT si las credenciales son correctas.

- `POST /auth/register` (opcional)  
  - Body: datos básicos de usuario.  
  - Crea un nuevo usuario en la base de datos.

### Usuario actual

- `GET /auth/me`  
  - Header: `Authorization: Bearer <JWT_TOKEN>`  
  - Devuelve la información del usuario autenticado.

### Equipos

- `GET /teams`  
  - Devuelve el listado de equipos venezolanos disponibles.

- `GET /teams/{id}`  
  - Devuelve el detalle de un equipo específico.

### Favoritos

- `GET /favorites`  
  - Header: `Authorization: Bearer <JWT_TOKEN>`  
  - Lista los equipos marcados como favoritos por el usuario.

- `POST /favorites`  
  - Header: `Authorization: Bearer <JWT_TOKEN>`  
  - Body: `{ "team_id": number }`  
  - Añade un equipo a favoritos.

- `DELETE /favorites/{team_id}`  
  - Header: `Authorization: Bearer <JWT_TOKEN>`  
  - Elimina un equipo de favoritos.

## Estructura del proyecto

