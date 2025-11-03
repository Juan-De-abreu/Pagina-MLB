<?php
require_once __DIR__ . '/../config/database.php';

class favoritosController
{
    // Obtener equipos favoritos de un usuario
    public function getEquiposFavoritos($userId)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("
                SELECT e.* FROM equipos e
                INNER JOIN favoritos_equipos fe ON e.id = fe.equipo_id
                WHERE fe.user_id = ?
            ");
            $stmt->execute([$userId]);
            $equipos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($equipos);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener equipos favoritos: ' . $e->getMessage()]);
        }
    }

    // Agregar equipo favorito
    public function addEquipoFavorito($userId, $equipoId)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("INSERT IGNORE INTO favoritos_equipos (user_id, equipo_id) VALUES (?, ?)");
            $stmt->execute([$userId, $equipoId]);
            http_response_code(201);
            echo json_encode(['message' => 'Equipo agregado a favoritos']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al agregar equipo a favoritos: ' . $e->getMessage()]);
        }
    }

    // Remover equipo favorito
    public function removeEquipoFavorito($userId, $equipoId)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("DELETE FROM favoritos_equipos WHERE user_id = ? AND equipo_id = ?");
            $stmt->execute([$userId, $equipoId]);
            echo json_encode(['message' => 'Equipo removido de favoritos']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al remover equipo de favoritos: ' . $e->getMessage()]);
        }
    }

    // Obtener jugadores favoritos de un usuario
    public function getJugadoresFavoritos($userId)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("
                SELECT j.* FROM jugadores j
                INNER JOIN favoritos_jugadores fj ON j.id = fj.jugador_id
                WHERE fj.user_id = ?
            ");
            $stmt->execute([$userId]);
            $jugadores = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($jugadores);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener jugadores favoritos: ' . $e->getMessage()]);
        }
    }

    // Agregar jugador favorito
    public function addJugadorFavorito($userId, $jugadorId)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("INSERT IGNORE INTO favoritos_jugadores (user_id, jugador_id) VALUES (?, ?)");
            $stmt->execute([$userId, $jugadorId]);
            http_response_code(201);
            echo json_encode(['message' => 'Jugador agregado a favoritos']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al agregar jugador a favoritos: ' . $e->getMessage()]);
        }
    }

    // Remover jugador favorito
    public function removeJugadorFavorito($userId, $jugadorId)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("DELETE FROM favoritos_jugadores WHERE user_id = ? AND jugador_id = ?");
            $stmt->execute([$userId, $jugadorId]);
            echo json_encode(['message' => 'Jugador removido de favoritos']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al remover jugador de favoritos: ' . $e->getMessage()]);
        }
    }

    // Obtener partidos favoritos basados en equipos favoritos
    public function getPartidosFavoritos($userId)
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
            // Crear la consulta con placeholders
            $placeholders = implode(',', array_fill(0, count($equipos), '?'));
            $query = "
                SELECT p.*, el.nombre AS equipo_local, ev.nombre AS equipo_visitante
                FROM partidos p
                JOIN equipos el ON p.equipo_local_id = el.id
                JOIN equipos ev ON p.equipo_visitante_id = ev.id
                WHERE p.equipo_local_id IN ($placeholders) OR p.equipo_visitante_id IN ($placeholders)
                ORDER BY p.fecha DESC
            ";
            $stmt = $pdo->prepare($query);
            $stmt->execute(array_merge($equipos, $equipos));
            $partidos = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($partidos);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener partidos favoritos: ' . $e->getMessage()]);
        }
    }
}
