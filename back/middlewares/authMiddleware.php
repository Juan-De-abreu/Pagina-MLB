<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function authMiddleware()
{
    $authHeader = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        }
    }

    if (!$authHeader) {
        http_response_code(401);
        echo json_encode(['message' => 'Token no proporcionado']);
        exit();
    }

    list($type, $token) = explode(" ", $authHeader, 2);
    if ($type !== "Bearer" || empty($token)) {
        http_response_code(401);
        echo json_encode(['message' => 'Token inválido']);
        exit();
    }

    try {
        $secretKey = "Nosequeseaunaclavesegura";
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        return $decoded->sub; // userId
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['message' => 'Token inválido o expirado']);
        exit();
    }
}

