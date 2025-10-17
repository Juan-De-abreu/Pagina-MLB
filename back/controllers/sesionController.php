<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;

class sesionController {

    private $pdo;
    private $secretKey = "Nosequeseaunaclavesegura";

    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
    }

    public function login($data) {
        header('Content-Type: application/json');

        if (!isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Faltan campos requeridos']);
            exit();
        }

        $email = $data['email'];
        $password = $data['password'];

        try {
            $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user) {
                http_response_code(401);
                echo json_encode(['message' => 'Usuario no encontrado']);
                exit();
            }

            if (!password_verify($password, $user['password_hash'])) {
                http_response_code(401);
                echo json_encode(['message' => 'Contraseña incorrecta']);
                exit();
            }

            $issuedAt = time();
            $expire = $issuedAt + 3600;

            $payload = [
                'iat' => $issuedAt,
                'exp' => $expire,
                'sub' => $user['id'],
                'email' => $user['email'],
                'nombre' => $user['nombre'],
                'es_admin' => $user['es_admin'] ? "1" : "0"
            ];

            $jwt = JWT::encode($payload, $this->secretKey, 'HS256');

            echo json_encode(['token' => $jwt]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Error interno']);
            error_log($e->getMessage());
        }
    }

    public function register($data) {
        header('Content-Type: application/json');

        if (!isset($data['nombre']) || !isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Datos incompletos para registro']);
            return;
        }

        $nombre = trim($data['nombre']);
        $email = trim($data['email']);
        $password = $data['password'];

        try {
            $stmt = $this->pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
            $stmt->execute([$email]);

            if ($stmt->fetch()) {
                http_response_code(400);
                echo json_encode(['message' => 'Correo ya registrado']);
                return;
            }

            $password_hash = password_hash($password, PASSWORD_BCRYPT);

            $stmtInsert = $this->pdo->prepare("INSERT INTO usuarios (nombre, email, password_hash, es_admin) VALUES (?, ?, ?, 0)");
            $stmtInsert->execute([$nombre, $email, $password_hash]);

            http_response_code(201);
            echo json_encode(['message' => 'Usuario registrado con éxito']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Error en registro']);
            error_log($e->getMessage());
        }
    }
}
