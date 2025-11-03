<?php

require_once __DIR__ . '/../config/database.php'; // tu conexión PDO

class NotificacionesController
{
    private $pdo;

    public function __construct()
    {
        global $pdo;
        $this->pdo = $pdo;
    }

    public function createNotification($data)
    {
        if (
            empty($data['equipo_id']) ||
            empty($data['usuario_id']) ||
            empty($data['mensaje']) ||
            empty($data['fecha_creacion'])
        ) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos para la notificación']);
            return;
        }

        try {
            $stmt = $this->pdo->prepare("INSERT INTO notificaciones (equipo_id, usuario_id, mensaje, fecha_creacion) VALUES (:equipo_id, :usuario_id, :mensaje, :fecha_creacion)");

            $stmt->execute([
                ':equipo_id' => $data['equipo_id'],
                ':usuario_id' => $data['usuario_id'],
                ':mensaje' => $data['mensaje'],
                ':fecha_creacion' => $data['fecha_creacion'],
            ]);

            $id = $this->pdo->lastInsertId();

            $stmt2 = $this->pdo->prepare("SELECT * FROM notificaciones WHERE id = ?");
            $stmt2->execute([$id]);
            $notificacion = $stmt2->fetch(PDO::FETCH_ASSOC);

            http_response_code(201);
            header('Content-Type: application/json');
            echo json_encode($notificacion);
        } catch (PDOException $e) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error al guardar notificación: ' . $e->getMessage()]);
        }
    }


    public function notificacionesPorUsuario($userId)
    {
        if (!is_numeric($userId)) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Parámetro userId inválido']);
            return;
        }

        try {
            $stmt = $this->pdo->prepare("
                SELECT n.* FROM notificaciones n
                JOIN favoritos_equipos f ON n.equipo_id = f.equipo_id
                WHERE f.user_id = ? AND n.usuario_id = ?
                ORDER BY n.fecha_creacion DESC
            ");
            $stmt->execute([$userId, $userId]);
            $notificaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header('Content-Type: application/json');
            echo json_encode($notificaciones);
        } catch (PDOException $e) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error al obtener notificaciones: ' . $e->getMessage()]);
        }
    }
}
