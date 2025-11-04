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
            header('Content-Type: application/json');
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
        $sql = "
            SELECT nu.leida, nu.fecha_lectura, n.id, n.equipo_id, n.mensaje, n.fecha_creacion
            FROM notificaciones_usuario nu
            JOIN notificaciones n ON nu.notificacion_id = n.id
            WHERE nu.usuario_id = ?
            ORDER BY n.fecha_creacion DESC
            LIMIT 25
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$userId]);
        $notificaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($notificaciones);
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error al obtener notificaciones: ' . $e->getMessage()]);
    }
}



    public function marcarNotificacionesLeidas($data)
    {
        if (
            empty($data['usuario_id']) ||
            empty($data['notificaciones_ids']) ||
            !is_array($data['notificaciones_ids'])
        ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Parámetros inválidos para marcar notificaciones leídas']);
            return;
        }

        $usuarioId = $data['usuario_id'];
        $notificacionesIds = $data['notificaciones_ids'];

        try {
            $this->pdo->beginTransaction();

            $placeholders = implode(',', array_fill(0, count($notificacionesIds), '?'));

            $sql = "UPDATE notificaciones_usuario 
                    SET leida = 1, fecha_lectura = NOW() 
                    WHERE usuario_id = ? 
                    AND notificacion_id IN ($placeholders)";

            $stmt = $this->pdo->prepare($sql);

            $params = array_merge([$usuarioId], $notificacionesIds);

            $stmt->execute($params);

            $this->pdo->commit();

            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode(['mensaje' => 'Notificaciones marcadas como leídas']);
        } catch (PDOException $e) {
            $this->pdo->rollBack();
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error al marcar notificaciones como leídas: ' . $e->getMessage()]);
        }
    }
}
