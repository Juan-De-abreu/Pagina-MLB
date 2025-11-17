<?php
require_once __DIR__ . '/../controllers/favoritosController.php';
require_once __DIR__ . '/../middlewares/authMiddleware.php';

$controller = new favoritosController();
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Obtén userId vía middleware JWT verificando Authorization header
$userId = authMiddleware();
if (!$userId) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuario no autorizado']);
    exit;
}


if ($method === 'GET') {
    if ($path === '/api/favoritos/equipos') {
        $controller->getEquiposFavoritos($userId);
    } elseif ($path === '/api/favoritos/jugadores') {
        $controller->getJugadoresFavoritos($userId);
    } elseif ($path === '/api/favoritos/partidos') {
        $controller->getPartidosFavoritos($userId);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada (GET)']);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || !isset($data['tipo'], $data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        exit;
    }
    if ($data['tipo'] === 'equipo') {
        $controller->addEquipoFavorito($userId, $data['id']);
    } elseif ($data['tipo'] === 'jugador') {
        $controller->addJugadorFavorito($userId, $data['id']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Tipo inválido']);
    }
} elseif ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $query);
    if (!isset($query['tipo'], $query['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Parámetros faltantes']);
        exit;
    }
    if ($query['tipo'] === 'equipo') {
        $controller->removeEquipoFavorito($userId, $query['id']);
    } elseif ($query['tipo'] === 'jugador') {
        $controller->removeJugadorFavorito($userId, $query['id']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Tipo inválido']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
