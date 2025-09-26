<?php
require_once __DIR__ . '/../config/database.php';
class equiposController
{


    // GET /api/equipos/id

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


    // GET /api/detalles/id

    public function Equipoid($id)
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

}
