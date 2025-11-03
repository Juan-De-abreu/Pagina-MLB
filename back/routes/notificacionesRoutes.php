<?php

require_once __DIR__ . '/../controllers/NotificacionesController.php';
require_once __DIR__ . '/../core/core.php'; // funciones comunes si tienes

$controller = new NotificacionesController();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$data = in_array($method, ['POST']) ? json_decode(file_get_contents('php://input'), true) : null;

// Validar JSON para POST
if (in_array($method, ['POST']) && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos JSON inválidos']);
    exit;
}

switch ($method) {
    case 'POST':
        // Crear notificación
        $controller->createNotification($data);
        break;

    case 'GET':
        // Validar y obtener param user_id para obtener notificaciones
        if (isset($_GET['user_id']) && is_numeric($_GET['user_id'])) {
            $userId = intval($_GET['user_id']);
            $controller->notificacionesPorUsuario($userId);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Parámetro user_id faltante o inválido']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}
