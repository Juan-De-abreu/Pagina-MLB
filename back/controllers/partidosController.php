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

            $id = $pdo->lastInsertId();
            $stmt2 = $pdo->prepare("SELECT * FROM partidos WHERE id = ?");
            $stmt2->execute([$id]);
            $partidoCreado = $stmt2->fetch(PDO::FETCH_ASSOC);

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
}
