<?php
// routes/equiposRoutes.php

require_once __DIR__ . '/../controllers/equiposController.php';

$controller = new equiposController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (preg_match('/^\/api\/equipos$/', $path)) {
        // Obtener todos los equipos
        $controller->Allequipos();
    }
    elseif (preg_match('/^\/api\/equipos\/(\d+)\/jugadores$/', $path, $matches)) {
        // Obtener jugadores de un equipo por ID
        $equipoId = $matches[1];
        $controller->EquipoidJugadores($equipoId);
    }
    elseif (preg_match('/^\/api\/equipos\/(\d+)$/', $path, $matches)) {
        // Obtener un equipo por ID
        $equipoId = $matches[1];
        $controller->Equipoid($equipoId);
    }
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada']);
    }
} elseif ($method === 'POST') {
    if (preg_match('/^\/api\/equipos$/', $path)) {
        // Crear nuevo equipo
        $controller->createEquipo();
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para POST']);
    }
} elseif ($method === 'PUT') {
    if (preg_match('/^\/api\/equipos\/(\d+)$/', $path, $matches)) {
        // Actualizar equipo existente
        $equipoId = $matches[1];
        $controller->updateEquipo($equipoId);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para PUT']);
    }
} elseif ($method === 'DELETE') {
    if (preg_match('/^\/api\/equipos\/(\d+)$/', $path, $matches)) {
        // Eliminar equipo
        $equipoId = $matches[1];
        $controller->eliminarEquipo($equipoId);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para DELETE']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa GET, POST, PUT o DELETE.']);
}
