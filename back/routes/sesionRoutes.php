<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../controllers/sesionController.php';
require_once __DIR__ . '/../core/core.php';

$controller = new sesionController();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$data = $method === 'POST' 
    ? json_decode(file_get_contents('php://input'), true) 
    : null;

if ($method === 'POST' && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos JSON inválidos']);
    exit;
}

switch ($method) {
    case 'POST':
        if ($path === '/api/login') {
            $controller->login($data);
        } elseif ($path === '/api/registro') {
            $controller->register($data);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ruta no encontrada']);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}
