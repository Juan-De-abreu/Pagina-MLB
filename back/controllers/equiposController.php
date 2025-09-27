<?php
require_once __DIR__ . '/../config/database.php';
class equiposController
{


    // GET /api/equipos

    public function Allequipos()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("SELECT * FROM `equipos` order by titulos_nacionales DESC;");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener equipos: ' . $e->getMessage()]);
        }
    }


    // GET /api/equipos/id/jugadores

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

    // GET /api/equipos/partidos

    public function Allpartidos()
{
    global $pdo;
    try {
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "SELECT 
                    p.id,
                    p.fecha,
                    p.estadio,
                    p.resultados_local,
                    p.resultados_visitante,
                    el.nombre AS equipo_local,
                    p.equipo_local_id,
                    ev.nombre AS equipo_visitante,
                    p.equipo_visitante_id,
                    p.temporada
                FROM 
                    partidos p
                JOIN 
                    equipos el ON p.equipo_local_id = el.id
                JOIN 
                    equipos ev ON p.equipo_visitante_id = ev.id
                ORDER BY 
                    p.fecha ASC";

        $stmt = $pdo->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error PDO: ' . $e->getMessage()]);
    }
}


    // GET /api/equipos/id

    public function Equipoid($id)
    {
        global $pdo;
        try {
            $stmt = $pdo->prepare("
            SELECT * from equipos WHERE id=?
        ");
            $stmt->execute([$id]);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!$rows) {
                http_response_code(404);
                echo json_encode(['message' => 'informacion del equipo no encontrada']);
                return;
            }

            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener informacion del equipo: ' . $e->getMessage()]);
        }
    }


}
