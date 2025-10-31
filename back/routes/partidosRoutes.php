<?php
// routes/partidosRoutes.php

require_once __DIR__ . '/../controllers/partidosController.php';

$controller = new partidosController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (preg_match('/^\/api\/partidos\/equipo\/(\d+)$/', $path, $matches)) {
        // Obtener partidos por id de equipo
        $equipoId = $matches[1];
        $controller->partidosPorEquipo($equipoId);
    } elseif (preg_match('/^\/api\/partidos\/(\d+)$/', $path, $matches)) {
        // Obtener partido por ID
        $partidoId = $matches[1];
        $controller->PartidoById($partidoId);
    } elseif (preg_match('/^\/api\/partidos$/', $path)) {
        // Obtener todos los partidos
        $controller->AllPartidos();
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta de partidos no encontrada']);
    }
} elseif ($method === 'POST') {
    if (preg_match('/^\/api\/partidos$/', $path)) {
        // Crear partido
        $controller->createPartido();
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para POST']);
    }
} elseif ($method === 'PUT') {
    if (preg_match('/^\/api\/partidos\/(\d+)$/', $path, $matches)) {
        // Actualizar partido
        $partidoId = $matches[1];
        $controller->updatePartido($partidoId);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para PUT']);
    }
} elseif ($method === 'DELETE') {
    if (preg_match('/^\/api\/partidos\/(\d+)$/', $path, $matches)) {
        // Eliminar partido
        $partidoId = $matches[1];
        $controller->eliminarPartido($partidoId);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para DELETE']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa GET, POST, PUT o DELETE.']);
}
