<?php
// controllers/JugadorController.php

require_once __DIR__ . '/../config/database.php';

class JugadorController {

    // GET /api/jugadores - Listar todos los jugadores
    public function getAll() {
        global $pdo;
        try {
            $stmt = $pdo->query("SELECT * FROM jugadores ORDER BY años_en_mlb desc");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener jugadores: ' . $e->getMessage()]);
        }
    }

    // GET /api/jugadores/:id - Obtener un jugador por ID
    public function getById($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("
                SELECT *
                FROM jugadores 
                WHERE id = ?
            ");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(['message' => 'Jugador no encontrado']);
                return;
            }

            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener jugador: ' . $e->getMessage()]);
        }
    }

    // POST /api/jugadores - Crear un nuevo jugador
    public function create($data) {

    }

    // PUT /api/jugadores/:id - Actualizar un jugador
    public function update($id, $data) {
        
    }

    // DELETE /api/jugadores/:id - Eliminar un jugador
    public function delete($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("DELETE FROM jugadores WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['message' => 'Jugador no encontrado']);
                return;
            }

            http_response_code(200);
            echo json_encode([
                'message' => 'Jugador eliminado con éxito',
                'id' => (int)$id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar jugador: ' . $e->getMessage()]);
        }
    }

    
}