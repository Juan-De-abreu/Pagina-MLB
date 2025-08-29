<?php
// routes/jugadorRoutes.php

require_once __DIR__ . '/../controllers/JugadorController.php';
require_once __DIR__ . '/../core/core.php';

$controller = new JugadorController();

// Obtener método HTTP y ruta
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Extraer ID de la URL: /api/jugadores/5
$matches = [];
preg_match('/^\/api\/jugadores\/(\d+)$/', $path, $matches);
$id = !empty($matches) ? (int)$matches[1] : null;

// Decodificar datos del cuerpo (solo si es POST o PUT)
$data = in_array($method, ['POST', 'PUT']) 
    ? json_decode(file_get_contents('php://input'), true) 
    : null;

// Validar que el JSON sea válido si se envió
if (in_array($method, ['POST', 'PUT']) && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos JSON inválidos']);
    exit;
}

// Manejo de rutas
switch ($method) {
    case 'GET':
        if ($id) {
            $controller->getById($id);
        } else {
            $controller->getAll();
        }
        break;

    case 'POST':
        $controller->create($data);
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido en la URL para actualizar']);
            break;
        }
        $controller->update($id, $data);
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido en la URL para eliminar']);
            break;
        }
        $controller->delete($id);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido. Usa GET, POST, PUT o DELETE.']);
        break;
}
?>