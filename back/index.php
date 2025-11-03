<?php
// index.php

require_once __DIR__ . '/core/core.php';
require_once 'config/database.php';

// Obtener el path completo
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// No uses $basePath: asume que /api está directamente
$method = $_SERVER['REQUEST_METHOD'];

// 🔹 Rutas: /api/estadisticas
if (preg_match('/^\/api\/estadisticas/', $path)) {
    require_once 'routes/estadisticasRoutes.php';
    exit;
}
if (preg_match('/^\/api\/mapa/', $path)) {
    require_once 'routes/estadisticasRoutes.php';
    exit;
}
if (preg_match('/^\/api\/equipos/', $path)) {
    require_once 'routes/equiposRoutes.php';
    exit;
}

if (preg_match('/^\/api\/login/', $path)) {
    require_once 'routes/sesionRoutes.php';
    exit;
}
if (preg_match('/^\/api\/favoritos/', $path)) {
    require_once 'routes/favoritosRoutes.php';
    exit;
}
if (preg_match('/^\/api\/notificaciones/', $path)) {
    require_once 'routes/notificacionesRoutes.php';
    exit;
}
if (preg_match('/^\/api\/registro/', $path)) {
    require_once 'routes/sesionRoutes.php';
    exit;
}
if (preg_match('/^\/api\/partidos/', $path)) {
    require_once 'routes/partidosRoutes.php';
    exit;
}

// 🔹 Rutas: /api/jugadores
if (preg_match('/^\/api\/jugadores/', $path)) {
    require_once 'routes/jugadorRoutes.php';
    exit;
}
if (preg_match('/^\/api\/usuarios/', $path)) {
    require_once 'routes/usuariosRoutes.php';
    exit;
}



// 🔹 Página de inicio
if ($path === '/' || $path === '/backjuegos') {
    header('Content-Type: text/html; charset=UTF-8');
    readfile(__DIR__ . '/views/index.html');
    exit;
}

// 🔹 404
http_response_code(404);
echo json_encode(['error' => 'Ruta no encontrada']);
?>