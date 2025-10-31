<?php
require_once __DIR__ . '/../config/database.php';

class equiposController
{
    // Listar todos los equipos
    public function Allequipos()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("SELECT * FROM `equipos` ORDER BY titulos_nacionales DESC;");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener equipos: ' . $e->getMessage()]);
        }
    }

    // Obtener jugadores del equipo por id
    public function EquipoidJugadores($id)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("
                SELECT jugadores.*, equipos.nombre AS nombre_equipo
                FROM jugadores
                JOIN equipos ON equipos.id = jugadores.id_equipo
                WHERE jugadores.id_equipo = ?
                ORDER BY jugadores.partidos_jugados DESC
            ");
            $stmt->execute([$id]);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!$rows) {
                http_response_code(404);
                echo json_encode(['message' => 'Jugadores del equipo no encontrados']);
                return;
            }

            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener jugadores de equipo: ' . $e->getMessage()]);
        }
    }

    // Obtener equipo por id
    public function Equipoid($id)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("SELECT * FROM equipos WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(['message' => 'Información del equipo no encontrada']);
                return;
            }

            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener información del equipo: ' . $e->getMessage()]);
        }
    }

    // Crear nuevo equipo
    public function createEquipo()
    {
        global $pdo;
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos JSON inválidos']);
            return;
        }

        if (empty($data['nombre']) || empty($data['ciudad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campos nombre y ciudad son obligatorios']);
            return;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO equipos (nombre, ciudad, estadio, fundacion, titulos_nacionales, titulos_serie_caribe, logo_url, foto_estadio, capacidad, entrenador, presidente) 
                                  VALUES (:nombre, :ciudad, :estadio, :fundacion, :titulos_nacionales, :titulos_serie_caribe, :logo_url, :foto_estadio, :capacidad, :entrenador, :presidente)");

            $stmt->execute([
                ':nombre' => $data['nombre'],
                ':ciudad' => $data['ciudad'],
                ':estadio' => $data['estadio'] ?? null,
                ':fundacion' => $data['fundacion'] ?? null,
                ':titulos_nacionales' => $data['titulos_nacionales'] ?? 0,
                ':titulos_serie_caribe' => $data['titulos_serie_caribe'] ?? 0,
                ':logo_url' => is_array($data['logo_url']) ? json_encode($data['logo_url']) : ($data['logo_url'] ?? null),
                ':foto_estadio' => is_array($data['foto_estadio']) ? json_encode($data['foto_estadio']) : ($data['foto_estadio'] ?? null),
                ':capacidad' => $data['capacidad'] ?? null,
                ':entrenador' => $data['entrenador'] ?? null,
                ':presidente' => $data['presidente'] ?? null,
            ]);

            $id = $pdo->lastInsertId();

            $stmt2 = $pdo->prepare("SELECT * FROM equipos WHERE id = ?");
            $stmt2->execute([$id]);
            $equipoCreado = $stmt2->fetch(PDO::FETCH_ASSOC);

            http_response_code(201);
            echo json_encode($equipoCreado);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
        }
    }

    // Actualizar equipo existente
    public function updateEquipo($id)
    {
        global $pdo;
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos JSON inválidos']);
            return;
        }

        if (empty($data['nombre']) || empty($data['ciudad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Campos nombre y ciudad son obligatorios']);
            return;
        }

        try {
            $stmt = $pdo->prepare("UPDATE equipos SET
                                  nombre = :nombre,
                                  ciudad = :ciudad,
                                  estadio = :estadio,
                                  fundacion = :fundacion,
                                  titulos_nacionales = :titulos_nacionales,
                                  titulos_serie_caribe = :titulos_serie_caribe,
                                  logo_url = :logo_url,
                                  foto_estadio = :foto_estadio,
                                  capacidad = :capacidad,
                                  entrenador = :entrenador,
                                  presidente = :presidente
                                  WHERE id = :id");

            $stmt->execute([
                ':nombre' => $data['nombre'],
                ':ciudad' => $data['ciudad'],
                ':estadio' => $data['estadio'] ?? null,
                ':fundacion' => $data['fundacion'] ?? null,
                ':titulos_nacionales' => $data['titulos_nacionales'] ?? 0,
                ':titulos_serie_caribe' => $data['titulos_serie_caribe'] ?? 0,
                ':logo_url' => is_array($data['logo_url']) ? json_encode($data['logo_url']) : ($data['logo_url'] ?? null),
                ':foto_estadio' => is_array($data['foto_estadio']) ? json_encode($data['foto_estadio']) : ($data['foto_estadio'] ?? null),
                ':capacidad' => $data['capacidad'] ?? null,
                ':entrenador' => $data['entrenador'] ?? null,
                ':presidente' => $data['presidente'] ?? null,
                ':id' => $id,
            ]);

            $stmt2 = $pdo->prepare("SELECT * FROM equipos WHERE id = ?");
            $stmt2->execute([$id]);
            $equipoActualizado = $stmt2->fetch(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($equipoActualizado);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
        }
    }

    // Eliminar equipo
    public function eliminarEquipo($id)
    {
        global $pdo;
        try {
            $stmtCheck = $pdo->prepare("SELECT id FROM equipos WHERE id = ?");
            $stmtCheck->execute([$id]);

            if ($stmtCheck->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Equipo no encontrado']);
                return;
            }

            $stmt = $pdo->prepare("DELETE FROM equipos WHERE id = ?");
            $stmt->execute([$id]);

            http_response_code(200);
            echo json_encode(['mensaje' => 'Equipo eliminado exitosamente']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en base de datos: ' . $e->getMessage()]);
        }
    }
}
