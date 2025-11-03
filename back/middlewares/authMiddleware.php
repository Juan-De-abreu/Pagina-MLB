<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function authMiddleware()
{
    // Obtener headers HTTP
    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Token no proporcionado']);
        exit();
    }

    $authHeader = $headers['Authorization'];
    list($type, $token) = explode(" ", $authHeader, 2);

    if ($type !== "Bearer" || empty($token)) {
        http_response_code(401);
        echo json_encode(['message' => 'Token inválido']);
        exit();
    }

    try {
        $secretKey = "Nosequeseaunaclavesegura";
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

        // Retornar el id del usuario (sub) para usar en controladores
        return $decoded->sub;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['message' => 'Token inválido o expirado']);
        exit();
    }
}
