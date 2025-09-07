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
        'años_en_mlb' => 0,
        'año_debut' => null,
        'año_retiro' => null,
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

    // Completar datos con valores por defecto si faltan
    $dataCorregido = [];
    foreach ($campos as $key => $default) {
        $dataCorregido[$key] = $data[$key] ?? $default;
    }

    // Validaciones lógicas importantes

    // Validar que sin partidos jugados no haya estadísticas de juego con valores > 0
    if ($dataCorregido['partidos_jugados'] == 0) {
        $statsFields = [
            'turnos_bateo', 'veces_al_bate', 'carreras', 'hits', 'dobles', 'triples',
            'home_runs', 'carreras_impulsadas', 'bases_robadas', 'atrapado_robando',
            'bases_por_bola', 'ponches', 'promedio_bateo', 'porcentaje_embase',
            'porcentaje_slugging', 'ops', 'war'
        ];

        foreach ($statsFields as $field) {
            if (!empty($dataCorregido[$field]) && $dataCorregido[$field] != 0) {
                http_response_code(400);
                echo json_encode(['error' => "No puede haber estadísticas en '$field' si no tiene ningún partido jugado."]);
                return;
            }
        }
    }

    // Validar coherencia de fechas
    if (!is_null($dataCorregido['año_debut']) && !is_null($dataCorregido['año_retiro']) &&
        $dataCorregido['año_debut'] > $dataCorregido['año_retiro']) {
        http_response_code(400);
        echo json_encode(['error' => 'El año de debut no puede ser mayor que el año de retiro']);
        return;
    }

    if (!is_null($dataCorregido['fecha_nacimiento']) && !is_null($dataCorregido['fecha_debut']) &&
        strtotime($dataCorregido['fecha_nacimiento']) > strtotime($dataCorregido['fecha_debut'])) {
        http_response_code(400);
        echo json_encode(['error' => 'La fecha de nacimiento no puede ser posterior a la fecha de debut']);
        return;
    }

    if (!is_null($dataCorregido['fecha_debut']) &&
        strtotime($dataCorregido['fecha_debut']) > time()) {
        http_response_code(400);
        echo json_encode(['error' => 'La fecha de debut no puede ser en el futuro']);
        return;
    }

    // Validar consistencia básica de estadísticas
    if ($dataCorregido['turnos_bateo'] < $dataCorregido['veces_al_bate']) {
        http_response_code(400);
        echo json_encode(['error' => 'Los turnos al bate no pueden ser menores que las veces al bate']);
        return;
    }

    if ($dataCorregido['carreras'] > $dataCorregido['veces_al_bate'] || $dataCorregido['hits'] > $dataCorregido['veces_al_bate']) {
        http_response_code(400);
        echo json_encode(['error' => 'Carreras y hits no pueden ser mayores que las veces al bate']);
        return;
    }

    // Inserción en base de datos
    try {
        $stmt = $pdo->prepare("
            INSERT INTO jugadores (
                nombre, pos, años_en_mlb, año_debut, año_retiro, all_star_appearances, partidos_jugados, turnos_bateo, veces_al_bate, carreras, hits, dobles, triples, home_runs, carreras_impulsadas, bases_robadas, atrapado_robando, bases_por_bola, ponches, promedio_bateo, porcentaje_embase, porcentaje_slugging, ops, war, fecha_nacimiento, fecha_debut, lugar_nacimiento, posiciones
            ) VALUES (
                :nombre, :pos, :años_en_mlb, :año_debut, :año_retiro, :all_star_appearances, :partidos_jugados, :turnos_bateo, :veces_al_bate, :carreras, :hits, :dobles, :triples, :home_runs, :carreras_impulsadas, :bases_robadas, :atrapado_robando, :bases_por_bola, :ponches, :promedio_bateo, :porcentaje_embase, :porcentaje_slugging, :ops, :war, :fecha_nacimiento, :fecha_debut, :lugar_nacimiento, :posiciones
            )
        ");

        $stmt->execute([
            ':nombre' => $dataCorregido['nombre'],
            ':pos' => $dataCorregido['pos'],
            ':años_en_mlb' => $dataCorregido['años_en_mlb'],
            ':año_debut' => $dataCorregido['año_debut'],
            ':año_retiro' => $dataCorregido['año_retiro'],
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
        global $pdo;

        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID de jugador no especificado']);
            return;
        }

        if (empty($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'No se enviaron datos para actualizar']);
            return;
        }

        // Obtener datos actuales para comparar
        $stmtSelect = $pdo->prepare("SELECT * FROM jugadores WHERE id = :id");
        $stmtSelect->execute([':id' => $id]);
        $actual = $stmtSelect->fetch(PDO::FETCH_ASSOC);

        if (!$actual) {
            http_response_code(404);
            echo json_encode(['error' => 'Jugador no encontrado']);
            return;
        }

        // Quitar campos no actualizables o hacer manejo especial si quieres
        unset($actual['id']); // No actualizamos el ID

        // Campos permitidos para actualizar
        $camposPermitidos = [
            'nombre', 'pos', 'años_en_mlb', 'año_debut', 'año_retiro', 'all_star_appearances',
            'partidos_jugados', 'turnos_bateo', 'veces_al_bate', 'carreras', 'hits', 'dobles',
            'triples', 'home_runs', 'carreras_impulsadas', 'bases_robadas', 'atrapado_robando',
            'bases_por_bola', 'ponches', 'promedio_bateo', 'porcentaje_embase', 'porcentaje_slugging',
            'ops', 'war', 'fecha_nacimiento', 'fecha_debut', 'lugar_nacimiento', 'posiciones'
        ];

        // Filtrar solo campos recibidos que estén permitidos
        $datosNuevos = array_intersect_key($data, array_flip($camposPermitidos));

        // Generar campos a actualizar solo si hay cambio
        $camposActualizar = [];
        $parametros = [':id' => $id];

        foreach ($datosNuevos as $campo => $valorNuevo) {
            $valorActual = $actual[$campo] ?? null;

            // Para comparar fechas y valores nulos con más seguridad, convertir a string
            $valorActualStr = is_null($valorActual) ? '' : (string)$valorActual;
            $valorNuevoStr = is_null($valorNuevo) ? '' : (string)$valorNuevo;

            if ($valorNuevoStr !== $valorActualStr) {
                // Cambió el campo, se incluye para actualizar
                $parametro = ':' . str_replace('ñ', 'n', $campo); // parámetro sin ñ para PDO
                $camposActualizar[] = "`$campo` = $parametro";
                $parametros[$parametro] = $valorNuevo;
            }
        }

        if (count($camposActualizar) === 0) {
            http_response_code(200);
            echo json_encode(['message' => 'No hubo cambios para actualizar']);
            return;
        }

        // Validaciones similares a create solo para los campos que se actualizarán (puedes agregar según necesites)
        if (array_key_exists('nombre', $datosNuevos) && empty($datosNuevos['nombre'])) {
            http_response_code(400);
            echo json_encode(['error' => 'El campo nombre no puede estar vacío']);
            return;
        }
        // Otros validaciones que requieras aquí...

        // Construir la consulta UPDATE dinámica
        $sql = "UPDATE jugadores SET " . implode(', ', $camposActualizar) . " WHERE id = :id";

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute($parametros);

            http_response_code(200);
            echo json_encode(['message' => 'Jugador actualizado con éxito']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al actualizar jugador: ' . $e->getMessage()]);
        }
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