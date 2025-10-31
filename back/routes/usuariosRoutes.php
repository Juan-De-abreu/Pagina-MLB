<?php
// routes/usuariosRoutes.php

require_once __DIR__ . '/../controllers/usuariosController.php';
require_once __DIR__ . '/../core/core.php';

$controller = new usuariosController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Obtener todos los usuarios
    if (preg_match('/^\/api\/usuarios$/', $path)) {
        $controller->AllUsuarios();
    }
    // Obtener usuario por id
    elseif (preg_match('/^\/api\/usuarios\/(\d+)$/', $path, $matches)) {
        $usuarioId = $matches[1];
        $controller->UsuarioById($usuarioId);
    } 
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta de usuarios no encontrada']);
    }

} elseif ($method === 'POST') {
    // Crear usuario
    if (preg_match('/^\/api\/usuarios$/', $path)) {
        $controller->createUsuario();
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para POST']);
    }

} 
//actualizar usuario
elseif ($method === 'PUT') {
    if (preg_match('/^\/api\/usuarios\/(\d+)$/', $path, $matches)) {
        $usuarioId = $matches[1];
        $controller->updateUsuario($usuarioId);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para PUT']);
    }
}

 elseif ($method === 'DELETE') {
    // Eliminar usuario
    if (preg_match('/^\/api\/usuarios\/(\d+)$/', $path, $matches)) {
        $usuarioId = $matches[1];
        $controller->eliminarUsuario($usuarioId);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada para DELETE']);
    }

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa GET, POST, PUT o DELETE.']);
}
