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
    global $pdo;

    if (!isset($data['nombre'])) {
        http_response_code(400);
        echo json_encode(['error' => 'El campo nombre es obligatorio']);
        return;
    }

    $campos = [
        'nombre' => '',
        'pos' => '',
        'anos_en_mlb' => 0,
        'ano_debut' => null,
        'ano_retiro' => null,
        'all_star_appearances' => 0,
        'partidos_jugados' => 0,
        'turnos_bateo' => 0,
        'veces_al_bate' => 0,
        'carreras' => 0,
        'hits' => 0,
        'dobles' => 0,
        'triples' => 0,
        'home_runs' => 0,
        'carreras_impulsadas' => 0,
        'bases_robadas' => 0,
        'atrapado_robando' => 0,
        'bases_por_bola' => 0,
        'ponches' => 0,
        'promedio_bateo' => 0,
        'porcentaje_embase' => 0,
        'porcentaje_slugging' => 0,
        'ops' => 0,
        'war' => 0,
        'fecha_nacimiento' => null,
        'fecha_debut' => null,
        'lugar_nacimiento' => '',
        'posiciones' => ''
    ];

    // Ajustar datos para tener claves sin tildes
    $dataCorregido = [];
    foreach ($campos as $key => $default) {
        if (isset($data[$key])) {
            $dataCorregido[$key] = $data[$key];
        } else {
            $dataCorregido[$key] = $default;
        }
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO jugadores (
                nombre, pos, años_en_mlb, año_debut, año_retiro, all_star_appearances, partidos_jugados, turnos_bateo, veces_al_bate, carreras, hits, dobles, triples, home_runs, carreras_impulsadas, bases_robadas, atrapado_robando, bases_por_bola, ponches, promedio_bateo, porcentaje_embase, porcentaje_slugging, ops, war, fecha_nacimiento, fecha_debut, lugar_nacimiento, posiciones
            ) VALUES (
                :nombre, :pos, :anos_en_mlb, :ano_debut, :ano_retiro, :all_star_appearances, :partidos_jugados, :turnos_bateo, :veces_al_bate, :carreras, :hits, :dobles, :triples, :home_runs, :carreras_impulsadas, :bases_robadas, :atrapado_robando, :bases_por_bola, :ponches, :promedio_bateo, :porcentaje_embase, :porcentaje_slugging, :ops, :war, :fecha_nacimiento, :fecha_debut, :lugar_nacimiento, :posiciones
            )
        ");

        $stmt->execute([
            ':nombre' => $dataCorregido['nombre'],
            ':pos' => $dataCorregido['pos'],
            ':anos_en_mlb' => $dataCorregido['anos_en_mlb'],
            ':ano_debut' => $dataCorregido['ano_debut'],
            ':ano_retiro' => $dataCorregido['ano_retiro'],
            ':all_star_appearances' => $dataCorregido['all_star_appearances'],
            ':partidos_jugados' => $dataCorregido['partidos_jugados'],
            ':turnos_bateo' => $dataCorregido['turnos_bateo'],
            ':veces_al_bate' => $dataCorregido['veces_al_bate'],
            ':carreras' => $dataCorregido['carreras'],
            ':hits' => $dataCorregido['hits'],
            ':dobles' => $dataCorregido['dobles'],
            ':triples' => $dataCorregido['triples'],
            ':home_runs' => $dataCorregido['home_runs'],
            ':carreras_impulsadas' => $dataCorregido['carreras_impulsadas'],
            ':bases_robadas' => $dataCorregido['bases_robadas'],
            ':atrapado_robando' => $dataCorregido['atrapado_robando'],
            ':bases_por_bola' => $dataCorregido['bases_por_bola'],
            ':ponches' => $dataCorregido['ponches'],
            ':promedio_bateo' => $dataCorregido['promedio_bateo'],
            ':porcentaje_embase' => $dataCorregido['porcentaje_embase'],
            ':porcentaje_slugging' => $dataCorregido['porcentaje_slugging'],
            ':ops' => $dataCorregido['ops'],
            ':war' => $dataCorregido['war'],
            ':fecha_nacimiento' => $dataCorregido['fecha_nacimiento'],
            ':fecha_debut' => $dataCorregido['fecha_debut'],
            ':lugar_nacimiento' => $dataCorregido['lugar_nacimiento'],
            ':posiciones' => $dataCorregido['posiciones']
        ]);

        http_response_code(201);
        echo json_encode([
            'message' => 'Jugador creado con éxito',
            'id' => $pdo->lastInsertId()
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al crear jugador: ' . $e->getMessage()]);
    }
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