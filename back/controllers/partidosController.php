<?php
require_once __DIR__ . '/../config/database.php';

class partidosController
{
    // Listar todos los partidos
    public function AllPartidos()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("SELECT * FROM partidos ORDER BY fecha DESC");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener partidos: ' . $e->getMessage()]);
        }
    }

    // Obtener partido por ID
    public function PartidoById($id)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("SELECT * FROM partidos WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(['message' => 'Partido no encontrado']);
                return;
            }

            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener el partido: ' . $e->getMessage()]);
        }
    }

    // Crear partido
public function createPartido()
{
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos JSON inválidos']);
        return;
    }
    if (
        empty($data['fecha']) ||
        empty($data['equipo_local_id']) ||
        empty($data['equipo_visitante_id']) ||
        $data['equipo_local_id'] == $data['equipo_visitante_id']
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos o equipos iguales']);
        return;
    }

    try {
        // Insertar partido
        $stmt = $pdo->prepare("INSERT INTO partidos (fecha, estadio, resultados_local, resultados_visitante, equipo_local_id, equipo_visitante_id, temporada) 
                              VALUES (:fecha, :estadio, :resultados_local, :resultados_visitante, :equipo_local_id, :equipo_visitante_id, :temporada)");
        $stmt->execute([
            ':fecha' => $data['fecha'],
            ':estadio' => $data['estadio'] ?? null,
            ':resultados_local' => $data['resultados_local'] ?? null,
            ':resultados_visitante' => $data['resultados_visitante'] ?? null,
            ':equipo_local_id' => $data['equipo_local_id'],
            ':equipo_visitante_id' => $data['equipo_visitante_id'],
            ':temporada' => $data['temporada'] ?? null,
        ]);

        $idPartido = $pdo->lastInsertId();

        // Obtener nombres equipos para mensaje
        $stmtEquipos = $pdo->prepare("SELECT id, nombre FROM equipos WHERE id IN (?, ?)");
        $stmtEquipos->execute([$data['equipo_local_id'], $data['equipo_visitante_id']]);
        $equipos = $stmtEquipos->fetchAll(PDO::FETCH_ASSOC);

        $nombreLocal = '';
        $nombreVisitante = '';
        foreach ($equipos as $equipo) {
            if ($equipo['id'] == $data['equipo_local_id']) $nombreLocal = $equipo['nombre'];
            if ($equipo['id'] == $data['equipo_visitante_id']) $nombreVisitante = $equipo['nombre'];
        }

        // Obtener usuarios favoritos
        $stmtFav = $pdo->prepare("SELECT DISTINCT user_id FROM favoritos_equipos WHERE equipo_id IN (?, ?)");
        $stmtFav->execute([$data['equipo_local_id'], $data['equipo_visitante_id']]);
        $usuariosFavoritos = $stmtFav->fetchAll(PDO::FETCH_COLUMN);

        if (!empty($usuariosFavoritos)) {
            // Crear notificación global
            $mensaje = "Nuevo partido: {$nombreLocal} vs {$nombreVisitante}";
            $stmtNotif = $pdo->prepare("INSERT INTO notificaciones (equipo_id, mensaje, fecha_creacion) VALUES (?, ?, NOW())");
            $stmtNotif->execute([$data['equipo_local_id'], $mensaje]);
            $notificacionId = $pdo->lastInsertId();

            // Insertar estado individual en notificaciones_usuario
            $stmtNotifUsuario = $pdo->prepare("INSERT INTO notificaciones_usuario (notificacion_id, usuario_id, leida) VALUES (?, ?, 0)");

            foreach ($usuariosFavoritos as $userId) {
                $stmtNotifUsuario->execute([$notificacionId, $userId]);
            }
        }

        // Responder con partido creado
        $stmtPartido = $pdo->prepare("SELECT * FROM partidos WHERE id = ?");
        $stmtPartido->execute([$idPartido]);
        $partidoCreado = $stmtPartido->fetch(PDO::FETCH_ASSOC);

        http_response_code(201);
        echo json_encode($partidoCreado);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
    }
}



    // Actualizar partido
    public function updatePartido($id)
    {
        global $pdo;
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos JSON inválidos']);
            return;
        }
        if (
            empty($data['fecha']) ||
            empty($data['equipo_local_id']) ||
            empty($data['equipo_visitante_id']) ||
            $data['equipo_local_id'] == $data['equipo_visitante_id']
        ) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos o equipos iguales']);
            return;
        }

        try {
            $stmt = $pdo->prepare("UPDATE partidos SET
                                  fecha = :fecha,
                                  estadio = :estadio,
                                  resultados_local = :resultados_local,
                                  resultados_visitante = :resultados_visitante,
                                  equipo_local_id = :equipo_local_id,
                                  equipo_visitante_id = :equipo_visitante_id,
                                  temporada = :temporada
                                  WHERE id = :id");
            $stmt->execute([
                ':fecha' => $data['fecha'],
                ':estadio' => $data['estadio'] ?? null,
                ':resultados_local' => $data['resultados_local'] ?? null,
                ':resultados_visitante' => $data['resultados_visitante'] ?? null,
                ':equipo_local_id' => $data['equipo_local_id'],
                ':equipo_visitante_id' => $data['equipo_visitante_id'],
                ':temporada' => $data['temporada'] ?? null,
                ':id' => $id,
            ]);

            $stmt2 = $pdo->prepare("SELECT * FROM partidos WHERE id = ?");
            $stmt2->execute([$id]);
            $partidoActualizado = $stmt2->fetch(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($partidoActualizado);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
        }
    }

    // Eliminar partido
    public function eliminarPartido($id)
    {
        global $pdo;
        try {
            $stmtCheck = $pdo->prepare("SELECT id FROM partidos WHERE id = ?");
            $stmtCheck->execute([$id]);

            if ($stmtCheck->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Partido no encontrado']);
                return;
            }

            $stmt = $pdo->prepare("DELETE FROM partidos WHERE id = ?");
            $stmt->execute([$id]);

            http_response_code(200);
            echo json_encode(['mensaje' => 'Partido eliminado exitosamente']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
        }
    }

        public function partidosPorEquipo($idEquipo)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("
                SELECT p.*, 
                       el.nombre AS equipo_local, 
                       ev.nombre AS equipo_visitante
                FROM partidos p
                INNER JOIN equipos el ON p.equipo_local_id = el.id
                INNER JOIN equipos ev ON p.equipo_visitante_id = ev.id
                WHERE p.equipo_local_id = :idEquipo OR p.equipo_visitante_id = :idEquipo
                ORDER BY p.fecha DESC
            ");
            $stmt->execute([':idEquipo' => $idEquipo]);
            $partidos = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header('Content-Type: application/json');
            echo json_encode($partidos);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener partidos: ' . $e->getMessage()]);
        }
    }
    public function partidosFavoritosPorUsuario($userId)
{
    global $pdo;
    try {
        // Obtener ids de equipos favoritos de este usuario
        $stmtFav = $pdo->prepare("SELECT equipo_id FROM favoritos_equipos WHERE user_id = ?");
        $stmtFav->execute([$userId]);
        $equipos = $stmtFav->fetchAll(PDO::FETCH_COLUMN);
        if (empty($equipos)) {
            echo json_encode([]);
            return;
        }
        // Obtener partidos donde alguno de los dos equipos sea favorito
        $inQuery = implode(',', array_fill(0, count($equipos), '?'));
        $stmt = $pdo->prepare("
            SELECT p.*, el.nombre AS equipo_local, ev.nombre AS equipo_visitante FROM partidos p
            JOIN equipos el ON p.equipo_local_id = el.id
            JOIN equipos ev ON p.equipo_visitante_id = ev.id
            WHERE p.equipo_local_id IN ($inQuery) OR p.equipo_visitante_id IN ($inQuery)
            ORDER BY p.fecha DESC
        ");
        $stmt->execute(array_merge($equipos, $equipos));
        $partidos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($partidos);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener partidos favoritos: ' . $e->getMessage()]);
    }
}

}
