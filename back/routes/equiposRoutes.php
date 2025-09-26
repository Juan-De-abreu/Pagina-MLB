<?php
// routes/partidosRoutes.php

require_once __DIR__ . '/../controllers/equiposController.php';
require_once __DIR__ . '/../core/core.php';

$controller = new equiposController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {

    // Obtener todos los equipos con nombres completos de equipos
    if (preg_match('/^\/api\/equipos$/', $path)) {
        $controller->Allequipos();
    }
    elseif (preg_match('/^\/api\/equipos\/(\d+)\/jugadores$/', $path, $matches)) {
        $equipoId = $matches[1];
        $controller->EquipoidJugadores($equipoId);
    }
    
    elseif (preg_match('/^\/api\/equipos\/(\d+)$/', $path, $matches)) {
        $equipoId = $matches[1];
        $controller->Equipoid($equipoId);
    }

    elseif (preg_match('/^\/api\/equipos\/partidos$/', $path)) {
        $controller->Allpartidos();
    }

    else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta de partidos no encontrada']);
    }

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa GET.']);
}
?>
